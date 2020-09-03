# ins-steps



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type      | Default |
| ----------- | ----------- | ----------- | --------- | ------- |
| `indicator` | `indicator` |             | `string`  | `""`    |
| `inline`    | `inline`    |             | `boolean` | `false` |


## Methods

### `finish() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `next() => Promise<{ currentStep: any; previousStep?: undefined; } | { previousStep: any; currentStep: any; }>`



#### Returns

Type: `Promise<{ currentStep: any; previousStep?: undefined; } | { previousStep: any; currentStep: any; }>`



### `prev() => Promise<false | { previousStep: any; currentStep: any; }>`



#### Returns

Type: `Promise<false | { previousStep: any; currentStep: any; }>`



### `setStep(i: any) => Promise<{ currentStep: any; }>`



#### Returns

Type: `Promise<{ currentStep: any; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
