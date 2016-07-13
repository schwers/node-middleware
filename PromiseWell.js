(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PromiseWell.js"] = factory();
	else
		root["PromiseWell.js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create() {
	    var queue = [];

	    var processQueue = function processQueue(index, cb) {
	      var p = queue[index];

	      if (p) {
	        p.then(function () {
	          return processQueue(index + 1, cb);
	        });
	      } else {
	        cb();
	      }
	    };

	    return {
	      middleware: function middleware(store) {
	        return function (next) {
	          return function (action) {
	            if (action instanceof Promise) {
	              queue.push(action);
	              action.catch(function (reason) {
	                debugger;
	                throw reason; // re-throw uncaught promise exceptions to be visible
	                // by other parts of the stack
	              });
	              return action;
	            }

	            return next(action);
	          };
	        };
	      },
	      onComplete: function onComplete() {
	        return new Promise(function (resolve, reject) {
	          processQueue(0, resolve);
	        }).then(function () {
	          queue = [];
	        });
	      }
	    };
	  }
	};

/***/ }
/******/ ])
});
;