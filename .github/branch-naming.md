# Insites Branch Naming Convention

All modules follow the same branching pattern. Each module has its own repository and independent version cycle.

## Branch Types

| Branch   | Pattern            | Purpose                                                                 |
| -------- | ------------------ | ----------------------------------------------------------------------- |
| master   | `master`           | Production-ready code. Always deployable. Protected.                    |
| staging  | `staging`          | Pre-production. All tasks completed and QA-passed before merge to master. |
| version  | `version/vX.Y.Z`   | Active development branch for a version release. All task work happens here. |
| hotfix   | `hotfix/vX.Y.Z`    | Emergency fixes for production issues. Merges directly to master.       |

## Development Flow

1. Create `version/vX.Y.Z` branch from `master` at the start of a version cycle.
2. All developers push task work directly to the version branch. No per-task branches needed.
3. After each task is completed, update the Teamwork task for QA review.
4. QA tests on the UAT instance. If bugs are found, the task is reassigned to the developer.
5. Developer fixes the bug, pushes to the version branch, and reassigns to QA.
6. Code is pushed at the end of each working day at minimum.
7. When all tasks in the version are QA-passed, create a PR from version branch to `staging`.
8. Update changelogs, bump version metadata, and merge the PR.
9. When ready to deploy, create a PR from `staging` to `master`.
10. After merge, create a version tag (`vX.Y.Z`) on GitHub.
11. Deploy to production on AWS S3.

## Hotfix Flow (Emergency Only)

1. Create `hotfix/vX.Y.Z` branch from `master`.
2. Make the fix, test on UAT.
3. Create a PR from `hotfix` to `master` (skip staging for genuine emergencies).
4. Tag the release and deploy.
5. Merge `master` back into any active version branch to keep it current.

## Pull Request Requirements

PRs are required at **two merge points only**: version to staging, and staging to master. They are not required for day-to-day pushes to the version branch.
