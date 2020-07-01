# ins-date-time



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
| `maxTime`      | `max-time`      |             | `string`  | `""`        |
| `minDate`      | `min-date`      |             | `string`  | `""`        |
| `minTime`      | `min-time`      |             | `string`  | `""`        |
| `mode`         | `mode`          |             | `string`  | `""`        |
| `name`         | `name`          |             | `string`  | `undefined` |
| `noMeridiem`   | `no-meridiem`   |             | `boolean` | `false`     |
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

 - [ins-datepicker](../ins-datepicker)
 - [ins-timepicker](../ins-timepicker)

### Graph
```mermaid
graph TD;
  ins-datepicker --> ins-date-time
  ins-timepicker --> ins-date-time
  style ins-date-time fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
