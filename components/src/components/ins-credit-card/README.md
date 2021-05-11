# ins-credit-card



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `active`      | `active`       |             | `boolean` | `undefined` |
| `brand`       | `brand`        |             | `string`  | `undefined` |
| `expired`     | `expired`      |             | `boolean` | `undefined` |
| `expiryMonth` | `expiry-month` |             | `string`  | `undefined` |
| `expiryYear`  | `expiry-year`  |             | `string`  | `undefined` |
| `fullYear`    | `full-year`    |             | `boolean` | `undefined` |
| `hasLoad`     | `has-load`     |             | `string`  | `undefined` |
| `lastFour`    | `last-four`    |             | `string`  | `undefined` |
| `value`       | `value`        |             | `string`  | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insClick`       |             | `CustomEvent<any>` |
| `insClose`       |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<string>`



#### Returns

Type: `Promise<string>`



### `setValue(value: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
