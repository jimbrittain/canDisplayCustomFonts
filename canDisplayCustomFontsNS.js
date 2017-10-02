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
            /**
              @description data-uris now include format to prevent browser errors
             **/
            this.datauris = {
                'eot' : "url('data:application/vnd.ms-fontobject;base64,iAMAAJ4CAAACAAIABAAAAAIABQMAAAAAAAABAJABAAAAAExQAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAnkGXIwAAAAAAAAAAAAAAAAAAAAAAACIASQBtAG0AYQB0AHUAcgBlAEQAYQB3AG4AQgBsAGEAbgBrAAAADgBSAGUAZwB1AGwAYQByAAAAIABWAGUAcgBzAGkAbwBuACAAMAAwADEALgAwADAAMAAgAAAAIgBJAG0AbQBhAHQAdQByAGUARABhAHcAbgBCAGwAYQBuAGsAAAAAAEJTR1AAAAAAAAAAAAAAAAAAAAAAAwAh2AACcAACdgAC7AjEg7POLJ6M5EPBtKE7uA83PJID0hJ7UztCYYAZxRi37k7FIqpZo+oeew0hCSa8pTsBVU5mXp1ZMQ+tliSKVZZ0ML3mykxhj5yJdAfbKkGWyIJXcQDcUl20WVcMnjLkFKIqLjjo5/MK5oQ0qi0UEpDd8HDbGdZhdQtsF0s6yNIrpYgGKbahgc8h5y3k2GMHqsPiVvZy+zFgWGqQSdSmGHCOb6ahNT+jjhfgORcURE+8V3gaPqh0Y6XUFUyEGtChkY78zM1BQga6FgdZGEJuMR68jENDZl2MJuC3/Jyi3ML3oMbzhdpFHfjQOYfE4fzwAKtL3vM7nMK9MftWoYAcaqVNYIMoSzSrJjqciQD9Y/ucIY5Y5Ffjn2v2hol9OS6+KSPBlOQcGQcCzD3g2zQUxLqSp3OAyGbrB/l+g6DkpK0RP7LjIwTca3quDglLLBWDRGSoENypIKiBhhl3AUZBsIHFerhg4H0mI2KocrB0u+ldb4dNJcKCKMWFhBL5JntSBaUkwYxDFQYcE+g6iQzV0d3HrErQzoHhjodUT+ZSD1S47xohiSnQtiQx5qmaJwpBZoOk4sQPGJvegDSHhdIQxNidxe4SIZlww0X7+zhEKTa2HxGiA3IKJWKSqWV2xtmF1D9HCfKomPQsR0sSabuLup66ITrUbt0oFZshgJ5fRyE+XzjFg5LCT4GWrqrQIqySnSVgBohUQjRPd06acikhqTXSEAr0aeJ19HSLrJ+KawqXE56Sy2V2QP/VF03KaFXg6rm+dFdM4Ua1hy25L1Sbw3t71tlZL9OZy05XmRQ0YNxqw2DgAAABAwFgAAAVoSfijxCCYARcTFT+8NkCQRhwEkJzgSlyhSHVCuIoCgPSBGmCYA==') format('embedded-opentype')",
                'woff' : "url('data:application/font-woff;base64,d09GRk9UVE8AAAO0AAsAAAAABfQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAABCAAAAI4AAACnk/Jer0ZGVE0AAAGYAAAAGwAAABx3YzIXR0RFRgAAAbQAAAAYAAAAHAAVABRPUy8yAAABzAAAAEEAAABgMGQsp2NtYXAAAAIQAAAANwAAAUIADQLUaGVhZAAAAkgAAAApAAAANgZyaQ1oaGVhAAACdAAAABkAAAAkA3v/O2htdHgAAAKQAAAACAAAAAgB9AAAbWF4cAAAApgAAAAGAAAABgACUABuYW1lAAACoAAAAQAAAAIooFDxsnBvc3QAAAOgAAAAEwAAACD/hgAyeJxjZGBhYWBkZBTyzM1NLCktSnVJLM9zyknMy2ZgZGJgZND4wc/wQ5rxhwzTD1nmHxIs3UDAKsNQzi/DwCAgw1AlKMPALsOwQIiBGaSakUGIQRnDJEyjgYCPgYmRUUGxe+8P172Me/f+jtnLvFdM/cfK92x7/5SL/nD9HfPHlZ2Pr1ukW7SbhwsAFZkxcQAAeJxjYGBgZACCC/xcf0D05VXCylD6OwA8lAYhAHicY2BkgAAeBhEGFiDNBMSMEAwAAssAKnicY2Bh/MI4gYGVgYGpi2kPAwNDD4RmfMBgyMgEFGVgZWaAAUYGJKAABAwHGHQZdJkV/lswRGGoUQBCRgA6KAlgAAAAeJxjYGBgZoBgGQZGBhCwAfIYwXwWBgUgzQKEIL7u//8Q8v8VqEoGRjYGGJM4QJLioQEAZ7MG4AB4nGNgZGBgAOIuhXDPeH6brwzczC+AIgyXV4mIINNQwMHABKIA8FQHNgAAAHicY2BkYGBW+G/BEMUAA4wMqIAJADJSAbkAAAAB9AAAAAAAAAAAUAAAAgAAeJydj8Fqg0AURe8Yk5JNqX8wZNOVMhpIaJZBAlm2iyy6m8VgQ3WEiZKvan+oH9Ne9XXVRSHK8I7Dee/6ANzjEwq/TySskOBROMIdjsIzpPgQjul8C8/xoNbCCyTqjaaKlzJ1YoUVaeKIuU/CM7ziWTim8yU8h1aJ8AIrVQ6jjmj4WnToEeBQkq/w2KMmebxTaRrb9cGV9ur3tfW8eqFZsWNwAj9d1deWcEDLnm6sgYaDRoEMhnXH83/a5OXsSrHlKdibY8PRre8ObaicLjKjd/rPX/EuL9JtWph8c+teJ5oBF5zHPTSzh/RsrMMOOLlwObdeG5Nnxhh9Y9APESRZWHicY2BmAIP/zQxGDFgAAChEAbgA') format('woff')",
                'svg' : "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgRm9udEZvcmdlIDIwMTQwODEyIGF0IFR1ZSBKdWwgMTIgMDQ6Mjc6MDMgMjAxNgogQnkgSmltIEJyaXR0YWluCgo8L21ldGFkYXRhPgo8ZGVmcz4KPGZvbnQgaWQ9IkltbWF0dXJlRGF3bkJsYW5rIiBob3Jpei1hZHYteD0iMCIgPgogIDxmb250LWZhY2UgCiAgICBmb250LWZhbWlseT0iSW1tYXR1cmVEYXduQmxhbmsiCiAgICBmb250LXdlaWdodD0iNDAwIgogICAgZm9udC1zdHJldGNoPSJub3JtYWwiCiAgICB1bml0cy1wZXItZW09IjEwMDAiCiAgICBwYW5vc2UtMT0iMiAwIDUgMyAwIDAgMCAwIDAgMCIKICAgIGFzY2VudD0iODAwIgogICAgZGVzY2VudD0iLTIwMCIKICAgIGJib3g9IjAgMCAwIDAiCiAgICB1bmRlcmxpbmUtdGhpY2tuZXNzPSI1MCIKICAgIHVuZGVybGluZS1wb3NpdGlvbj0iLTEwMCIKICAgIHVuaWNvZGUtcmFuZ2U9IlUrMDAyRC0wMDJEIgogIC8+CiAgICA8bWlzc2luZy1nbHlwaCAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Imh5cGhlbiIgdW5pY29kZT0iLSIgCiAvPgogIDwvZm9udD4KPC9kZWZzPjwvc3ZnPgo=') format('svg')",
                'otf' : "url('data:application/x-font-opentype;base64,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') format('opentype')",
                'ttf' : "url('data:application/x-font-truetype;base64,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') format('truetype')"
            };
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
            ut.fetter(window, 'load', [c, function(){ 
                var ut = __imns('util.tools');
                if(ut.findStyleSheet({name: 'candisplaycustomfonts'}) === false){
                    ut.addStyleSheet({name: 'candisplaycustomfonts'}); }
                setTimeout(function(){ c.test();}, 500); }], true, 'after'); };
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
                    sheet = ut.findStyleSheet({name: 'candisplaycustomfonts'}),
                    c = this;
                for(var prop in this.datauris){
                    if(this.datauris.hasOwnProperty(prop)){
                        var rule = "font-family: '"+ this.name + prop + "'; src: " + this.datauris[prop] + ';';
                        var added = false;
                        try {
                            added = ut.addStyleSheetRule('@font-face', rule, sheet);
                        } catch(e){ 
                            added = false; }
                        if(added){
                            if('createElement' in document){
                                var elem = document.createElement('div');
                                ud.setAttribute(elem, 'id', this.name + prop);
                                ud.setAttribute(elem, 'style', 'visibility:hidden;position:absolute;bottom:0;right:0;padding:0;margin:0;font-size:20px;' + "font-family:'" +this.name+prop+"',serif;");
                                elem.textContent = '---';
                                bodyTag.appendChild(elem);
                            } else if('innerHTML' in bodyTag){
                                bodyTag.innerHTML += '<div id="' + this.name + prop + '" style="visibility:hidden;position:absolute;bottom:0;right:0;padding:0;margin:0;font-size:20px;' + "font-family:'" +this.name+prop+"',serif;" + '">---</div>'; }
                            this.establishTest(prop); }
                    }
                }
            }
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
                    bodyTag.removeChild(elem); 
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
