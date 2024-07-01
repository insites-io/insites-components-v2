# ins-chart



<!-- Auto Generated Below -->


## Methods

### `generateColor(color: any, count: any) => Promise<Highcharts.ColorType>`



#### Parameters

| Name    | Type  | Description |
| ------- | ----- | ----------- |
| `color` | `any` |             |
| `count` | `any` |             |

#### Returns

Type: `Promise<ColorType>`



### `renderChart(options: any) => Promise<void>`



#### Parameters

| Name      | Type  | Description |
| --------- | ----- | ----------- |
| `options` | `any` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ins-bar-chart](../ins-bar-chart)
 - [ins-line-chart](../ins-line-chart)
 - [ins-pie-chart](../ins-pie-chart)
 - [ins-sparkline](../ins-sparkline)

### Graph
```mermaid
graph TD;
  ins-bar-chart --> ins-chart
  ins-line-chart --> ins-chart
  ins-pie-chart --> ins-chart
  ins-sparkline --> ins-chart
  style ins-chart fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
