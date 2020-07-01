# v2.0.0

## Changes from V1
- Updated event `oninput` to `pick` to be consistent with `ins-date-time`
- Updated event `valueChange` to `changeValue` to avoid conflict with the native DOM event name
- Removed event `onblur` as `pick` is enough
- Removed jQuery dependency and used Flatpickr instead