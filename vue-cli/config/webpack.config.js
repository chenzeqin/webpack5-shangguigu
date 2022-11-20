const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getStyleLoader } = require('./utils');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const isDevelopment = process.env.NODE_ENV;

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.resolve(__dirname, '../main.js'),
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.js', '.json', '.vue'],
  },
  output: {
    path: isDevelopment ? undefined : path.resolve(__dirname, '../dist'),
    filename: isDevelopment ? 'static/js/[name].js' : 'static/js/[name][contenthash].js',
    chunkFilename: isDevelopment
      ? 'static/js/chunk-[name].js'
      : 'static/js/chunk-[name][contenthash].js',
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
        test: /\.s(a|c)ss$/,
        use: getStyleLoader('sass-loader'),
      },
      {
        test: /\.less$/,
        use: getStyleLoader('less-loader'),
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
        // 输出到指定目录, assetModuleFilename统一修改
        // generator: {
        //   filename: 'static/fonts/[name]-[hash:10][ext][query]',
        // },
      },

      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启Babel缓存， 提升构建速度
              cacheCompression: false, // 关闭缓存文件压缩
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
      cache: true,
      // 缓存位置
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintCache'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: 'static/[name].css', // 注意不是驼峰
        chunkFilename: 'static/css/[name].chunk.css',
      }),
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
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    // 定义环境变量给原代码使用，fix:vue3警告
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // "single" | "multiple" | boolean | object { name? }
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}.js`,
    },
    minimize: !isDevelopment,
    minimizer: [
      // css压缩
      new CssMinimizerPlugin(),
      // 生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，需要自己写
      new TerserWebpackPlugin(),
      //  TODO: 图片压缩 文件不多时不需要配置，经常下载失败，这里不配置了， 有需要查看文档或者../../react-cli
    ],
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true, // HMR
  },
  devtool: isDevelopment ? 'source-map' : 'cheap-module-source-map',
  performance: false,
};
