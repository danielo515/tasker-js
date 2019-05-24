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
})({"8Lq7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readArr = exports.default = void 0;

var safeParse = function safeParse(str) {
  var defaultVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    return JSON.parse(str);
  } catch (error) {
    return defaultVal;
  }
};

var _default = safeParse;
exports.default = _default;

var readArr = function readArr(name) {
  return safeParse(tk.global(name), []);
};

exports.readArr = readArr;
},{}],"T/DR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var logErrs = function logErrs(fn) {
  return function () {
    try {
      fn.apply(void 0, arguments);
    } catch (error) {
      tk.flashLong(error.toString());
    }
  };
};

var _default = logErrs;
exports.default = _default;
},{}],"rzbf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTask = exports.startTask = exports.pauseTask = exports.updateTask = exports.loadTask = void 0;

var _safeParse = _interopRequireDefault(require("../util/safeParse"));

var _errLog = _interopRequireDefault(require("../util/errLog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readObj = function readObj(name, fallback) {
  return (0, _safeParse.default)(tk.global(name), fallback);
};

var saveJson = function saveJson(name, value) {
  return tk.setGlobal(name, JSON.stringify(value));
};
/**
 * 
 * @typedef  Task
 * @property {String} title
 * @property {String} startedAt
 * @property {String} stoppedAt
 * @property {String} pauses
 */

/**
 * Loads a task from the storage or returns a default one
 * @param {String} name the name of the task to load
 * @returns {Task} the task from memory or empty task if it was not found or invalid
 */


var loadTask = function loadTask(name) {
  return readObj("TASK_".concat(name), {
    title: name,
    startedAt: null,
    pauses: [],
    stoppedAt: null
  });
};

exports.loadTask = loadTask;

var updateTask = function updateTask(field) {
  return function (updater) {
    return function (name) {
      try {
        var task = loadTask(name);
        task[field] = updater(task[field]); // pass the current value for convenience 

        saveJson("TASK_".concat(name), task);
        return task;
      } catch (error) {
        tk.flash("Error updating task ".concat(name, ":\n ").concat(error.toString));
      }
    };
  };
};

exports.updateTask = updateTask;
var pauseTask = updateTask('pauses')(function (current) {
  current.push(Date.now());
  return current;
});
exports.pauseTask = pauseTask;
var startTask = updateTask('startedAt')(function () {
  return Date.now();
});
exports.startTask = startTask;
var stopTask = updateTask('stoppedAt')(function () {
  return Date.now();
});
exports.stopTask = stopTask;
window.pauseTask = (0, _errLog.default)(pauseTask);
window.startTask = (0, _errLog.default)(startTask);
window.stopTask = (0, _errLog.default)(stopTask);
},{"../util/safeParse":"8Lq7","../util/errLog":"T/DR"}],"8Zl5":[function(require,module,exports) {
"use strict";

var _tasks = require("./tasks");

(0, _tasks.stopTask)('work');
tk.exit();
},{"./tasks":"rzbf"}]},{},["8Zl5"], null)