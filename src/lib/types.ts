/** One number on a sheet: `value` is a canonical decimal string (safe to compare), `raw` is as written. */
export type Entry = { value: string; raw: string };

/** A sheet for one month: item name -> number. */
export type Sheet = Map<string, Entry>;

/**
 * Where a sheet comes from. v1 reads uploaded CSVs (csvSource.ts); a Postgres
 * source will implement the same interface (see docs/db-migration.md).
 */
export interface SheetSource {
	/** Months present in the source; empty when the source has no month column. */
	months(): Promise<string[]>;
	/** The sheet for `month`, or the whole source when `month` is null. */
	load(month: string | null): Promise<Sheet>;
}

export class SheetError extends Error {}
