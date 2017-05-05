/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _burger = __webpack_require__(2);

//console.log('kirikou', version);

//import {version} from './module.js';
var ul = document.createElement('ul');
var button = document.getElementById('btn');
var button1 = document.getElementById('btnV');
button.addEventListener('click', affiche, false);
button1.addEventListener('click', afficheVegan, false);

function affiche() {
	ul.innerHTML = "";
	(0, _burger.getRandomRecipe)().then(function (recipe) {
		recipe.forEach(function (toppings) {
			var li = document.createElement('li');
			li.innerHTML = '<strong>' + toppings + '</strong>';
			ul.appendChild(li);
		});
	});
	document.body.appendChild(ul);
}

function afficheVegan() {

	ul.innerHTML = "";
	(0, _burger.getRandomRecipeVegan)().then(function (recipe) {
		recipe.forEach(function (toppings) {
			var li = document.createElement('li');
			li.innerHTML = '<strong>' + toppings + '</strong>';
			ul.appendChild(li);
		});
	});
	document.body.appendChild(ul);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRandomRecipe = getRandomRecipe;
exports.getRandomRecipeVegan = getRandomRecipeVegan;

var _http = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /*let toppings = [
                                                                                                                                                                                                    'egg', 
                                                                                                                                                                                                    'cheese', 
                                                                                                                                                                                                    'salad', 
                                                                                                                                                                                                    'onion', 
                                                                                                                                                                                                    'steak', 
                                                                                                                                                                                                    'chicken', 
                                                                                                                                                                                                    'bacon', 
                                                                                                                                                                                                    'fish', 
                                                                                                                                                                                                    'pickle', 
                                                                                                                                                                                                    'mayo', 
                                                                                                                                                                                                    'ketchup'
                                                                                                                                                                                                    ];
                                                                                                                                                                                                    */

function getRandomRecipe() {
	return getToppings().then(function (toppings) {
		return toppings.filter(function (t) {
			return t.name != "soja steak";
		});
	}).then(function (toppings) {
		return toppings.map(function (t) {
			return t.name;
		});
	}).then(function (toppings) {
		return [].concat(_toConsumableArray(toppings), _toConsumableArray(toppings));
	}).then(buildRecipe);
}
function getRandomRecipeVegan() {
	return getToppings().then(function (toppings) {
		return toppings.filter(function (t) {
			return t.vegan;
		});
	}).then(function (toppings) {
		return toppings.map(function (t) {
			return t.name;
		});
	}).then(function (toppings) {
		return [].concat(_toConsumableArray(toppings), _toConsumableArray(toppings));
	}).then(buildRecipe);
}

var toppingsCache = void 0;
function getToppings() {
	return toppingsCache ? Promise.resolve(toppingsCache) : (0, _http.get)('http://10.1.0.148:3000/toppings').then(function (toppings) {
		toppingsCache = toppings;
		return toppingsCache;
	});
}

function getRandomNbToppings(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

function buildRecipe(doubleToppings) {
	var nbToppings = getRandomNbToppings(3, 6);
	var recipe = [];

	for (var i = 0; i < nbToppings; i++) {
		var j = Math.floor(Math.random() * doubleToppings.length);
		var randomTopping = doubleToppings.splice(j, 1);
		recipe.push(randomTopping[0]);
	}
	return recipe;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
function get(url) {
	return fetch(url).then(function (response) {
		if (response.ok) return response.json();
		return Promise.reject("Error " + response.status);
	});
}

/***/ })
/******/ ]);