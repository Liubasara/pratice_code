import e from"@babel/runtime/regenerator";import n from"@babel/runtime/helpers/asyncToGenerator";import{concat as t}from"lodash";import r from"@babel/runtime/helpers/classCallCheck";import o from"@babel/runtime/helpers/createClass";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function i(e,n,t,r){return new(t||(t=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(s,a)}c((r=r.apply(e,n||[])).next())}))}class s{constructor(e){this.msg=e}sayMsg(){return i(this,void 0,void 0,(function*(){return console.log(this.msg),console.log("=============Demo Msg=========="),yield Promise.resolve("123"),8989891010101}))}}var a=function(){function e(){r(this,e)}return o(e,[{key:"sayHi",value:function(){console.log("------------hi, item-------------")}}]),e}();!function(e,n){void 0===n&&(n={});var t=n.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}("html,body {\r\n  height: 100%;\r\n  width: 100%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\nbody {\r\n  background: lightblue;\r\n}"),function(){var r=n(e.mark((function n(){return e.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.resolve("demo");case 2:console.log("我不用嗓子说话"),console.log(t([1,2,3],[5],5,6,7)),new s("夜神夜神~").sayMsg(),(new a).sayHi();case 6:case"end":return e.stop()}}),n)})));return function(){return r.apply(this,arguments)}}()();
//# sourceMappingURL=jsDemoBundle.esm.js.map
