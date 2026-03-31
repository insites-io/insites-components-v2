# Insites Branch Naming Convention

## Format

```
type/description
```

## Branch Types

| Prefix      | Purpose                              | Example                          |
| ----------- | ------------------------------------ | -------------------------------- |
| `feature/`  | New feature development              | `feature/bulk-contact-export`    |
| `bugfix/`   | Bug fixes                            | `bugfix/order-tax-calculation`   |
| `hotfix/`   | Urgent production fixes              | `hotfix/v5.13.3`                 |
| `release/`  | Release preparation                  | `release/v5.12.0`               |
| `refactor/` | Code refactoring                     | `refactor/extract-composables`   |
| `chore/`    | Tooling, dependencies, CI            | `chore/update-stencil-v4`        |
| `test/`     | Adding or updating tests             | `test/contact-form-validation`   |

## Rules

1. Use **lowercase** with **hyphens** as separators
2. Keep branch names **short but descriptive**
3. Include the Teamwork task number when applicable: `feature/TW25132704-bulk-export`
4. The `master` branch is the production branch for all repos
5. Never commit directly to `master` - always use a PR
6. Delete branches after merging
