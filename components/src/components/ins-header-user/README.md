# Insites Header User```<ins-header-user>```

### Versions
1.0.11

### Basic Features
Displays items inside header.

### Configuration Options

| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| name | string | "Label" | any | Displays name of dropdown feature in header |
| logoutLink | string | '/' | any | Specifies link of "logout" selection |
| profileLink | string | '/assets/pages/my-profile.html' | any | Specifies link of "MyProfile" selection |

### Usage Details
```
<ins-header>
    <ins-header-user name="Sample" profile-link="/build/liquid.html" logoutLink="/build/liquid.html"></ins-header-user>
</ins-header>
```

### Default Values
```
name = "John Smith" 
logoutLink = '/'
profileLink =  '/assets/pages/my-profile.html'
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
