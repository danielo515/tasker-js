parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"8Lq7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.readArr=exports.default=void 0;var r=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{return JSON.parse(r)}catch(t){return e}},e=r;exports.default=e;var t=function(e){return r(tk.global(e),[])};exports.readArr=t;
},{}],"T/DR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=function(t){return function(){try{t.apply(void 0,arguments)}catch(e){tk.flashLong(e.toString())}}},e=t;exports.default=e;
},{}],"rzbf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.stopTask=exports.startTask=exports.pauseTask=exports.updateTask=exports.loadTask=void 0;var t=r(require("../util/safeParse")),e=r(require("../util/errLog"));function r(t){return t&&t.__esModule?t:{default:t}}var a=function(e,r){return(0,t.default)(tk.global(e),r)},s=function(t,e){return tk.setGlobal(t,JSON.stringify(e))},n=function(t){return a("TASK_".concat(t),{title:t,startedAt:null,pauses:[],stoppedAt:null})};exports.loadTask=n;var o=function(t){return function(e){return function(r){try{var a=n(r);return a[t]=e(a[t]),s("TASK_".concat(r),a),a}catch(o){tk.flash("Error updating task ".concat(r,":\n ").concat(o.toString))}}}};exports.updateTask=o;var u=o("pauses")(function(t){return t.push(Date.now()),t});exports.pauseTask=u;var p=o("startedAt")(function(){return Date.now()});exports.startTask=p;var i=o("stoppedAt")(function(){return Date.now()});exports.stopTask=i,window.pauseTask=(0,e.default)(u),window.startTask=(0,e.default)(p),window.stopTask=(0,e.default)(i);
},{"../util/safeParse":"8Lq7","../util/errLog":"T/DR"}],"E6Mj":[function(require,module,exports) {
"use strict";var e=require("./tasks"),s=(0,e.pauseTask)("work");s.length&&tk.exit();
},{"./tasks":"rzbf"}]},{},["E6Mj"], null)