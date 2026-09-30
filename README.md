# Reconcile check

Compares one team sheet against the primary (master) sheet for the same month and lists every item where the numbers disagree. If everything agrees, it says so. See [spec.md](spec.md) for the v1 spec.

## Output

One line per problem: the item, the team's number, the master's number.

```text
Widget B | Team: 22 | Master: 23
```

If an item is on only one sheet, the other side reads `Missing`. If nothing is wrong, the output is a single line:

```text
All numbers match.
```

## Getting started

Requires Node 20 or later.

```bash
npm install
npm run dev        # http://localhost:5173
```

Open the page, choose a team sheet and a primary, and click **Check**. If the files have a `Month` column, pick the month to compare first; only months that appear in both files are offered.

## Input formats

Both files must be CSV. The app recognizes two layouts from the header row:

| Layout | Item | Number | Example |
|---|---|---|---|
| Plain | first column | second column | [samples/team.csv](samples/team.csv) |
| Pledges receivable | `Donor` | `Ending Balance` | [data/Pledges-Receivable-Combined.csv](data/Pledges-Receivable-Combined.csv) |

- **Plain layout:** the header row (`item,number`) is optional.
- **Pledges layout:** one file can hold several months; rows are filtered by the `Month` column, and the `TOTAL` row is ignored.
- **Number comparison:** values are compared as exact decimals, so `15.5` and `15.50` match.
- **Errors:** a file with a non-numeric value or a duplicate item is rejected, and the error names the file and line.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run check` | Typecheck (svelte-check, strict TypeScript) |
| `npm run verify` | Run the spec's acceptance cases against the sample files |
| `npm run build` | Production build into `build/` (adapter-node) |
| `npm start` | Run the production build; set `PORT` and `ORIGIN` as needed |

`npm run verify` checks four cases:

- `samples/team.csv` against `samples/primary.csv` prints `All numbers match.`
- `samples/team.csv` against `samples/primary-one-change.csv` prints only the Widget B line.
- The Pledges file for July 2026 against itself prints `All numbers match.`
- The same July 2026 comparison, with one Ending Balance edited, prints only that donor.

To deploy on EC2, build and start with `NODE_ENV` passed on the command line rather than set in `.env`:

```bash
NODE_ENV=production npm run build
NODE_ENV=production node build
```

## Project layout

```text
src/lib/types.ts              Sheet and SheetSource types
src/lib/csvSource.ts          CSV parsing and layout detection
src/lib/server/reconcile.ts   The comparison (produces the output lines)
src/routes/                   Upload page and form action
scripts/verify.ts             Acceptance checks
samples/, data/               Example sheets
reconcile.py                  Original command-line version, plain layout only:
                              python3 reconcile.py TEAM.csv PRIMARY.csv
```

## Database (planned)

v1 has no database; sheets come from uploaded CSVs. [docs/db-migration.md](docs/db-migration.md) describes the move to PostgreSQL:

- the table schema;
- a database-backed source that plugs in where the CSV reader is used today;
- a script that imports existing CSVs month by month and confirms each imported month still reconciles clean against its source file.

The comparison logic and output do not change.
