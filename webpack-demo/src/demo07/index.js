// 箭头函数会被Babel编译成普通函数
export const sum = (...args) => {
  return args.reduce((prev, current) => prev + current, 100);
};
