# Insites Instances ```<ins-instances>```

### Versions
1.0.10

### Basic Features
Displays dropdown feature with logo inside header container.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| logoLink | string | "no-icon" | icon-close-1, icon-utilities, icon-lock-1, icon-logout-1 | Specifies logo link of the dropdown feature in the header |
| instance | string | "Label" | any | Displays label of dropdown feature in the header |
| instanceLink | string | "/" | any | Specifies link of of instance prop |
| newTab | boolean | false | true, false | Opens new link |

### Usage Details
```
<ins-header>
    <ins-instances logo-link="/build/images/logo-3@2x.png" instance="Final Sprint"></ins-instances>
</ins-header>
```

### Default Values
```
logoLink = "no-icon"
instance = "Label"
instanceLink = "/"
newTab = false
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
