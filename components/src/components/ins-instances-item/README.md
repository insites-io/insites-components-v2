# Insites Instances Item ```<ins-instances-item>```

### Versions
1.0.7

### Basic Features
Displays item selection for ins-instances dropdown feature.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| logoLink | string | undefined | any | Specifies logo link of the items in ins-instances |
| instance | string | 'Instance Item' | any | Specifies name of item selections in ins-instances |
| instanceLink | string | '/' | any | Specifies link of item selections in ins-instances |
| withSubItem | boolean | false | true, false | Enables the specific item to have subitems |


### Usage Details
```
<ins-header>
    <ins-instances logo-link="/build/images/logo-3@2x.png" instance="Final Sprint" ></ins-instances>
    <ins-instances-item logo-link="/build/images/logo-2@2x.png" instance-link="/" instance="sample"></ins-instances-item>
</ins-header>
```

### Default Values
```
instance = 'Instance Item'
instanceLink = "/"
withSubItem = false
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
