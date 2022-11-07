module.exports = {
  // 添加智能预设，编译es6代码
  presets: [
    // '@babel/preset-env',
    [
      '@babel/preset-env',
      {
        // 需要兼容的目标浏览器,
        // 如果有不支持的api，会自动引入指定corejs版本对应的api
        targets: {
          ie: '8',  // 打开之后，会引入需要的兼容代码
          // chrome: '88',
        },
        // // core-js 版本
        corejs: '3',
        // // 使用core-js的方式，usage:表示按需加载,
        useBuiltIns: 'usage',
      },
    ],
  ],
};
