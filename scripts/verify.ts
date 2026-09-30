// Checks the spec's "Done when" against the fixtures: npm run verify
import { readFileSync } from 'node:fs';
import { csvSource } from '../src/lib/csvSource';
import { reconcile } from '../src/lib/server/reconcile';

const load = (path: string, month: string | null = null, edit = (t: string) => t) =>
	csvSource(path, edit(readFileSync(path, 'utf-8'))).load(month);

const pledges = 'data/Pledges-Receivable-Combined.csv';
const cases: [string, Promise<string[]>, string[]][] = [
	[
		'samples match',
		Promise.all([load('samples/team.csv'), load('samples/primary.csv')]).then(([t, p]) => reconcile(t, p)),
		['All numbers match.']
	],
	[
		'samples one change',
		Promise.all([load('samples/team.csv'), load('samples/primary-one-change.csv')]).then(([t, p]) => reconcile(t, p)),
		['Widget B | Team: 22 | Master: 23']
	],
	[
		'pledges July match',
		Promise.all([load(pledges, 'July 2026'), load(pledges, 'July 2026')]).then(([t, p]) => reconcile(t, p)),
		['All numbers match.']
	],
	[
		'pledges July one change',
		Promise.all([
			load(pledges, 'July 2026'),
			load(pledges, 'July 2026', (t) => t.replace('Two year period,4993,,,,2025-07-02,No,4993', 'Two year period,4993,,,,2025-07-02,No,5000'))
		]).then(([t, p]) => reconcile(t, p)),
		['Marsden Family Foundation | Team: 4993 | Master: 5000']
	]
];

let failed = 0;
for (const [name, actual, expected] of cases) {
	const got = await actual;
	const ok = JSON.stringify(got) === JSON.stringify(expected);
	if (!ok) failed++;
	console.log(`${ok ? 'PASS' : 'FAIL'} ${name}\n  ${got.join('\n  ')}`);
}
process.exit(failed ? 1 : 0);
