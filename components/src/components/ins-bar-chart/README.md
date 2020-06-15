# Insites Bar Chart ```<ins-bar-chart>```

### Versions
1.0.7

### Basic Features
The bar chart is exactly the same as a column chart only the x-axis and y-axis are switched.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| name | string | "Line Chart" | any | Specifies a name for a line chart |
| chartData | Array | [] | any | Display chart data |
| categories | Array | [] | any | Display categories in chart |
| dataSrc | string | "" | any | Calls api for data |


### Usage Details
```
<ins-bar-chart id="barChart" name="Column Chart" data-src="https://9p1pa4b3fa.execute-api.us-east-2.amazonaws.com/insites-barchart-deployment/insites-dummy-barchart">
</ins-bar-chart>
```
### Default Values
```
name = "Bar Chart"
categories = []
chartData = []
dataSrc = ""
```
### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
