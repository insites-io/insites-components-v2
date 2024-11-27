# ins-radio



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `checkLoad`   | `check-load`   |             | `boolean` | `false`     |
| `checked`     | `checked`      |             | `boolean` | `undefined` |
| `disabled`    | `disabled`     |             | `boolean` | `undefined` |
| `hasLoad`     | `has-load`     |             | `string`  | `undefined` |
| `label`       | `label`        |             | `any`     | `undefined` |
| `load`        | `load`         |             | `boolean` | `false`     |
| `name`        | `name`         |             | `any`     | `undefined` |
| `staticValue` | `static-value` |             | `any`     | `undefined` |
| `tooltip`     | `tooltip`      |             | `string`  | `""`        |
| `value`       | `value`        |             | `any`     | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insCheck`       |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `setChecked() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setValue(value: any, static_value: any) => Promise<void>`



#### Parameters

| Name           | Type  | Description |
| -------------- | ----- | ----------- |
| `value`        | `any` |             |
| `static_value` | `any` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ins-credit-card](../ins-credit-card)
 - [ins-radio-group](../ins-radio-group)

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-radio --> ins-input-tooltip
  ins-credit-card --> ins-radio
  ins-radio-group --> ins-radio
  style ins-radio fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
