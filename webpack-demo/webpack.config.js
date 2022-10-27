const path = require('path');
/* 
  对应5个核心概念
*/
module.exports = {
  // 入口
  entry: './src/main.js', // 相对路径
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'index.js', // 注意不是驼峰
  },
  // 加载器
  module: {
    // loader配置
    rules: [
      {
        test: /\.css$/, // 只检查.css文件
        // 执行顺序： 从右到左（从下到上）
        use: [
          'style-loader',  // 通过创建style标签，将js中的css添加到html文件中
           'css-loader', // 将css资源编译成commonjs的模块到js中
          ],
      },
    ],
  },
  // 插件
  plugins: [
    // plugin的配置
  ],
  // 模式
  mode: 'development',
};
