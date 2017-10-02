# canDisplayCustomFonts
Javascript functions to determine whether client allows web fonts/custom fonts. Has two versions, CSS and javascript only version, in the latter, the eot, ttf, otf, svg, and woff are data versions rather than linked files.

## Requiries

* util.dom.findElementById
* util.dom.findElementStyle
* util.dom.findElementsByTage
* util.tools.addStyleSheet
* util.tools.addStyleSheetRule
* util.tools.findStyleSheet
* util.validation.isBrowserLegacyIE
* util.validation.isHTMLElement
* util.validation.isString

## Usage

Self-initiating on window.load, plus a couple of seconds. then;

```
    ut.canDisplayCustomFonts() = {Boolean} checks for any;
    ut.canDisplayCustomFonts('eot') = {Boolean} checks for type
```

## Methodology

## Issues

* Needs browser compatibility documentation
* Doesn't have a woff2 checker

