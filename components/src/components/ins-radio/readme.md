# ins-radio



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `checked`     | `checked`      |             | `boolean` | `undefined` |
| `disabled`    | `disabled`     |             | `boolean` | `undefined` |
| `hasLoad`     | `has-load`     |             | `string`  | `undefined` |
| `label`       | `label`        |             | `any`     | `undefined` |
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


## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-radio --> ins-input-tooltip
  style ins-radio fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
