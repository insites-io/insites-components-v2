# Insites Select ```<ins-select>```

### Versions
1.0.2

### Basic Features
Displays drop down feature.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| label | string | Dropdown | any | Displays label of dropdown |
| placeholder | string | Select or type | any | Specifies a short hint that describes the expected value of an input field |
| disabled | boolean | false | true, false | Disables the dropdown feature |
| readonly | boolean | false | true, false | Makes the selection unclickable |
| button | boolean | false | true, false | Merges the label and placeholder into a single button dropdown |
| searchable | boolean | false | true, false | Enables the user to search in the dropdown selection |
| multiple | boolean | false | true, false | Enables multiple selection |

### Usage Details
```
<ins-select label="dropdown" placeholder="sample" button searchable></ins-select>
```

### Default Values
```
label = "Dropdown"
placeholder = "Select or type"
disabled = false
readonly = false
button = false
searchable = false
multiple = false
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
