# ins-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `activated`    | `activated`     |             | `boolean` | `false`     |
| `disabled`     | `disabled`      |             | `boolean` | `false`     |
| `errorMessage` | `error-message` |             | `string`  | `""`        |
| `field`        | `field`         |             | `string`  | `'text'`    |
| `fieldId`      | `field-id`      |             | `string`  | `""`        |
| `hasError`     | `has-error`     |             | `boolean` | `false`     |
| `hasLoad`      | `has-load`      |             | `string`  | `undefined` |
| `icon`         | `icon`          |             | `string`  | `""`        |
| `iconEvent`    | `icon-event`    |             | `boolean` | `false`     |
| `iconTitle`    | `icon-title`    |             | `string`  | `""`        |
| `label`        | `label`         |             | `string`  | `""`        |
| `max`          | `max`           |             | `string`  | `""`        |
| `maxlength`    | `maxlength`     |             | `string`  | `""`        |
| `min`          | `min`           |             | `string`  | `""`        |
| `name`         | `name`          |             | `string`  | `""`        |
| `placeholder`  | `placeholder`   |             | `string`  | `""`        |
| `readonly`     | `readonly`      |             | `boolean` | `false`     |
| `required`     | `required`      |             | `boolean` | `false`     |
| `step`         | `step`          |             | `string`  | `""`        |
| `tooltip`      | `tooltip`       |             | `string`  | `""`        |
| `unitLeft`     | `unit-left`     |             | `string`  | `""`        |
| `unitRight`    | `unit-right`    |             | `string`  | `""`        |
| `value`        | `value`         |             | `string`  | `""`        |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insBlur`        |             | `CustomEvent<any>` |
| `insIconClick`   |             | `CustomEvent<any>` |
| `insInput`       |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<string>`



#### Returns

Type: `Promise<string>`



### `setValue(value: any) => Promise<void>`



#### Parameters

| Name    | Type  | Description |
| ------- | ----- | ----------- |
| `value` | `any` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ins-heading](../ins-heading)
 - [ins-instances](../ins-instances)
 - [ins-table](../ins-table)

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-input --> ins-input-tooltip
  ins-heading --> ins-input
  ins-instances --> ins-input
  ins-table --> ins-input
  style ins-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
