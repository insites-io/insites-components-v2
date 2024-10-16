# ins-card-select



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `disabled`     | `disabled`      |             | `boolean` | `undefined` |
| `errorMessage` | `error-message` |             | `string`  | `undefined` |
| `hasError`     | `has-error`     |             | `boolean` | `undefined` |
| `label`        | `label`         |             | `string`  | `undefined` |
| `multiple`     | `multiple`      |             | `boolean` | `undefined` |
| `readonly`     | `readonly`      |             | `boolean` | `undefined` |
| `tooltip`      | `tooltip`       |             | `string`  | `undefined` |
| `value`        | `value`         |             | `any`     | `undefined` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `didLoad`  |             | `CustomEvent<any>` |
| `insInput` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `setValue(value: any) => Promise<void>`



#### Parameters

| Name    | Type  | Description |
| ------- | ----- | ----------- |
| `value` | `any` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-card-select --> ins-input-tooltip
  style ins-card-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
