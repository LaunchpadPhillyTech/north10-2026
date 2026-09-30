# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A reconcile check (see `spec.md`): compare one team sheet against the primary ("master") for the same month and list every item whose numbers disagree. SvelteKit 2 + Svelte 5 runes, TypeScript strict, adapter-node. No database yet. `reconcile.py` is the original Python version of the same check and is the reference for output format.

## Commands

```bash
npm run dev      # dev server
npm run check    # svelte-kit sync + svelte-check (typecheck — the primary correctness gate)
npm run verify   # runs scripts/verify.ts: the spec's "Done when" cases against samples/ and data/
npm run build    # adapter-node build into build/
npm start        # node build (set PORT / ORIGIN as needed)
```

There is no test framework. To add a case, add an entry to the `cases` array in `scripts/verify.ts`; the script exits non-zero if any case fails.

## Output contract (do not change without a spec change)

The spec says to match the output shape exactly and add nothing extra:

- One line per problem: `Item | Team: X | Master: Y`, where X and Y are the numbers as written in the file.
- An item present in only one file is a problem, shown as `Missing` on the absent side.
- Order: team items in file order, then items found only in the primary.
- No problems → the single line `All numbers match.`

## Architecture

The data flows from a source to a pure compare:

1. `src/lib/types.ts` defines `Sheet` (item → `{ value, raw }`) and the `SheetSource` interface (`months()`, `load(month)`). `value` is a canonical decimal string, so comparisons never use floats (`15.50` equals `15.5`). `raw` is what gets displayed.
2. `src/lib/csvSource.ts` is the only `SheetSource` today. It detects two layouts from the header:
   - **Pledges layout** (header has `Donor` and `Ending Balance`): item = Donor, number = Ending Balance, rows filtered by the `Month` column, and the `TOTAL` row skipped. Example: `data/Pledges-Receivable-Combined.csv`, which holds several months in one file.
   - **Plain layout**: `item,number`, with an optional header row. Examples: `samples/*.csv`.

   It throws `SheetError` for a non-numeric value or a duplicate item within the selected month. It lives in `$lib` rather than `$lib/server` because the browser also uses it to read the months from the files you pick.
3. `src/lib/server/reconcile.ts` compares two `Sheet`s and returns the output lines.
4. `src/routes/`: the page reads each chosen file on the client to fill the month dropdown (the months found in both files). The form then posts both files and the month to the default action in `+page.server.ts`, which loads both sheets and calls `reconcile`.

## Database migration (planned, not built)

`docs/db-migration.md` has the design: `sheets` and `sheet_items` tables (`numeric` values, plus `raw` for display), a `pgSource.ts` that implements `SheetSource` with parameterized `pg.Pool` queries, the dual-mode credential pattern (`AWS_SECRET_ID` → Secrets Manager, otherwise `.env`), and an import script that reuses `csvSource` and upserts each month. When the database is built, only the source changes; `reconcile` and the output stay the same.
