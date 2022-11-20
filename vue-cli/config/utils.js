/*
 * @Author: chenzq
 * @Date: 2022-11-06 15:42:11
 * @Description: webpack config utils
 * @LastEditTime: 2022-11-21 00:05:59
 * @LastEditors: chenzq
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  /**
   * @description: 获取样式配置loader
   * @param {*} loaderName undefined (css不需要预处理器)|  less-loader | stylus-loader | sass-loader
   * @return {*}
   */
  getStyleLoader(loaderName) {
    return [
      // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                // 其他选项
                {},
              ],
            ],
          },
        },
      },
      loaderName,
    ].filter(Boolean);
  },
};
