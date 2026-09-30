import type { Sheet } from '$lib/types';

const MISSING = 'Missing';
export const ALL_MATCH = 'All numbers match.';

/** One line per item where team and primary disagree (or one side is missing), else "All numbers match." */
export function reconcile(team: Sheet, primary: Sheet): string[] {
	const items = [...team.keys(), ...[...primary.keys()].filter((i) => !team.has(i))];
	const problems = items.flatMap((item) => {
		const t = team.get(item);
		const p = primary.get(item);
		if (t && p && t.value === p.value) return [];
		return [`${item} | Team: ${t?.raw ?? MISSING} | Master: ${p?.raw ?? MISSING}`];
	});
	return problems.length ? problems : [ALL_MATCH];
}
