# Insites Commit Message Convention

## Format

```
[TW#<id>] Short description of what changed
```

## Examples

- `[TW#21345] Add bulk contact export to CSV`
- `[TW#21346] Fix cart total calculation for discounted items`
- `[TW#21347] Update ins-table pagination event handling`
- `[TW#21348] Standardise event stream payload format across modules`

## Rules

1. Always include the Teamwork task ID in square brackets at the start.
2. Describe **what** changed and **why**, not how (the diff shows the how).
3. Each commit should represent **one logical change**, not an entire day of work.
4. Small related tasks should be grouped together to avoid over-committing small amounts of work.
5. If a task involves updating the UI and fixing a backend query, those should be **separate commits**.
6. Never commit `console.log` statements, commented-out code blocks, or hardcoded test data.
7. Code is pushed at the end of each working day at minimum.

## Multiple Tasks in One Commit

If a commit addresses multiple related tasks:

```
[TW#21345][TW#21346] Standardise contact export and import validation
```

## Commits Without a Teamwork Task

For build output, dependency updates, or tooling changes that do not have a Teamwork task:

```
Update build files for v5.13.3
Update insites-components-v2 CDN to v2.15.3
```
