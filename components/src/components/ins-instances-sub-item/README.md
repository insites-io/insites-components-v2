# Insites Instances Sub Item ```<ins-instances-sub-item>```

### Versions
1.0.0

### Basic Features
Displays sub items for ins-instances-items.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| instance | string | undefined | any | Specifies name of sub-items |
| link | string | undefined | any | Specifies link of sub-items |

### Usage Details
```
<ins-header>
     <ins-instances logo-link="/build/images/logo-3@2x.png" instance="Final Sprint" ></ins-instances>
    <ins-instances-item logo-link="/build/images/logo-2@2x.png" instance-link="/" instance="sample">
    <ins-instances-sub-item link="/" instance="Production"></ins-instances-sub-item></ins-instances-item>
</ins-header>
```

### Default Values
```
N/A
```


### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
