# ins-toggle-switch



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type      | Default     |
| --------------- | ---------------- | ----------- | --------- | ----------- |
| `checked`       | `checked`        |             | `boolean` | `undefined` |
| `disabled`      | `disabled`       |             | `boolean` | `undefined` |
| `disabledLabel` | `disabled-label` |             | `string`  | `undefined` |
| `enabledLabel`  | `enabled-label`  |             | `string`  | `undefined` |
| `falseValue`    | `false-value`    |             | `string`  | `""`        |
| `hasLoad`       | `has-load`       |             | `string`  | `undefined` |
| `label`         | `label`          |             | `string`  | `undefined` |
| `name`          | `name`           |             | `string`  | `undefined` |
| `tooltip`       | `tooltip`        |             | `string`  | `""`        |
| `trueValue`     | `true-value`     |             | `string`  | `""`        |
| `value`         | `value`          |             | `string`  | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insToggle`      |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-toggle-switch --> ins-input-tooltip
  style ins-toggle-switch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
