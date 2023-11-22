# ins-input-table



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type      | Default        |
| ------------------- | --------------------- | ----------- | --------- | -------------- |
| `addButtonColor`    | `add-button-color`    |             | `string`  | `"blue"`       |
| `addButtonIcon`     | `add-button-icon`     |             | `string`  | `"icon-plus"`  |
| `disabled`          | `disabled`            |             | `boolean` | `undefined`    |
| `errorMessage`      | `error-message`       |             | `string`  | `undefined`    |
| `hasError`          | `has-error`           |             | `boolean` | `undefined`    |
| `hasLoad`           | `has-load`            |             | `string`  | `undefined`    |
| `label`             | `label`               |             | `string`  | `undefined`    |
| `readonly`          | `readonly`            |             | `boolean` | `undefined`    |
| `removeButtonColor` | `remove-button-color` |             | `string`  | `"blue"`       |
| `removeButtonIcon`  | `remove-button-icon`  |             | `string`  | `"icon-minus"` |
| `tableData`         | `table-data`          |             | `any`     | `[]`           |
| `tableHeaders`      | `table-headers`       |             | `any`     | `[]`           |
| `tooltip`           | `tooltip`             |             | `string`  | `undefined`    |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `didLoad`   |             | `CustomEvent<any>` |
| `insChange` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `setValue(value: any) => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)
- [ins-input](../ins-input)
- [ins-button](../ins-button)

### Graph
```mermaid
graph TD;
  ins-input-table --> ins-input-tooltip
  ins-input-table --> ins-input
  ins-input-table --> ins-button
  ins-input --> ins-input-tooltip
  style ins-input-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
