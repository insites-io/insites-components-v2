# ins-button-group



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `activeIndex`  | `active-index`  |             | `number`  | `0`         |
| `activeOption` | `active-option` |             | `string`  | `""`        |
| `color`        | `color`         |             | `string`  | `'blue'`    |
| `disabled`     | `disabled`      |             | `boolean` | `undefined` |
| `hasLoad`      | `has-load`      |             | `string`  | `undefined` |
| `options`      | `options`       |             | `string`  | `""`        |
| `size`         | `size`          |             | `string`  | `'normal'`  |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `didLoad`  |             | `CustomEvent<any>` |
| `insClick` |             | `CustomEvent<any>` |


## Methods

### `getActiveOption() => Promise<{ index: number; label: any; }>`



#### Returns

Type: `Promise<{ index: number; label: any; }>`



### `setActiveOption(option: any) => Promise<void>`



#### Parameters

| Name     | Type  | Description |
| -------- | ----- | ----------- |
| `option` | `any` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
