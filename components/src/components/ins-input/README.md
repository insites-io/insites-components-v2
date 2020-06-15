# Insites Input ```<ins-input>```

### Versions
n/A

### Basic Features
Specifies an input field where the user can enter data.

### Configuration Options
| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| placeholder | string | "" | any | specifies a short hint that describes the expected value of an input field |
| value | string | "" | any | Specifies the value of an input element |
| label | string | "" | any | Defines label of input box |
| name | string | "" | any | Defines name of input box |
| field | string | text | email, number, password, text, search | Specifies the type input element to display |
| fieldId | string | "" | any | Specifies field id of input |
| errorMessage | string | "" | any | sets or returns an error message when input element is wrong |
| required | boolean | false | true, false | Makes input box to be filled up |
| icon | string | "" | icon-close-1, icon-utilities, icon-lock-1, icon-logout-1 | Displays icon of input text |
| disabled | boolean | false | true, false | Specifies that an input element should be disabled |
| readonly | boolean | false | true, false | Specifies that an input field is read-only |


### Usage Details
```
<ins-input placeholder="Name" value="John" label="Name" field="text" icon="icon-user-1"></ins-input>
```

### Default Values
```
placeholder = ""
value = ""
label = ""
name = ""
field = 'text'
fieldId = ""
errorMessage = ""
required = false
icon = ""
disabled = false
readonly = false

```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
