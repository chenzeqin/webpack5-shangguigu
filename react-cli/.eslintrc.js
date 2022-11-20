module.exports = {
  extends: [
    'react-app',
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:prettier/recommended',
  ],
  parserOptions: {
    // 解决页面报错
    babelOptions: {
      presets: [['babel-preset-react-app', false], 'babel-preset-react-app/prod'],
    },
  },
};
