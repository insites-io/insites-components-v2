# Insites Tooltip ```<ins-tooltip>```

### Versions - `v1.0.0`


### Basic Features
Renders a tooltip element.


### Configuration Options
| ATTRIBUTE | TYPE | DEFAULT | OPTIONS | DESCRIPTION |
| ------- | ------- | ------- | ------- | ------- |
| label | string | "" | any | Defines the text displayed on the tooltip label |
| shape | string | circle | circle, rectangle | Defines the shape of the tooltip label |
| icon | string | "" | any | Applies the font-icon class to the tooltip label |
| position | string | top | top, bottom, left, right (_-start, _-end) | Defines the default position the tooltip is to be displayed |
| content | string | "" | any | Content displayed on the tooltip |
| background | boolean | true | true, false | Enable / Disables background color for tooltip |
| html | boolean | false | true, false | Makes the tooltip content render as HTML code |
| trigger | string | hover focus | hover, focus, click | Defines how the tooltip is triggered <br><br> You may pass multiple triggers; separate them with a space |
| close-on-click | boolean | true | true, false | Makes the content hide when user click anywhere outside the tooltip <br><br> Only works for trigger on `'click'` |
| width | string | "" | any | Specifies the width for the tooltip content <br/><br/> You may pass any proper CSS width value; ex.(100px, 100%, 100vw, 100em, etc..)|
| auto-width | boolean | false | true, false | Apply auto width to the tooltip content with CSS property `'white-space: nowrap'` <br><br>  For best responsive result, it is ideal to only enable this for short contents |


### Usage Details
```
<ins-tooltip
    label="My Tooltip Label"
    icon="icon-warning"
    shape="rectangle"
    position="top-start"
    width="200px"
    trigger="click hover click"
    close-on-click="true"
    html="true"
    content="This is the content that will show when you trigger the <a href='#' target='_blank'>tooltip</a>.">
</ins-tooltip>
```

### Browser Support
- Chrome (and all Chromium based browsers)
- Safari
- Firefox
