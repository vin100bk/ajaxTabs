# ajaxTabs
AjaxTabs is a very lightweight jquery plugin which allows building tabs very easily. Tons of similar plugins already exist but I think those plugins are too much heavy for just making tabs.

## Getting started
### HTML
```html
<script src="pathtojs/jquery.ajaxTabs.js"></script>
```

```html
<ul id="myTabs">
	<li><a href="#container1" data-lighttab-url="/container1Url">Tab 1</a></li>
	<li><a href="#container2" data-lighttab-url="/container2Url">Tab 2</a></li>
	<li><a href="#container3" data-lighttab-url="/container3Url">Tab 3</a></li>
</ul>
	
<div class="tab-wrapper">
	<div id="container1"></div>
	<div id="container2"></div>
	<div id="container3"></div>
</div>
```

### CSS
```css
.tab-wrapper > * {
	display: none;
}

.tab-wrapper > .active {
	display: block;
}
```

### JS
```js
$(function() {
	$('#myTabs').ajaxTabs();
});
```

## Options
Few options are available:
 - selectorTab: the DOM selector for tabs
 - attrDataUrl: the data stored attribute name which contains the url to call
 - beforeCallback: function called before the ajax call
 - afterCallback: function called after the ajax call

### selectorTab

The DOM selector for tabs. This example shows how to exclude a link to the tabs mechanism.

```js
$(function() {
	$('#myTabs').ajaxTabs({
		selectorTab: '.tab'
	});
});
```

```html
<ul id="myTabs">
	<li><a href="#container1" data-lighttab-url="test1.html" class="tab">Tab 1</a></li>
	<li><a href="#container2" data-lighttab-url="test2.html" class="tab">Tab 2</a></li>
	<li><a href="http://anywhere.com">Tab 3</a></li>
</ul>

<div class="tab-wrapper">
	<div id="container1"></div>
	<div id="container2"></div>
</div>
```

### attrDataUrl

The data stored attribute name which contains the url to call

```js
$(function() {
	$('#myTabs').ajaxTabs({
		attrDataUrl: 'url'
	});
});
```

```html
<ul id="myTabs">
	<li><a href="#container1" data-url="test1.html">Tab 1</a></li>
	<li><a href="#container2" data-url="test2.html">Tab 2</a></li>
	<li><a href="#container3" data-url="test3.html">Tab 3</a></li>
</ul>
```

### beforeCallback

This function is called before the ajax call

```js
$('#myTabs').ajaxTabs({
	beforeCallback: function(tab, container) {
		container.html('Loading ...');
	}
});
```

#### Parameters
 - tab: the tab element
 - container: the container element

### afterCallback

This function is called after the ajax call

```js
$('#myTabs').ajaxTabs({
	beforeCallback: function(tab, container) {
		container.html('Loading ...');
	}
});
```

#### Parameters
 - tab: the tab element
 - container: the container element

## Dependencies
 - JQuery
