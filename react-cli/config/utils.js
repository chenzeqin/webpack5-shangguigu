/*
 * @Author: chenzq
 * @Date: 2022-11-06 15:42:11
 * @Description: webpack config utils
 * @LastEditTime: 2022-11-06 15:53:15
 * @LastEditors: chenzq
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  /**
   * @description: 获取样式配置loader
   * @param {*} loaderName undefined (css不需要预处理器)|  less-loader | stylus-loader | sass-loader
   * @return {*}
   */
  getStyleLoader(loaderName) {
    return [
      MiniCssExtractPlugin.loader,
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
