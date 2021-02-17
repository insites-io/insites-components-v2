# ins-heading



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type      | Default     |
| ----------------- | ------------------ | ----------- | --------- | ----------- |
| `backgroundColor` | `background-color` |             | `string`  | `'#fff'`    |
| `change`          | `change`           |             | `string`  | `""`        |
| `editable`        | `editable`         |             | `boolean` | `false`     |
| `hasLoad`         | `has-load`         |             | `string`  | `undefined` |
| `label`           | `label`            |             | `string`  | `""`        |
| `level`           | `level`            |             | `number`  | `6`         |
| `maxlength`       | `maxlength`        |             | `string`  | `""`        |
| `name`            | `name`             |             | `string`  | `""`        |
| `withoutLine`     | `without-line`     |             | `boolean` | `false`     |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `didLoad`   |             | `CustomEvent<any>` |
| `insChange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [ins-input](../ins-input)
- [ins-button](../ins-button)

### Graph
```mermaid
graph TD;
  ins-heading --> ins-input
  ins-heading --> ins-button
  ins-input --> ins-input-tooltip
  style ins-heading fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
