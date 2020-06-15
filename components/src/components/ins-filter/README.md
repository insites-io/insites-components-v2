# Insites Filter ```<ins-filter>```

### Versions
1.0.36

### Basic Features
Renders container of filter items.

### Configuration Options
| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| withDateFilter | boolean | false | any | Displays date filter |
| dateTitle | any  | "" | any | Displays date filter title |
| defaultDate | string | "" | any | Diplays defaul date displayed |
| dateFrom | string | "" | any | Displays starting date of date filter |
| dateTo | string | "" | any | Displays end date of date filter |
| dateOpt | any | [Today',This Week',Last Week',This Month',Last Month',This Year',Last Year',Custom'] | any | Displays date option beside dateTitle |

### Usage Details
```
<ins-filter with-date-filter date-title="Date Period"></ins-filter>
```

### Default Values
```
withDateFilter = false
dateTitle = ""
defaultDate = ""
dateFrom = ""
dateTo = ""
dateOpt = [
    'Today',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'This Year',
    'Last Year',
    'Custom'
  ]
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
