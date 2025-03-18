# jQuery SwipeToast

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/salarizadi/swipetoast)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/salarizadi/swipetoast/blob/main/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/salarizadi/swipetoast/badge)](https://www.jsdelivr.com/package/gh/salarizadi/swipetoast)
[![jQuery](https://img.shields.io/badge/jquery-%3E%3D%203.0.0-yellow.svg)](https://jquery.com/)
[![CodePen demo](https://img.shields.io/badge/CodePen-demo-blue.svg)](https://codepen.io/salariz/pen/NPWYPxN)

A modern, lightweight, and feature-rich toast notification plugin for jQuery with swipe-to-dismiss functionality.

## Features

- 🔄 Swipe-to-dismiss functionality
- 📱 Fully responsive design
- 🎯 9 Different positioning options
- ⏳ Customizable duration
- 🎨 Multiple toast types
- 📊 Optional progress bar
- 🔄 RTL support
- ✨ Custom styling options
- ❌ Optional close button

## Demo

Check out the [live demo on CodePen](https://codepen.io/salariz/pen/NPWYPxN)

## Installation

### Using CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/salarizadi/swipetoast/jquery.swipetoast.min.css">
<script src="https://cdn.jsdelivr.net/gh/salarizadi/swipetoast/jquery.swipetoast.min.js"></script>
```

### Basic Usage

```javascript
$.swipeToast({
    message: 'Hello, World!',
    type: 'success',
    duration: 4000
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | `string` | `''` | The text message to display in the toast |
| `type` | `string` | `'default'` | Toast type (`'default'`, `'success'`, `'error'`, `'warning'`, `'info'`) |
| `duration` | `number` | `4000` | Duration in milliseconds before auto-hiding (0 for permanent) |
| `swipeable` | `boolean` | `true` | Enable/disable swipe-to-dismiss functionality |
| `position` | `string` | `'bottom-center'` | Toast position on screen |
| `rtl` | `boolean` | `false` | Enable RTL (Right-to-Left) mode |
| `closeButton` | `boolean` | `false` | Show/hide close button |
| `progressBar` | `boolean` | `false` | Show/hide progress bar |
| `className` | `string` | `''` | Additional CSS class names |
| `offset` | `number` | `24` | Distance from edges in pixels |
| `swipeThreshold` | `number` | `0.5` | Swipe threshold to dismiss (0 to 1) |

### Available Positions

- `'top-left'`
- `'top-center'`
- `'top-right'`
- `'center-left'`
- `'center'`
- `'center-right'`
- `'bottom-left'`
- `'bottom-center'`
- `'bottom-right'`

## Examples

### Success Toast
```javascript
$.swipeToast({
    message: 'Operation completed successfully!',
    type: 'success',
    duration: 3000,
    position: 'top-right'
});
```

### Error Toast with Progress Bar
```javascript
$.swipeToast({
    message: 'An error occurred!',
    type: 'error',
    progressBar: true,
    duration: 5000
});
```

### Custom Styled Toast
```javascript
$.swipeToast({
    message: 'Custom styled toast',
    className: 'my-custom-toast',
    closeButton: true,
    rtl: true
});
```

## Events

| Event | Description |
|-------|-------------|
| `onOpen` | Callback function when toast is shown |
| `onClose` | Callback function when toast is hidden |

```javascript
$.swipeToast({
    message: 'Toast with callbacks',
    onOpen: function() {
        console.log('Toast opened');
    },
    onClose: function() {
        console.log('Toast closed');
    }
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Salar Izadi](https://salarizadi.ir)

## Support

For support, please create an issue in the [GitHub repository](https://github.com/salarizadi/swipetoast/issues).
