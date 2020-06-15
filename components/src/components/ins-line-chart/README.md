# Insites Line ```<ins-line-chart>```

### Versions


### Basic Features
Displays data points that are connected by lines.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| name | string | "Line Chart" | any | Specifies a name for a line chart |
| chartData | Array | [] | any | Display chart data |
| categories | Array | [] | any | Display categories in chart |
| dataSrc | string | "" | any | Calls api for data |
### Usage Details
```
<ins-line-chart name="Sessions" data-src="https://8yu847n8rb.execute-api.us-east-2.amazonaws.com/insites-linegraph2-deployment/insites-dummy-linegraph2">
</ins-line-chart>

```
### Default Values
```
name = "Line Chart"
categories = []
chartData = []
dataSrc = ""
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
