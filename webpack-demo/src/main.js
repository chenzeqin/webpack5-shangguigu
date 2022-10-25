/* demo01: 基本使用，引入多个js文件 */

import { add } from './demo01/add';
import { minus } from './demo01/minus';


const div = document.createElement('div');
div.innerText = `result => ${add(1, 1)}, ${minus(5, 1)}`;

document.body.appendChild(div);
