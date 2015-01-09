# readingbar (jQuery plugin)
A simple progress bar that indicates the length &amp; your current reading position of an article/page

[Here's a demo](http://codepen.io/WixelHQ/pen/bNBzZx)

### Adding it to your site
``` js
// select the element you wish to track (ie. in a blog post target only the container of the actual post content)
$('.article').readingbar();
```

### Options
``` js
// you can set the height and the color of the bar.
$('.article').readingbar({
  height: '10px',
  backgroundColor: '#22252C'
});
```
