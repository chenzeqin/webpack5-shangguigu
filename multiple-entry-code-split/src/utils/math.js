export const add = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};

const btn = document.getElementById('btn');
// 点击时才加载 count.js模块
btn.addEventListener('click', () => {
  console.log('模块加载成功');
  import('./count')
    .then((res) => {
      console.log(res.default(1, 2));
      console.log(res.divide(4, 4));
    })
    .catch((err) => {
      console.error(err);
      console.log('模块加载失败');
    });
});
