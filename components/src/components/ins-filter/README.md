# ins-filter



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type      | Default                                                                                                                                                                                    |
| ---------------- | ------------------ | ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dateFrom`       | `date-from`        |             | `string`  | `""`                                                                                                                                                                                       |
| `dateOpt`        | `date-opt`         |             | `any`     | `[         'All',         'Today',         'This Week',         'Last Week',         'This Month',         'Last Month',         'This Year',         'Last Year',         'Custom'     ]` |
| `dateTitle`      | `date-title`       |             | `any`     | `"Date Period"`                                                                                                                                                                            |
| `dateTo`         | `date-to`          |             | `string`  | `""`                                                                                                                                                                                       |
| `defaultDate`    | `default-date`     |             | `string`  | `""`                                                                                                                                                                                       |
| `withDateFilter` | `with-date-filter` |             | `boolean` | `false`                                                                                                                                                                                    |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `insDateFilter` |             | `CustomEvent<any>` |
| `insFilter`     |             | `CustomEvent<any>` |


## Methods

### `closeDateFilter() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getDate() => Promise<"All" | { from: string; to: string; }>`



#### Returns

Type: `Promise<"All" | { from: string; to: string; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
