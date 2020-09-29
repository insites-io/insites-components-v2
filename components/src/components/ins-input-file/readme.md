# ins-input-file



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type      | Default                               |
| ------------------- | --------------------- | ----------- | --------- | ------------------------------------- |
| `acceptedFiles`     | `accepted-files`      |             | `string`  | `null`                                |
| `autoUpload`        | `auto-upload`         |             | `boolean` | `false`                               |
| `capture`           | `capture`             |             | `string`  | `null`                                |
| `credentialsUrl`    | `credentials-url`     |             | `string`  | `undefined`                           |
| `disabled`          | `disabled`            |             | `boolean` | `false`                               |
| `errorMessage`      | `error-message`       |             | `string`  | `""`                                  |
| `fieldName`         | `field-name`          |             | `string`  | `undefined`                           |
| `fieldType`         | `field-type`          |             | `string`  | `"image"`                             |
| `fileIcon`          | `file-icon`           |             | `string`  | `"icon-notepad"`                      |
| `hasError`          | `has-error`           |             | `boolean` | `false`                               |
| `hasLoad`           | `has-load`            |             | `string`  | `undefined`                           |
| `label`             | `label`               |             | `string`  | `"Attachment(s)"`                     |
| `maxFileSize`       | `max-file-size`       |             | `number`  | `10`                                  |
| `maxFileSizeLabel`  | `max-file-size-label` |             | `string`  | `"Max file size"`                     |
| `maxFiles`          | `max-files`           |             | `number`  | `1`                                   |
| `maxFilesLabel`     | `max-files-label`     |             | `string`  | `"Up to"`                             |
| `name`              | `name`                |             | `string`  | `"file"`                              |
| `placeholder`       | `placeholder`         |             | `string`  | `"Drop file here or click to upload"` |
| `required`          | `required`            |             | `boolean` | `false`                               |
| `s3Data`            | --                    |             | `object`  | `undefined`                           |
| `showLimit`         | `show-limit`          |             | `boolean` | `true`                                |
| `showNotifications` | `show-notifications`  |             | `boolean` | `true`                                |
| `subtext`           | `subtext`             |             | `string`  | `""`                                  |
| `typeLabel`         | `type-label`          |             | `string`  | `"file"`                              |
| `value`             | `value`               |             | `any`     | `[]`                                  |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `didLoad`        |             | `CustomEvent<any>` |
| `insFileAdded`   |             | `CustomEvent<any>` |
| `insFileError`   |             | `CustomEvent<any>` |
| `insFileRemoved` |             | `CustomEvent<any>` |


## Methods

### `buildFormData(s3Data: any, formData: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getDropzoneInstance() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getFilesList() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getS3Credentials() => Promise<unknown>`



#### Returns

Type: `Promise<unknown>`



### `getUploadingFiles() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `processS3AutoUpload(file: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeFiles() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFiles(files: any) => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `setS3FormData() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `trigger() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `uploadErrorNotification() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
