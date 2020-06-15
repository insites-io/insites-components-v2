# Insites Sparkline ```<ins-sparkline>```

### Versions
1.0.7

### Basic Features
Displays charts like session, users, bounce rate, and goals in dashboard.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| icon | string | icon-user-1 | icon-close-1, icon-utilities, icon-lock-1, icon-logout-1 | Displays icon logo on chart |
| name | string | "Sparkline" | any | Defines a term/name in a description list |
| value | string | "0" | any | Displays Value in chart |
| chartData | Array<any> | undefined | any | Displays Data in chart |
| percentage | any | "0" | any | Displays percentage in chart |
| description | string | "N/A" | any | Displays description in chart |
| movement | any | "none" | increase, decrease, none | For movement in chart data either default is up or down |

### Usage Details
```
<ins-sparkline id="sessions" icon="icon-clock" name="Sessions" value="3.80K" percentage="12" description="From previous year"
    movement="increase">
</ins-sparkline>
```

### Default Values
```
icon = "icon-user-1"
name = "Sparkline"
value = "0"
percentage = "0"
description = "N/A"
movement = "none"
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
