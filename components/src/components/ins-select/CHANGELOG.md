# v2.2.0
- Fixed bug when selecting options

# v2.1.0
- Applied refactored codes from V1
- Implement new props from V1, `with-dynamic-option-validate`, `dynamicHasError` and `dynamicErrorMessage`

## Changes from V1
- Methods are now asynchronous
- Update `valueChange` to `insValueChange` to avoid DOM event conflict
- Update `onOptionSelect` to `insSelect` to avoid DOM event conflict
- Update `onSearch` to `insSearch` to avoid DOM event conflict
- Update `onSubmitOption` to `insSubmit` to avoid DOM event conflict
- Update `loadMore` to `insLoadMore` to avoid DOM event conflict