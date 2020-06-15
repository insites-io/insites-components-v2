# Insites Tab Item ```<ins-tab-item>```

### Versions
1.0.0

### Basic Features
Contains tab navigation and content.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| active | boolean | false | true, false | Defines if tab is 'active'. <br><br> If no tabs are set as 'active', the first tab will be active by default. |
| label | string | Tab 'n' | Tab 1, Tab 2, Tab 3, ... | Displays the tab label/heading |
| icon | string | "" | any | Applies the font-icon class to the tab label. |
| no-padding | boolean | false | true, false | Removes the left and right padding of a tab element. This can be set per `ins-tab-item`. |
| disabled | boolean | false | true, false | Disables a tab, making user unable to navigate to it. |
| hasError | boolean | false | true, false | Displays a red border at the bottom of the tab header. |

### Usage Details
```
<ins-tab-item active no-padding label="My Tab">
  <div>
    <h1>Content Example</h1>
    <p>Add your HTML codes inside the `ins-tab-item` element.</p>
  </div>
</ins-tab-item>
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
