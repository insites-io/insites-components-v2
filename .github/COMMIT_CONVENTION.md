# Insites Commit Message Convention

All commits across Insites repositories must follow this format.

## Format

```
type(scope): short description

[optional body]

[optional footer]
```

## Types

| Type       | When to Use                                                  |
| ---------- | ------------------------------------------------------------ |
| `feat`     | A new feature or user-facing functionality                   |
| `fix`      | A bug fix                                                    |
| `refactor` | Code change that neither fixes a bug nor adds a feature      |
| `chore`    | Build process, dependency updates, tooling changes           |
| `docs`     | Documentation only changes                                   |
| `style`    | Formatting, missing semicolons, white-space (no code change) |
| `test`     | Adding or updating tests                                     |
| `perf`     | Performance improvement                                      |
| `ci`       | CI/CD pipeline changes                                       |
| `build`    | Build file updates (app.css, app.js)                         |
| `revert`   | Reverting a previous commit                                  |

## Scope (optional)

The module area affected, in parentheses:

- `feat(contacts): add bulk export action`
- `fix(orders): correct tax calculation on quotes`
- `refactor(events): extract ticket pricing composable`

## Examples

```
feat(contacts): add bulk email export for selected contacts

Adds a new action button to the contacts list page that exports
email addresses for all selected contacts as CSV.

[TW#25132704]
```

```
fix: contacts search pagination total

The total count was not being updated after filtering, causing
pagination to show incorrect page numbers.
```

```
chore: update insites-components-v2 CDN to v2.15.3
```

```
build: update app.css and app.js for release v5.11.2
```

## Rules

1. Use **imperative mood** in the description ("add feature" not "added feature")
2. Do **not** capitalise the first letter of the description
3. Do **not** end the description with a period
4. Keep the first line under **72 characters**
5. Reference Teamwork tasks in the footer as `[TW#taskId]`
6. Separate `build` commits from feature/fix commits so the PR diff is reviewable
7. Use `WIP:` prefix for work-in-progress commits that will be squashed before merge
