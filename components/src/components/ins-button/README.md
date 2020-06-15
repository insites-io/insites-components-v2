# Insites Button ```<ins-button>```

### Versions
1.0.21

### Basic Features
Defines a clickable button.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| color | string | blue | blue / green / positive / warning | color of the button |
| label | string | BUTTON | any | Displays color of button |
| icon | string | "" | icon-close-1, icon-utilities, icon-lock-1, icon-logout-1 | Displays icon of button |
| size | string | normal | normal, small, large | Defines size of button |
| data | string | "" | any | Defines data of button |
| solid | boolean | false | true, false | Enables button to have solid display color |
| outlined | boolean | false | true, false | Enables button to have outline border color |
| disabled | boolean | false | true, false | Disables button |
| cursor | string | "" | text, default | Defines appearance of cursor |
| textTransform | string | "" | uppercase, lowercase, none | Defines appearance of text |
| loading | boolean | false | true, false | Sets state of loader |

### Usage Details
```
<ins-button label="click" outlined solid></ins-button>
<ins-button label="TEXT" icon="" color="blue" data="" size="normal"></ins-button>
<ins-button label="NORMAL" icon="" solid color="blue" data="" size="normal"></ins-button>
<ins-button label="OUTLINED" icon="" color="blue" outlined data="" size="normal"></ins-button>
<ins-button label="TEXT" icon="icon-calendar" color="blue" data="" size="normal"></ins-button>
<ins-button label="NORMAL" icon="icon-calendar" solid color="blue" data="" size="normal"></ins-button>
<ins-button label="OUTLINED" icon="icon-calendar" color="blue" outlined data="" size="normal"></ins-button>
```

### Default Values
```
label = "BUTTON"
color = "blue"
size = "normal"
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
