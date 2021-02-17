# ins-markdown-editor



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `errorMessage` | `error-message` |             | `string`  | `""`        |
| `hasError`     | `has-error`     |             | `boolean` | `undefined` |
| `hasLoad`      | `has-load`      |             | `string`  | `undefined` |
| `label`        | `label`         |             | `string`  | `""`        |
| `name`         | `name`          |             | `string`  | `""`        |
| `readonly`     | `readonly`      |             | `boolean` | `undefined` |
| `required`     | `required`      |             | `boolean` | `undefined` |
| `tooltip`      | `tooltip`       |             | `string`  | `""`        |
| `value`        | `value`         |             | `string`  | `""`        |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setValue(value: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `val() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-markdown-editor --> ins-input-tooltip
  style ins-markdown-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
