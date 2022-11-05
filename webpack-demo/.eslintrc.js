module.exports = {
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中的全局变量
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  // 继承
  extends: ['eslint:recommended'],
  // "off" | "warn" | "error" 或者 0 | 1 | 2
  // 自定义rules规则优先级大于继承的规则
  rules: {
    "no-var": 'error'
  },
};
