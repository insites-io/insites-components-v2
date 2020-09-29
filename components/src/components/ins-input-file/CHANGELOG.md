# v2.1.0
- [TW#16925380] Updated styleUrls to styleUrl and combined basic.min.css to dropzone.min.css 
- [TW#16925380] Added updateDropZone for componentDidUpdate lifecycle to prevent reinitialising dropzone
- Implement new props from v1, `no-default-value`, `subtext` and `type-label`

## Changes from V1
- Methods are now asynchronous
- Update `fileAdded` to `insFileAdded` to avoid DOM event conflict
- Update `fileError` to `insFileError` to avoid DOM event conflict
- Update `fileRemoved` to `insFileRemoved` to avoid DOM event conflict