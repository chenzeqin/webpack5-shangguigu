export const add = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};
