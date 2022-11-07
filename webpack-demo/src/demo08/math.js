// 测试tree-shaking
export const multi = (a, b) => {
  return a * b + 'abc';
};
export const division = (a, b) => a / b;

new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 200);
});

'test'.includes('test');

new Set([1, 2, 3]);
