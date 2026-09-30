# Plan: moving from CSV uploads to a database

v1 has no database. Sheets are read from uploaded CSVs through the `SheetSource`
interface (`src/lib/types.ts`). The comparison, `reconcile(team, primary)` in
`src/lib/server/reconcile.ts`, only sees two `Sheet` maps, so it does not change when the
source changes.

## Swap point

Add `src/lib/server/pgSource.ts` that implements `SheetSource`:

```ts
export function pgSource(kind: 'team' | 'primary', team: string | null): SheetSource {
	return {
		months: async () =>
			(await query('SELECT DISTINCT month FROM sheets WHERE kind = $1 ORDER BY month', [kind])).rows.map(
				(r) => r.month
			),
		load: async (month) => {
			const { rows } = await query(
				`SELECT i.item, i.value::text AS value, i.raw
				   FROM sheet_items i JOIN sheets s ON s.id = i.sheet_id
				  WHERE s.kind = $1 AND s.month = $2 AND s.team IS NOT DISTINCT FROM $3`,
				[kind, month, team]
			);
			return new Map(rows.map((r) => [r.item, { value: canonical(r.value)!, raw: r.raw }]));
		}
	};
}
```

Then `+page.server.ts` calls `pgSource(...)` in place of `csvSource(...)`. The output and
`reconcile` do not change.

Connection: use `pg.Pool` with the dual-mode credential pattern. If `AWS_SECRET_ID` is set,
read `DATABASE_URL` from Secrets Manager; otherwise read it from `.env`. Queries are always
parameterized.

## Schema (`db/schema.sql`)

```sql
CREATE TABLE sheets (
  id          serial PRIMARY KEY,
  kind        text NOT NULL CHECK (kind IN ('team', 'primary')),
  team        text,                  -- NULL for the primary
  month       text NOT NULL,         -- e.g. 'July 2026'; switch to a date (first of month) if needed
  source_file text,
  loaded_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE NULLS NOT DISTINCT (kind, team, month)
);

CREATE TABLE sheet_items (
  sheet_id integer NOT NULL REFERENCES sheets(id) ON DELETE CASCADE,
  item     text    NOT NULL,
  value    numeric NOT NULL,         -- exact; never float
  raw      text    NOT NULL,         -- as written in the source, for display
  PRIMARY KEY (sheet_id, item)
);
```

The Pledges CSV has more columns (Pledge Date, Opening Balance, Additions, Receipts,
Expected Dates…). If those are needed later, put them in a separate `pledges` table.
`sheet_items` holds only what the reconcile check reads.

## CSV import (`scripts/import-csv.ts`)

1. Parse each file with the existing `csvSource(name, text)`. This keeps the same validation:
   non-numeric values and duplicate items are rejected, and the TOTAL row is skipped.
2. For each month in `months()` (or a month given on the command line if the file has none):
   - `INSERT INTO sheets (kind, team, month, source_file) VALUES ($1,$2,$3,$4)
      ON CONFLICT (kind, team, month) DO UPDATE SET source_file = EXCLUDED.source_file, loaded_at = now()
      RETURNING id`
   - `DELETE FROM sheet_items WHERE sheet_id = $1`, then insert each item. A re-import
     replaces the month instead of merging with it.
   - Run the whole file in one transaction.
3. Check: for each imported month, `reconcile(csvSheet, pgSheet)` must print
   `All numbers match.`
