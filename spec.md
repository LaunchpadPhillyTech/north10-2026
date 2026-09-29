`# Spec v1: reconcile check`

`## What it does`
`Takes one team sheet and the primary for the same month and lists every`
`item where the two disagree. If they agree, it says so.`

`## Inputs`
`One team sheet and one primary. Each is a list of items with a number`
`next to each.`

`## Outputs`
`One line per problem: the item, the team's number, the master's number.`
`If nothing is wrong, one line: "All numbers match."`

`## Done when`
`A matching pair prints "All numbers match." Change one number in the`
`master and it lists that item and only that item, with both numbers.`