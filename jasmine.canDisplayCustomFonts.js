"use strict";
describe("canDisplayCustomFonts Test Suite", function(){
    beforeEach(function(done){
        var requireArr = [
            'dist/c/Namespace/Namespace.js',
            'dist/f/findElementStyle/findElementStyle.js',
            'dist/f/fetter/fetter.js',
            'dist/f/findStyleSheet/findStyleSheetNS.js',
            'dist/f/addStyleSheet/addStyleSheetNS.js',
            'dist/f/addStyleSheetRule/addStyleSheetRuleNS.js',
            'dist/f/findElementsByTag/findElementsByTagNS.js',
            'dist/f/findElementById/findElementtById.js',
            'dist/f/addStyleSheetRule/addStyleSheetRuleNS.js',
            'dist/f/findAttribute/findAttributeNS.js',
            'dist/f/isHTMLElement/isHTMLElement.js',
            'dist/f/isString/isString.js'
        ];
        for(var i=0, imax=requireArr.length; i<imax; i+=1){
            var a = document.createElement('script');
            a.src = requireArr[i];
            a.type = 'text/javascript';
            document.body.appendChild(a); 
        }


        setTimeout(function(){ done(); }, 3000);
    });

        var __imns = function(){ return window; }
        var adr = __imns();
        var obj = {}, arr = [];

    it("canDisplayCustomFonts is a function", function(){ expect(typeof adr.canDisplayCustomFonts === 'function').toBe(true); });
    it("DisplayCustomFonts is a function", function(){ expect(typeof adr.DisplayCustomFonts === 'function').toBe(true); });
});
