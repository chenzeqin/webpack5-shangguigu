const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
  对应5个核心概念
*/
module.exports = {
  // 入口
  entry: './src/main.js', // 相对路径(相对服务启动未知)
  // 输出 开发环境没有输出，不需要output
  output: {
    path: path.resolve(__dirname, '../dist'), // 绝对路径
    filename: 'static/js/index.js', // 注意不是驼峰
    clean: true, // 自动清空上一次打包内容
  },
  // 加载器
  module: {
    // loader配置
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/, // 只检查.css文件
            // 执行顺序： 从右到左（从下到上）
            use: [
              'style-loader', // 通过创建style标签，将js中的css添加到html文件中
              'css-loader', // 将css资源编译成commonjs的模块到js中
            ],
          },
          {
            test: /\.less$/,
            // loader:'less-loader',只能配置一个loader
            use: [
              'style-loader',
              'css-loader',
              'less-loader', //将less文件编译成css
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              // 将 JS 字符串生成为 style 节点
              'style-loader',
              // 将 CSS 转化成 CommonJS 模块
              'css-loader',
              // 将 Sass 编译成 CSS
              'sass-loader',
            ],
          },
          {
            test: /\.styl$/,
            use: [
              'style-loader',
              'css-loader',
              'stylus-loader', //将stylus文件编译成css
            ],
          },
          // 处理图片资源（默认可不配置）
          {
            test: /\.(jpe?g|png|gif|webp|svg)$/,
            type: 'asset',
            // 输出到指定目录
            generator: {
              filename: 'static/images/[name]-[hash:10][ext][query]',
            },
            parser: {
              // 小于10kb，转成base64
              dataUrlCondition: {
                maxSize: 10 * 1024, // 4kb
              },
            },
          },
          {
            test: /\.(jfif)$/,
            type: 'asset/resource',
            // 输出到指定目录
            generator: {
              filename: 'static/images/[name]-[hash:10][ext][query]',
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource',
            // 输出到指定目录
            generator: {
              filename: 'static/fonts/[name]-[hash:10][ext][query]',
            },
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, '../src'), // 也可以用包含(不能同时使用)
            // 可以在这里写babel配置
            // options:{}
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  // 开发服务器
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true, // 是否自动打开浏览器
    hot: true, // 默认就是true
  },
  // 模式
  mode: 'development',
  devtool: 'cheap-module-source-map',
};
