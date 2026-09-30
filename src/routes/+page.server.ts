import { fail } from '@sveltejs/kit';
import { csvSource } from '$lib/csvSource';
import { reconcile } from '$lib/server/reconcile';
import { SheetError } from '$lib/types';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const team = form.get('team');
		const primary = form.get('primary');
		const month = String(form.get('month') ?? '') || null;
		if (!(team instanceof File) || !team.size || !(primary instanceof File) || !primary.size) {
			return fail(400, { error: 'Choose a team sheet and a primary.' });
		}
		try {
			const teamSheet = await csvSource(team.name, await team.text()).load(month);
			const primarySheet = await csvSource(primary.name, await primary.text()).load(month);
			return { lines: reconcile(teamSheet, primarySheet) };
		} catch (e) {
			if (e instanceof SheetError) return fail(400, { error: e.message });
			throw e;
		}
	}
};
