/*
 * @Author: chenzq
 * @Date: 2022-11-20 16:13:30
 * @Description: 把 webpack.dev.js 和 webpack.prod.js 合并为一个配置文件。
 * @LastEditTime: 2022-11-20 18:37:09
 * @LastEditors: chenzq
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { getStyleLoader } = require('./utils');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.resolve(__dirname, '../src/main'),
  output: {
    path: isDevelopment ? undefined : path.resolve(__dirname, '../dist'),
    filename: isDevelopment ? 'static/js/[name].js' : 'static/js/[name]-[contenthash:10].js', // 注意不是驼峰
    chunkFilename: isDevelopment
      ? 'static/js/chuck-[name].js'
      : 'static/js/chuck-[name]-[contenthash:10].js',
    // 统一配置静态资源输出
    assetModuleFilename: 'static/images/[name]-[hash:10][ext][query]',
    clean: true,
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
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: 'static/[name].css', // 注意不是驼峰
        chunkFilename: 'static/css/[name].chunk.css',
      }),
      // 复制静态文件
    !isDevelopment &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist'),
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    // HMR
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },
  devServer: {
    host: 'localhost',
    port: 3002,
    hot: true,
    open: true,
    // 解决history router 页面404问题
    historyApiFallback: true,
  },
  optimization: {
    minimize: !isDevelopment, // 是否开启优化配置
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      // css压缩
      new CssMinimizerPlugin(),
      // 生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，需要自己写
      new TerserWebpackPlugin(),
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
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test:/[\\/]node_modules[\\/]react(.*)/,
          name:'chunk-react',
          priority: 40
        },
        antd: {
          test:/[\\/]node_modules[\\/]antd(.*)/,
          name:'chunk-antd',
          priority: 30
        },
        libs: {
          test:/[\\/]node_modules[\\/]/,
          name:'chunk-libs',
          priority: 20
        },
      },
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}.js`,
    },
  },
  performance: false, // 关闭性能分析，可提高构建速度
  // performance: {
  //   hints: 'warning', // 是否开启性能提示警告。 false | "warning" | "error"
  //   // 此属性允许 webpack 控制用于计算性能提示的文件。默认函数如下：
  //   assetFilter: function (assetFilename) {
  //     return /\.(jsx?|tsx?)?/.test(assetFilename);
  //   },
  // },
};
