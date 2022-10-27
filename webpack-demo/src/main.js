/* demo01: 基本使用，引入多个js文件 */
import { add } from './demo01/add';
import { minus } from './demo01/minus';
/* demo02: 处理css资源 */
import './demo02/index.css'
/* demo03: 处理less资源 */
import './demo03/index.less'


const div = document.createElement('div');
div.innerText = `result => ${add(1, 1)}, ${minus(5, 1)}`;

document.body.appendChild(div);
