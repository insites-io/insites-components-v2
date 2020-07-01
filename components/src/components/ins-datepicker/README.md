# ins-datepicker



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `disabled`     | `disabled`      |             | `boolean` | `false`     |
| `errorMessage` | `error-message` |             | `string`  | `""`        |
| `format`       | `format`        |             | `string`  | `undefined` |
| `hasError`     | `has-error`     |             | `boolean` | `false`     |
| `icon`         | `icon`          |             | `string`  | `""`        |
| `label`        | `label`         |             | `string`  | `undefined` |
| `maxDate`      | `max-date`      |             | `string`  | `""`        |
| `minDate`      | `min-date`      |             | `string`  | `""`        |
| `name`         | `name`          |             | `string`  | `undefined` |
| `placeholder`  | `placeholder`   |             | `string`  | `""`        |
| `readonly`     | `readonly`      |             | `boolean` | `false`     |
| `value`        | `value`         |             | `string`  | `""`        |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `insInput`       |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [ins-table](../ins-table)

### Depends on

- [ins-date-time](../ins-date-time)

### Graph
```mermaid
graph TD;
  ins-datepicker --> ins-date-time
  ins-table --> ins-datepicker
  style ins-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
