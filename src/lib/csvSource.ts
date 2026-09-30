import { SheetError, type Sheet, type SheetSource } from './types';

type Row = { line: number; cells: string[] };
type Rec = { line: number; month: string | null; item: string; raw: string };

/** RFC 4180 parse: quoted fields may contain commas, quotes ("") and newlines. */
export function parseCsv(text: string): Row[] {
	const rows: Row[] = [];
	let cells: string[] = [];
	let field = '';
	let quoted = false;
	let line = 1;
	let rowLine = 1;
	text = text.replace(/^﻿/, '');
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (quoted) {
			if (c === '"' && text[i + 1] === '"') {
				field += '"';
				i++;
			} else if (c === '"') {
				quoted = false;
			} else {
				if (c === '\n') line++;
				field += c;
			}
		} else if (c === '"') {
			quoted = true;
		} else if (c === ',') {
			cells.push(field);
			field = '';
		} else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			cells.push(field);
			rows.push({ line: rowLine, cells });
			cells = [];
			field = '';
			rowLine = ++line;
		} else {
			field += c;
		}
	}
	if (field !== '' || cells.length) {
		cells.push(field);
		rows.push({ line: rowLine, cells });
	}
	return rows.filter((r) => r.cells.join('').trim() !== '');
}

/** Canonical decimal string, or null if `raw` is not a plain number. "15.50" and "15.5" compare equal. */
export function canonical(raw: string): string | null {
	const m = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(raw.trim());
	if (!m || (m[2] === '' && !m[3])) return null;
	const int = m[2].replace(/^0+/, '') || '0';
	const frac = (m[3] ?? '').replace(/0+$/, '');
	const abs = frac ? `${int}.${frac}` : int;
	return m[1] === '-' && abs !== '0' ? `-${abs}` : abs;
}

const norm = (s: string) => s.trim().toLowerCase();

function records(name: string, rows: Row[]): { hasMonth: boolean; records: Rec[] } {
	if (!rows.length) throw new SheetError(`${name}: file is empty`);
	const header = rows[0].cells.map(norm);
	const donor = header.indexOf('donor');
	const ending = header.indexOf('ending balance');

	// Pledges receivable layout: item = Donor, number = Ending Balance, one block per Month.
	if (donor >= 0 && ending >= 0) {
		const month = header.indexOf('month');
		return {
			hasMonth: month >= 0,
			records: rows
				.slice(1)
				.map((r) => ({
					line: r.line,
					month: month >= 0 ? (r.cells[month] ?? '').trim() : null,
					item: (r.cells[donor] ?? '').trim(),
					raw: (r.cells[ending] ?? '').trim()
				}))
				.filter((r) => norm(r.item) !== 'total')
		};
	}

	// Plain layout: item,number with an optional header row.
	const out: Rec[] = [];
	rows.forEach((r, i) => {
		if (r.cells.length < 2) {
			throw new SheetError(`${name}:${r.line}: expected 'item,number', got '${r.cells.join(',')}'`);
		}
		const raw = r.cells[1].trim();
		if (i === 0 && canonical(raw) === null) return; // header row
		out.push({ line: r.line, month: null, item: r.cells[0].trim(), raw });
	});
	return { hasMonth: false, records: out };
}

export function csvSource(name: string, text: string): SheetSource {
	const parsed = records(name, parseCsv(text));
	return {
		async months() {
			if (!parsed.hasMonth) return [];
			return [...new Set(parsed.records.map((r) => r.month ?? ''))].filter(Boolean);
		},
		async load(month) {
			const sheet: Sheet = new Map();
			for (const r of parsed.records) {
				if (month !== null && parsed.hasMonth && r.month !== month) continue;
				const value = canonical(r.raw);
				if (value === null) throw new SheetError(`${name}:${r.line}: '${r.raw}' is not a number`);
				if (sheet.has(r.item)) {
					throw new SheetError(`${name}:${r.line}: item '${r.item}' appears more than once`);
				}
				sheet.set(r.item, { value, raw: r.raw });
			}
			return sheet;
		}
	};
}
