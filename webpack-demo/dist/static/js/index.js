/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/demo01/add.js":
/*!***************************!*\
  !*** ./src/demo01/add.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"add\": () => (/* binding */ add)\n/* harmony export */ });\nfunction add(a, b) {\n  return a + b;\n}\n\n//# sourceURL=webpack://webpack-demo/./src/demo01/add.js?");

/***/ }),

/***/ "./src/demo01/minus.js":
/*!*****************************!*\
  !*** ./src/demo01/minus.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"minus\": () => (/* binding */ minus)\n/* harmony export */ });\nfunction minus(a, b) {\n  return a - b;\n}\n\n//# sourceURL=webpack://webpack-demo/./src/demo01/minus.js?");

/***/ }),

/***/ "./src/demo07/index.js":
/*!*****************************!*\
  !*** ./src/demo07/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sum\": () => (/* binding */ sum)\n/* harmony export */ });\n// 箭头函数会被Babel编译成普通函数\nvar sum = function sum() {\n  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n    args[_key] = arguments[_key];\n  }\n  return args.reduce(function (prev, current) {\n    return prev + current;\n  }, 0);\n};\n\n//# sourceURL=webpack://webpack-demo/./src/demo07/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo01_add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo01/add */ \"./src/demo01/add.js\");\n/* harmony import */ var _demo01_minus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demo01/minus */ \"./src/demo01/minus.js\");\n/* harmony import */ var _demo02_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo02/index.css */ \"./src/demo02/index.css\");\n/* harmony import */ var _demo03_index_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demo03/index.less */ \"./src/demo03/index.less\");\n/* harmony import */ var _demo04_index_sass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./demo04/index.sass */ \"./src/demo04/index.sass\");\n/* harmony import */ var _demo04_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demo04/index.scss */ \"./src/demo04/index.scss\");\n/* harmony import */ var _demo05_index_styl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./demo05/index.styl */ \"./src/demo05/index.styl\");\n/* harmony import */ var _demo06_index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./demo06/index.scss */ \"./src/demo06/index.scss\");\n/* harmony import */ var _assets_fonts_iconfont_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/fonts/iconfont.css */ \"./src/assets/fonts/iconfont.css\");\n/* harmony import */ var _demo07_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./demo07/index */ \"./src/demo07/index.js\");\n/* demo01: 基本使用，引入多个js文件 */\n\n\n/* demo02: 处理css资源 */\n\n/* demo03: 处理less资源 */\n\n/* demo04: 处理sass资源 */\n\n\n/* demo05: 处理stylus资源 */\n\n/* demo06 处理图片资源 */\n\n/* demo07 处理图标文件 */\n\n/* babel */\n\nconsole.log((0,_demo07_index__WEBPACK_IMPORTED_MODULE_9__.sum)(1, 2, 3, 4, 20));\n\n// eslint\n// rules: {\n//   \"no-var\": 'error' // 禁止使用var声明变量\n// },\n// var a = 123\n\nvar div = document.createElement('div');\ndiv.innerText = \"result => \".concat((0,_demo01_add__WEBPACK_IMPORTED_MODULE_0__.add)(1, 1), \", \").concat((0,_demo01_minus__WEBPACK_IMPORTED_MODULE_1__.minus)(5, 1));\ndocument.body.appendChild(div);\n\n//# sourceURL=webpack://webpack-demo/./src/main.js?");

/***/ }),

/***/ "./src/demo03/index.less":
/*!*******************************!*\
  !*** ./src/demo03/index.less ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/demo03/index.less?");

/***/ }),

/***/ "./src/demo04/index.sass":
/*!*******************************!*\
  !*** ./src/demo04/index.sass ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/demo04/index.sass?");

/***/ }),

/***/ "./src/demo04/index.scss":
/*!*******************************!*\
  !*** ./src/demo04/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/demo04/index.scss?");

/***/ }),

/***/ "./src/demo06/index.scss":
/*!*******************************!*\
  !*** ./src/demo06/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/demo06/index.scss?");

/***/ }),

/***/ "./src/demo05/index.styl":
/*!*******************************!*\
  !*** ./src/demo05/index.styl ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/demo05/index.styl?");

/***/ }),

/***/ "./src/assets/fonts/iconfont.css":
/*!***************************************!*\
  !*** ./src/assets/fonts/iconfont.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/assets/fonts/iconfont.css?");

/***/ }),

/***/ "./src/demo02/index.css":
/*!******************************!*\
  !*** ./src/demo02/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-demo/./src/demo02/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;