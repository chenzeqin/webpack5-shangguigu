/* demo01: 基本使用，引入多个js文件 */
import { add } from './demo01/add';
import { minus } from './demo01/minus';
/* demo02: 处理css资源 */
import './demo02/index.css';
/* demo03: 处理less资源 */
import './demo03/index.less';
/* demo04: 处理sass资源 */
import './demo04/index.sass';
import './demo04/index.scss';
/* demo05: 处理stylus资源 */
import './demo05/index.styl';
/* demo06 处理图片资源 */
import './demo06/index.scss';
/* demo07 处理图标文件 */
import './assets/fonts/iconfont.css';
/* babel */
import { sum } from './demo07/index';
console.log(sum(1, 2, 3, 4, 20));
/* demo08 测试tree shaking */
// 乘法没有引用到，不会打包
// import { division } from './demo08/math';
// console.log(division);

// eslint
// rules: {
//   "no-var": 'error' // 禁止使用var声明变量
// },
// var a = 123

const div = document.createElement('div');
div.innerText = `result => ${add(1, 1)}, ${minus(5, 1)}`;

new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 100);
});

'foobar'.includes('foo');

document.body.appendChild(div);
// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept('./demo07/index');
}

// 测试动态引入
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  // 为模块命名
  import(/* webpackChunkName: "math" */'./demo08/math').then(({ multi }) => {
    console.log('math模块加载成功');
    console.log(multi(2, 3));
  });
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}