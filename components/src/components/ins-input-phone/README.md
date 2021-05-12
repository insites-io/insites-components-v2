# ins-input-tel



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `disabled`     | `disabled`      |             | `boolean` | `undefined` |
| `errorMessage` | `error-message` |             | `string`  | `""`        |
| `fieldId`      | `field-id`      |             | `string`  | `""`        |
| `hasError`     | `has-error`     |             | `boolean` | `undefined` |
| `hasLoad`      | `has-load`      |             | `string`  | `undefined` |
| `label`        | `label`         |             | `string`  | `""`        |
| `name`         | `name`          |             | `string`  | `""`        |
| `placeholder`  | `placeholder`   |             | `string`  | `""`        |
| `readonly`     | `readonly`      |             | `boolean` | `undefined` |
| `required`     | `required`      |             | `boolean` | `undefined` |
| `tooltip`      | `tooltip`       |             | `string`  | `""`        |
| `validate`     | `validate`      |             | `boolean` | `undefined` |
| `value`        | `value`         |             | `string`  | `""`        |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insInput`       |             | `CustomEvent<any>` |
| `insValidation`  |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<string>`



#### Returns

Type: `Promise<string>`




## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-input-phone --> ins-input-tooltip
  style ins-input-phone fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
