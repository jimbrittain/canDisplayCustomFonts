"use strict";
/* global window, IMDebugger, $, __imns, document, setTimeout, console */
(function(){
    var adr = __imns('util.classes');
    // var adr = window; //for stand-alone delete above and uncomment this line
    // Developed from code by Paul Irish, http://www.paulirish.com/2009/font-face-feature-detection/ amongst others;
    if(!('DisplayCustomFonts' in adr)){
        /**
          @module DisplayCustomFonts
          @class DisplayCustomFonts
          @singleton
          @description - self initialises on construction;
         **/
        adr.DisplayCustomFonts = function(){
            var uc = __imns('util.classes');
            if(uc.DisplayCustomFonts.prototype.singleton !== undefined){ return uc.DisplayCustomFonts.prototype.singleton; }
            uc.DisplayCustomFonts.prototype.singleton = this;
            this.tested = false;
            this.name = "imwebfonttester";
            this.supports = {
                'eot': false,
                'woff': false,
                'svg' : false,
                'otf' : false,
                'ttf' : false };
            this.init(); };
        /**
          @method DisplayCustomFonts.init
          @description -creates test procedures after DOMContentLoaded
          @requires util.tools.fetter
          @develop -issue on DOMContentLoaded:
         **/
        adr.DisplayCustomFonts.prototype.init = function(){
            var ut = __imns('util.tools');
            var c = this;
            ut.fetter(document, 'DOMContentLoaded', [c, function(){ 
                var ut = __imns('util.tools');
                ut.addStyleSheet({name: 'candisplaycustomfonts', href: '../TestBed/DisplayCustomFonts.css'});
                ut.fetter(window, 'load', [c, function(){c.test();}], true, 'after'); }], true, 'after'); };
        /**
          @method DisplayCustomFonts.test
          @description -builds test elements and stylesheet rules for the tests
         **/
        adr.DisplayCustomFonts.prototype.test = function(){
            var ut = __imns('util.tools'),
                uv = __imns('util.validation'),
                ud = __imns('util.dom');
            if(uv.isBrowserLegacyIE('LT9')){
                this.supports.eot = true;
            } else {
                var bodyTag = ud.findElementsByTag('body')[0],
                    sheet = ut.findStyleSheet({name: 'candisplay'}),
                    c = this;
                if('innerHTML' in bodyTag){
                    for(var prop in this.supports){
                        if(this.supports.hasOwnProperty(prop)){
                            bodyTag.innerHTML += '<div id="' + this.name + prop + '" style="visibility:hidden;position:absolute;bottom:0;right:0;padding:0;margin:0;font-size:20px;' + "font-family:'"+this.name+prop+"',serif;" + '">---</div>';
                            this.establishTest(prop);
                        }}}}
            this.tested = true; };
        /**
          @method DisplayCustomFonts.establishTest
          @param type {String} from this.datauri[prop] where prop === type
          @description -based on PI advising time test
         **/
        adr.DisplayCustomFonts.prototype.establishTest = function(type){ var c = this, t = setTimeout(function(){ c.testReturn(type); }, 150); };
        /**
          @method DisplayCustomFonts.testReturn
          @param type {String} from this.datauri[prop] where prop === type
         **/
        adr.DisplayCustomFonts.prototype.testReturn = function(type){
            var ud = __imns('util.dom'),
                uv = __imns('util.validation');
            var elem = ud.findElementById(this.name + type),
                bodyTag = ud.findElementsByTag('body')[0];
            if(uv.isHTMLElement(elem)){
                if(parseFloat(ud.findElementStyle(elem, 'offsetWidth')) < 10){
                    this.supports[type] = true; }
                if('removeChild' in bodyTag){ 
                    var a = 2;
                    //bodyTag.removeChild(elem); 
                } else { elem.style.display = 'none'; }}};
        /**
          @method DisplayCustomFonts.doesSupport
          @param type {String} from this.datauri[prop] where prop === type/type === file extension, if undefined test if any
          @return {Boolean}
          @alias util.tools.canDisplayCustomFonts;
         **/
        adr.DisplayCustomFonts.prototype.doesSupport = function(type){
            if(this.tested){
                var uv = __imns('util.validation');
                if(uv.isString(type)){
                    type = type.toLowerCase();
                    if(type in this.supports){
                        return this.supports[type]; }}
                return this.doesSupportAny(); }};
        /**
         * @method DisplayCustomFonts.doesSupportAny
         * @return {Boolean}
         * @description -tests if any webfonts give a valid result
         **/
        adr.DisplayCustomFonts.prototype.doesSupportAny = function(){
            if(this.tested){
                for(var prop in this.supports){
                    if(this.supports.hasOwnProperty(prop) && this.supports[prop] === true){ return true; }}
                return false; }};
        (__imns('util.tools')).canDisplayCustomFonts = function(str){ return (new (__imns('util.classes')).DisplayCustomFonts()).doesSupport(str); };
        (__imns('util.tools')).displayCustomFonts = new adr.DisplayCustomFonts();
    }
})();
