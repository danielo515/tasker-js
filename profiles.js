// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ncRp":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tasker-js-runner", [], factory);
	else if(typeof exports === 'object')
		exports["tasker-js-runner"] = factory();
	else
		root["tasker-js-runner"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tasker__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(2);



const hotReload = () => {
  const environment = __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].global('TJS_ENV');
  if (environment !== 'development') return Promise.resolve();
  return fetch(__WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].global('TJS_DEV_REMOTE')).then(res => res.text()).then(result => {
    const existingFile = __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].readFile(__WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].global('TJS_LOCAL_PATH'));

    if (existingFile !== result) {
      __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].writeFile(__WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].global('TJS_LOCAL_PATH'), result);
      __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].flash('script updated');
      __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].performTask('TJS:RunScript', __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].local('priority'), JSON.stringify(__WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].locals));
      __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].exit();
    }
  }).catch(err => __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].flash(err.message));
};

class TaskerJS {
  constructor(routes) {
    this.router = new __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */](routes, __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */]);
    hotReload().then(() => this.router.dispatch(__WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].locals).catch(err => __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].flash(err.message)).then(() => __WEBPACK_IMPORTED_MODULE_0__tasker__["a" /* default */].exit()));
  }

}
/* harmony export (immutable) */ __webpack_exports__["default"] = TaskerJS;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* global local_keys */
var tasker = window;
window.tasker = tasker; // Injecting development functions

tasker.inspect = target => {
  const cache = [];
  return JSON.stringify(target, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      } // Store value in our collection


      cache.push(value);
    }

    return value;
  });
};

tasker.console = {
  log(...params) {
    tasker.flash(params.map(param => typeof param === 'string' ? param : tasker.inspect(param)).join(' '));
  }

};

tasker.getParams = () => {
  return [tasker.local('par1'), tasker.local('par2')].map(rawParam => {
    // Test if param is a json
    let parsedParam;

    try {
      parsedParam = JSON.parse(rawParam); // will fail if param is not a JSON
    } catch (err) {
      parsedParam = rawParam;
    }

    return parsedParam === 'undefined' ? undefined : parsedParam;
  });
}; // Attempt to restore param from upstream


const localsJson = tasker.getParams()[0];
tasker.locals = localsJson || local_keys.reduce((acc, key) => {
  const keyName = key.slice(1);
  acc[keyName] = tasker.local(keyName);
  return acc;
}, {});
/* harmony default export */ __webpack_exports__["a"] = (tasker);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Router {
  constructor(routes, context) {
    this.context = context;
    this.routes = routes;

    if (!this.routes.ui) {
      this.routes.ui = {
        enter() {},

        exit() {}

      };
    }
  }

  dispatch(locals) {
    return Promise.resolve().then(() => {
      // Make route
      const callerInfo = locals.callerdebug || locals.caller2 || locals.caller1;
      var i = callerInfo.indexOf(':');
      const caller = {
        type: callerInfo.slice(0, i).split('=')[1] || 'enter',
        route: callerInfo.slice(i + 1)
      }; // Go to route

      const route = this.routes[caller.route] || this.routes.ui;
      return route[caller.type](locals, this.context);
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


/***/ })
/******/ ]);
});
},{}],"pfd8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startTask = void 0;
var startTask = {
  enter: function enter(locals, tasker) {
    var varName = "TASK_".concat(locals.par1, "_START");
    tasker.setGlobal(varName, Date.now().toString());
  },
  exit: function exit(locals, tasker) {}
};
exports.startTask = startTask;
},{}],"cPI2":[function(require,module,exports) {
"use strict";

var _taskerJsRunner = _interopRequireDefault(require("tasker-js-runner"));

var _timeManager = require("./modules/timeManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Construct Tasker JS and pass in mapping information as an Object
new _taskerJsRunner.default({
  // Profile name: module
  'taskStart': _timeManager.startTask
});
},{"tasker-js-runner":"ncRp","./modules/timeManager":"pfd8"}]},{},["cPI2"], null)