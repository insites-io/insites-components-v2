# v2.0.0

## Changes from V1
- Updated event `onpick` to `insInput` to avoid conflict with the native DOM event name
- Updated event `valueChange` to `insValueChange` to avoid conflict with the native DOM event name
- Removed event `onblur` as `insInput` event is enough
- Removed jQuery dependency and used ins-date-time component instead