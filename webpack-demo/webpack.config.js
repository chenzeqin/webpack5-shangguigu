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
    rules: [],
  },
  // 插件
  plugins: [
    // plugin的配置
  ],
  // 模式
  mode: 'development',
};
