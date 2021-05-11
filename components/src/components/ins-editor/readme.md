# ins-editor



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type      | Default                                                |
| -------------------- | ---------------------- | ----------- | --------- | ------------------------------------------------------ |
| `classId`            | `class-id`             |             | `string`  | `""`                                                   |
| `disableLineNumbers` | `disable-line-numbers` |             | `boolean` | `false`                                                |
| `errorMessage`       | `error-message`        |             | `string`  | `""`                                                   |
| `hasCodeEditor`      | `has-code-editor`      |             | `boolean` | `false`                                                |
| `hasError`           | `has-error`            |             | `boolean` | `false`                                                |
| `imageUpload`        | `image-upload`         |             | `boolean` | `false`                                                |
| `images`             | `images`               |             | `string`  | `""`                                                   |
| `label`              | `label`                |             | `string`  | `""`                                                   |
| `mode`               | `mode`                 |             | `string`  | `"htmlmixed"`                                          |
| `name`               | `name`                 |             | `string`  | `""`                                                   |
| `pluginsList`        | `plugins-list`         |             | `any`     | `['alignment', 'table', 'imagemanager', 'fullscreen']` |
| `readonly`           | `readonly`             |             | `boolean` | `false`                                                |
| `showSource`         | `show-source`          |             | `boolean` | `false`                                                |
| `theme`              | `theme`                |             | `string`  | `""`                                                   |
| `tooltip`            | `tooltip`              |             | `string`  | `""`                                                   |
| `value`              | `value`                |             | `string`  | `""`                                                   |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `insBlur`        |             | `CustomEvent<any>` |
| `insInput`       |             | `CustomEvent<any>` |
| `insUpload`      |             | `CustomEvent<any>` |
| `insValueChange` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `setValue(value: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `val() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- [ins-input-tooltip](../ins-input-tooltip)

### Graph
```mermaid
graph TD;
  ins-editor --> ins-input-tooltip
  style ins-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
