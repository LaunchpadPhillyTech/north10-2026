import { fail } from "@sveltejs/kit";
class SheetError extends Error {
}
function parseCsv(text) {
  const rows = [];
  let cells = [];
  let field = "";
  let quoted = false;
  let line = 1;
  let rowLine = 1;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        if (c === "\n") line++;
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      cells.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      cells.push(field);
      rows.push({ line: rowLine, cells });
      cells = [];
      field = "";
      rowLine = ++line;
    } else {
      field += c;
    }
  }
  if (field !== "" || cells.length) {
    cells.push(field);
    rows.push({ line: rowLine, cells });
  }
  return rows.filter((r) => r.cells.join("").trim() !== "");
}
function canonical(raw) {
  const m = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(raw.trim());
  if (!m || m[2] === "" && !m[3]) return null;
  const int = m[2].replace(/^0+/, "") || "0";
  const frac = (m[3] ?? "").replace(/0+$/, "");
  const abs = frac ? `${int}.${frac}` : int;
  return m[1] === "-" && abs !== "0" ? `-${abs}` : abs;
}
const norm = (s) => s.trim().toLowerCase();
function records(name, rows) {
  if (!rows.length) throw new SheetError(`${name}: file is empty`);
  const header = rows[0].cells.map(norm);
  const donor = header.indexOf("donor");
  const ending = header.indexOf("ending balance");
  if (donor >= 0 && ending >= 0) {
    const month = header.indexOf("month");
    return {
      hasMonth: month >= 0,
      records: rows.slice(1).map((r) => ({
        line: r.line,
        month: month >= 0 ? (r.cells[month] ?? "").trim() : null,
        item: (r.cells[donor] ?? "").trim(),
        raw: (r.cells[ending] ?? "").trim()
      })).filter((r) => norm(r.item) !== "total")
    };
  }
  const out = [];
  rows.forEach((r, i) => {
    if (r.cells.length < 2) {
      throw new SheetError(`${name}:${r.line}: expected 'item,number', got '${r.cells.join(",")}'`);
    }
    const raw = r.cells[1].trim();
    if (i === 0 && canonical(raw) === null) return;
    out.push({ line: r.line, month: null, item: r.cells[0].trim(), raw });
  });
  return { hasMonth: false, records: out };
}
function csvSource(name, text) {
  const parsed = records(name, parseCsv(text));
  return {
    async months() {
      if (!parsed.hasMonth) return [];
      return [...new Set(parsed.records.map((r) => r.month ?? ""))].filter(Boolean);
    },
    async load(month) {
      const sheet = /* @__PURE__ */ new Map();
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
const MISSING = "Missing";
const ALL_MATCH = "All numbers match.";
function reconcile(team, primary) {
  const items = [...team.keys(), ...[...primary.keys()].filter((i) => !team.has(i))];
  const problems = items.flatMap((item) => {
    const t = team.get(item);
    const p = primary.get(item);
    if (t && p && t.value === p.value) return [];
    return [`${item} | Team: ${t?.raw ?? MISSING} | Master: ${p?.raw ?? MISSING}`];
  });
  return problems.length ? problems : [ALL_MATCH];
}
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const team = form.get("team");
    const primary = form.get("primary");
    const month = String(form.get("month") ?? "") || null;
    if (!(team instanceof File) || !team.size || !(primary instanceof File) || !primary.size) {
      return fail(400, { error: "Choose a team sheet and a primary." });
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
export {
  actions
};
