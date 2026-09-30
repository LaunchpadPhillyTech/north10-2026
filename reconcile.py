#!/usr/bin/env python3
"""Reconcile check (spec v1): compare one team sheet against the primary for the same month.

Usage: python3 reconcile.py TEAM.csv PRIMARY.csv

Each CSV has two columns: item, number. A header row is optional.
Prints one line per disagreeing item, or "All numbers match."
"""
import csv
import sys
from decimal import Decimal, InvalidOperation

MISSING = "Missing"


def load(path):
    items = {}
    with open(path, newline="", encoding="utf-8-sig") as f:
        for lineno, row in enumerate(csv.reader(f), start=1):
            if not row or not "".join(row).strip():
                continue
            if len(row) < 2:
                sys.exit(f"{path}:{lineno}: expected 'item,number', got {row!r}")
            item, raw = row[0].strip(), row[1].strip()
            try:
                value = Decimal(raw)
            except InvalidOperation:
                if lineno == 1:
                    continue  # header row
                sys.exit(f"{path}:{lineno}: '{raw}' is not a number")
            if item in items:
                sys.exit(f"{path}:{lineno}: item '{item}' appears more than once")
            items[item] = (value, raw)
    return items


def reconcile(team, primary):
    problems = []
    for item in list(team) + [i for i in primary if i not in team]:
        t, p = team.get(item), primary.get(item)
        if t is None or p is None or t[0] != p[0]:
            problems.append(
                f"{item} | Team: {t[1] if t else MISSING} | Master: {p[1] if p else MISSING}"
            )
    return problems


def main():
    if len(sys.argv) != 3:
        sys.exit("usage: reconcile.py TEAM.csv PRIMARY.csv")
    problems = reconcile(load(sys.argv[1]), load(sys.argv[2]))
    print("\n".join(problems) if problems else "All numbers match.")


if __name__ == "__main__":
    main()
