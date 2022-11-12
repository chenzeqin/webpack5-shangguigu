const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { getStyleLoader } = require('./utils');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// 多进程打包
const os = require('os');
// cpu核数
const threads = os.cpus().length;

/*
  对应5个核心概念
*/
module.exports = {
  // 入口
  entry: './src/main.js', // 相对路径(相对服务启动未知)
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'), // 绝对路径
    filename: 'static/js/[name].js', // 注意不是驼峰
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
            use: getStyleLoader(),
          },
          {
            test: /\.less$/,
            // loader:'less-loader',只能配置一个loader
            use: getStyleLoader('less-loader'),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader('sass-loader'),
          },
          {
            test: /\.styl$/,
            use: getStyleLoader('stylus-loader'),
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
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, '../src'), // 也可以用包含(不能同时使用)
            use: [
              {
                loader: 'thread-loader', // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: 'babel-loader',
                // 可以在这里写babel配置
                options: {
                  cacheDirectory: true, // 开启Babel缓存，提升构建速度
                  cacheCompression: false, // 关闭缓存文件压缩
                  plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积
                },
              },
            ],
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
      cache: true, // 开启eslint缓存,提升构建速度
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintCache'), // 指定缓存目录
      threads, // 开启多进程
    }),
    // 自动引入打包的资源
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // css抽取
    new MiniCssExtractPlugin({
      filename: 'static/main.css', // 注意不是驼峰
    }),
    // css压缩也可以写在这里，webpack5推荐统一写到optimization
    // new CssMinimizerPlugin(),
  ],
  // 优化配置项
  optimization: {
    // 代码压缩
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      // css压缩
      new CssMinimizerPlugin(),
      // 生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，需要自己写
      new TerserWebpackPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片,无损压缩配置为例：
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    'preset-default',
                    'prefixIds',
                    {
                      name: 'sortAttrs',
                      params: {
                        xmlnsOrder: 'alphabetical',
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks:{
      chunks:'all', // 其他使用默认配置
    }
  },
  // 开发服务器(生产环境不需要)
  // devServer: {
  //   host: 'localhost',
  //   port: 3000,
  //   open: true, // 是否自动打开浏览器
  // },
  // 开启生产模式，js和html自动压缩
  mode: 'production',
  devtool: 'source-map', // 开启调试
};
