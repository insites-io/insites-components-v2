# ins-sort



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type      | Default                |
| ---------------- | ----------------- | ----------- | --------- | ---------------------- |
| `cloneOnDrag`    | `clone-on-drag`   |             | `boolean` | `false`                |
| `disabled`       | `disabled`        |             | `boolean` | `false`                |
| `droppable`      | `droppable`       |             | `boolean` | `true`                 |
| `hasLoad`        | `has-load`        |             | `string`  | `undefined`            |
| `ignoreElements` | `ignore-elements` |             | `string`  | `null`                 |
| `insDraggable`   | `ins-draggable`   |             | `boolean` | `true`                 |
| `sort`           | `sort`            |             | `boolean` | `true`                 |
| `sortGroup`      | `sort-group`      |             | `string`  | `"insites-sort-group"` |
| `wrapperClass`   | `wrapper-class`   |             | `string`  | `"insites-sortable"`   |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `didLoad`            |             | `CustomEvent<any>`    |
| `insAdd`             |             | `CustomEvent<Object>` |
| `insChoose`          |             | `CustomEvent<Object>` |
| `insClone`           |             | `CustomEvent<Object>` |
| `insDragEnd`         |             | `CustomEvent<Object>` |
| `insDragStart`       |             | `CustomEvent<Object>` |
| `insDrop`            |             | `CustomEvent<Object>` |
| `insMove`            |             | `CustomEvent<Object>` |
| `insPositionChanged` |             | `CustomEvent<Object>` |
| `insRemove`          |             | `CustomEvent<Object>` |
| `insUpdate`          |             | `CustomEvent<Object>` |


## Methods

### `arrange(sortable: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getSortOrder() => Promise<{}>`



#### Returns

Type: `Promise<{}>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
