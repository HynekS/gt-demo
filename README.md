# grid-toggler

A simple one-file javascript tool for better maintainance of vertical and/or horizontal rhytm of webpage components.

![demo animated gif](./assets/gridtoggler-demo.gif)

### Demo

You can see demo at https://hyneks.github.io/gt-demo/.

### Prerequisites

The script is written in ES6, so it will run only on relatively modern browsers. Because it is a develepment tool, it should't be a big deal.

### Installing

Download and include the script right before the enclosing </body> tag:

```html
<script src='relative-path-to-file/gridtoggler-0.1.0.js'></script>
```
The you can configure the settings right in the config object at the to of the file:

```javascript
const config = {
    targetX: '#grid',
    targetY: 'body',
    gridGapX: 30,
    gridGapY: 30,
    gridTiltX: 0,
    gridTiltY: 0,
    gridColor: 'rgb(50, 154, 240)',
};
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details