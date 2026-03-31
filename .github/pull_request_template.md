## Merge Type

- [ ] Release branch → Staging (all tasks completed and QA-passed)
- [ ] Staging → Master (ready for production deployment)
- [ ] Hotfix → Master (emergency production fix)

## Version

<!-- e.g. v5.13.3 -->

## Summary of Changes

<!-- Brief overview of what this version/hotfix includes. -->

## Teamwork Tasks

<!-- List all Teamwork task IDs addressed in this version. -->

- [TW#]
- [TW#]

## Breaking Changes

<!-- List any breaking changes or migration steps required. Write "None" if not applicable. -->

## Migration Notes

<!-- Any database changes, config updates, or deployment steps beyond the standard process. Write "None" if not applicable. -->

## QA Status

- [ ] All tasks QA-passed on UAT instance
- [ ] Changelogs updated
- [ ] Version metadata bumped
- [ ] Build files updated (app.css, app.js)

## Post-Merge

- [ ] Create version tag (vX.Y.Z) on GitHub (for staging → master merges)
- [ ] Deploy to production on AWS S3 (for staging → master merges)
- [ ] Merge master back into any active version branch (for hotfix merges)
