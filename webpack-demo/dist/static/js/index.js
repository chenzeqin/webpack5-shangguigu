/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/demo01/add.js
function add(a, b) {
  return a + b;
}
;// CONCATENATED MODULE: ./src/demo01/minus.js
function minus(a, b) {
  return a - b;
}
;// CONCATENATED MODULE: ./src/demo07/index.js
// 箭头函数会被Babel编译成普通函数
const sum = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.reduce((prev, current) => prev + current, 0);
};
;// CONCATENATED MODULE: ./src/main.js
/* demo01: 基本使用，引入多个js文件 */


/* demo02: 处理css资源 */

/* demo03: 处理less资源 */

/* demo04: 处理sass资源 */


/* demo05: 处理stylus资源 */

/* demo06 处理图片资源 */

/* demo07 处理图标文件 */

/* babel */

console.log(sum(1, 2, 3, 4, 20));

// eslint
// rules: {
//   "no-var": 'error' // 禁止使用var声明变量
// },
// var a = 123

const div = document.createElement('div');
div.innerText = `result => ${add(1, 1)}, ${minus(5, 1)}`;
document.body.appendChild(div);
// 判断是否支持HMR功能
if (false) {}
/******/ })()
;
//# sourceMappingURL=index.js.map