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



### `getAllSteps() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `next() => Promise<{ end: boolean; previousStep: any; currentStep: any; }>`



#### Returns

Type: `Promise<{ end: boolean; previousStep: any; currentStep: any; }>`



### `prev() => Promise<{ start: boolean; previousStep: any; currentStep: any; }>`



#### Returns

Type: `Promise<{ start: boolean; previousStep: any; currentStep: any; }>`



### `reset() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `setStep(i: any) => Promise<{ previousStep: any; currentStep: any; }>`



#### Returns

Type: `Promise<{ previousStep: any; currentStep: any; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
