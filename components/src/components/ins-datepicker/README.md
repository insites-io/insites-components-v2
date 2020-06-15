# Insites Datepicker ```<ins-datepicker>```

### Versions
1.0.8

### Basic Features
The datepicker is tied to a standard form input field. Focus on the input click to open an interactive calendar in a small overlay. Choose a date, click elsewhere on the page (blur the input), or hit the Esc key to close. If a date is chosen, feedback is shown as the input's value.


### Configuration Options

| DECORATOR | COMPONENT | TYPE | USAGE |
| ------- | ------- | ------- | ------- |
| @Prop() | name | string | Specifies a name for a datepicker |
| @Prop() | value | string | Specifies the value of an datepicker |
| @Prop() | min | string | Specifies a minimum value for an datepicker |
| @Prop() | max | string | Specifies the maximum value for an datepicker |
| @Prop() | label | string | defines for an element |

### Usage Details
```
<ins-datepicker name="sample" value="07/03/2018" min="07/03/2000" max="07/03/2020" label="sample"></ins-datepicker>
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox