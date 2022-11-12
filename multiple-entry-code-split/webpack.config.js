const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks:'all', // 激活默认配置，下面默认配置可以不写
      // 默认配置
      chunks: 'async',
      minSize: 20000, // 单位bite
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30, // 最大加载30个文件
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000, // 强制要求超过50kb,一定会被打包
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
