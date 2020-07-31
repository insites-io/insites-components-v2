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

### Graph
```mermaid
graph TD;
  ins-table --> ins-checkbox
  style ins-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
