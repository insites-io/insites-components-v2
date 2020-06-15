# Insites Sidebar Item```<ins-sidebar-item>```

### Versions
1.0.23

### Basic Features
Displays sidebar item list.


### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| link | any | "/" | any | used to link to external style sheets |
| icon | any | "no-icon" | icon-close-1, icon-utilities, icon-lock-1, icon-logout-1 | displays icon of sidebar item |
| app | boolean | false | true, false | render iframe tags |
| withSubmenu | boolean | false | true, false | creates submenu for sidebar item |
| label | string | false | any | defines a label for an element |
### Usage Details
```
<ins-sidebar-item link="/assets/pages/dashboard.html" icon="icon-dashboard" label="Dashboard" app></ins-sidebar-item>
```

### Default Values
```
link = "/"
icon = "no-icon"
label = "Label"
```


### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
