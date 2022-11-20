const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { getStyleLoader } = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/*
  对应5个概念
*/
module.exports = {
  entry: path.resolve(__dirname, '../src/main'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name]-[contenthash:10].js', // 注意不是驼峰
    chunkFilename: 'static/js/[name]-[contenthash:10].js',
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
  ].filter(Boolean),
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },
  optimization: {
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
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}.js`,
    },
  },
};
