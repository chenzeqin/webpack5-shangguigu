const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { getStyleLoader } = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
/*
  对应5个概念
*/
const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
  entry: path.resolve(__dirname, '../src/main'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].js', // 注意不是驼峰
    chunkFilename: 'static/js/[name].js',
    // 统一配置静态资源输出
    assetModuleFilename: 'static/images/[name]-[hash:10][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.less$/,
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
      {
        test: /\.(png|jpe?g|gif|webp|svg)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        // 输出到指定目录
        // generator: {
        //   filename: 'static/fonts/[name]-[hash:10][ext][query]',
        // },
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启Babel缓存， 提升构建速度
              cacheCompression: false, // 关闭缓存文件压缩
              // plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积 react preset已经配置好了
            },
          },
          {
            loader: 'ts-loader',
            // for HMR
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
      cache: true, // 开启eslint缓存，提升构建速度
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintCache'), // 指定缓存目录
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // css抽取
    new MiniCssExtractPlugin({
      filename: 'static/[name].css', // 注意不是驼峰
      chunkFilename: 'static/[name].chunk.css',
    }),
    // HMR
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}.js`,
    },
  },
  devServer: {
    host: 'localhost',
    port: 3002,
    hot: true,
    open: true,
    // 解决history router 页面404问题
    historyApiFallback: true,
  },
};
