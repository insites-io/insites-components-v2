# ins-sidebar-item



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `app`         | `app`          |             | `boolean` | `false`     |
| `footerLink`  | `footer-link`  |             | `string`  | `''`        |
| `hasLoad`     | `has-load`     |             | `string`  | `undefined` |
| `icon`        | `icon`         |             | `any`     | `'no-icon'` |
| `label`       | `label`        |             | `string`  | `'Label'`   |
| `landingPage` | `landing-page` |             | `boolean` | `false`     |
| `link`        | `link`         |             | `any`     | `''`        |
| `withSubmenu` | `with-submenu` |             | `boolean` | `false`     |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `didLoad`   |             | `CustomEvent<any>` |
| `routePage` |             | `CustomEvent<any>` |


## Methods

### `activate() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `activateParent() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `deactivate() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `formatRoute() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `hideSubMenu() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `routePageHandler(e: any) => Promise<{ crumbs: any[]; }>`



#### Parameters

| Name | Type  | Description |
| ---- | ----- | ----------- |
| `e`  | `any` |             |

#### Returns

Type: `Promise<{ crumbs: any[]; }>`



### `showSubMenu() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
