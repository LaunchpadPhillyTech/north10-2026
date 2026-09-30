<script lang="ts">
	import { enhance } from '$app/forms';
	import { csvSource } from '$lib/csvSource';
	import { SheetError } from '$lib/types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let teamMonths = $state<string[]>([]);
	let primaryMonths = $state<string[]>([]);
	let fileError = $state('');

	// Months offered = those in both files (or in whichever file has a Month column).
	let months = $derived(
		teamMonths.length && primaryMonths.length
			? teamMonths.filter((m) => primaryMonths.includes(m))
			: teamMonths.length
				? teamMonths
				: primaryMonths
	);
	let noCommonMonth = $derived(teamMonths.length > 0 && primaryMonths.length > 0 && months.length === 0);

	async function readMonths(e: Event, set: (m: string[]) => void) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0];
		fileError = '';
		if (!file) return set([]);
		try {
			set(await csvSource(file.name, await file.text()).months());
		} catch (err) {
			set([]);
			if (err instanceof SheetError) fileError = err.message;
			else throw err;
		}
	}
</script>

<main>
	<h1>Reconcile check</h1>
	<form
		method="POST"
		enctype="multipart/form-data"
		use:enhance={() =>
			({ update }) =>
				update({ reset: false })}
	>
		<label>
			Team sheet
			<input type="file" name="team" accept=".csv" required onchange={(e) => readMonths(e, (m) => (teamMonths = m))} />
		</label>
		<label>
			Primary
			<input type="file" name="primary" accept=".csv" required onchange={(e) => readMonths(e, (m) => (primaryMonths = m))} />
		</label>
		{#if months.length}
			<label>
				Month
				<select name="month" required>
					{#each months as m (m)}
						<option value={m}>{m}</option>
					{/each}
				</select>
			</label>
		{/if}
		<button type="submit" disabled={noCommonMonth}>Check</button>
	</form>

	{#if fileError}
		<p class="error">{fileError}</p>
	{:else if noCommonMonth}
		<p class="error">No month appears in both files.</p>
	{:else if form?.error}
		<p class="error">{form.error}</p>
	{:else if form?.lines}
		<pre>{form.lines.join('\n')}</pre>
	{/if}
</main>

<style>
	main {
		max-width: 48rem;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
	}
	form {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: end;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
	}
	pre {
		margin-top: 1.5rem;
		padding: 1rem;
		background: #f4f4f5;
		white-space: pre-wrap;
	}
	.error {
		margin-top: 1.5rem;
		color: #b91c1c;
	}
</style>
