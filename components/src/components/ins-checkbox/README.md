# ins-checkbox



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `checked`    | `checked`     |             | `boolean` | `undefined` |
| `disabled`   | `disabled`    |             | `boolean` | `undefined` |
| `falseValue` | `false-value` |             | `string`  | `""`        |
| `hasLoad`    | `has-load`    |             | `string`  | `undefined` |
| `label`      | `label`       |             | `string`  | `undefined` |
| `name`       | `name`        |             | `string`  | `""`        |
| `tooltip`    | `tooltip`     |             | `string`  | `""`        |
| `trueValue`  | `true-value`  |             | `string`  | `""`        |
| `value`      | `value`       |             | `string`  | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insCheck`       |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `updateCheckState(state: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ins-table](../ins-table)

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-checkbox --> ins-input-tooltip
  ins-table --> ins-checkbox
  style ins-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
