if (!self.define) {
  let i,
    e = {};
  const s = (s, t) => (
    (s = new URL(s + '.js', t).href),
    e[s] ||
      new Promise((e) => {
        if ('document' in self) {
          const i = document.createElement('script');
          (i.src = s), (i.onload = e), document.head.appendChild(i);
        } else (i = s), importScripts(s), e();
      }).then(() => {
        let i = e[s];
        if (!i) throw new Error(`Module ${s} didn’t register its module`);
        return i;
      })
  );
  self.define = (t, n) => {
    const c = i || ('document' in self ? document.currentScript.src : '') || location.href;
    if (e[c]) return;
    let r = {};
    const a = (i) => s(i, c),
      o = { module: { uri: c }, exports: r, require: a };
    e[c] = Promise.all(t.map((i) => o[i] || a(i))).then((i) => (n(...i), r));
  };
}
define(['./workbox-b3a946dc'], function (i) {
  'use strict';
  self.skipWaiting(),
    i.clientsClaim(),
    i.precacheAndRoute(
      [
        { url: 'index.html', revision: '5f77fa9afaab10130cbaadb20a9051f0' },
        { url: 'static/images/iconfont-83d2c91e14.woff?t=1667651226965', revision: null },
        { url: 'static/images/iconfont-9d036b7986.woff2?t=1667651226965', revision: null },
        { url: 'static/images/iconfont-f6fa242d53.ttf?t=1667651226965', revision: null },
        { url: 'static/images/image01-e2f85510ae.png', revision: null },
        { url: 'static/images/image02-9770fe1eb4.jfif', revision: null },
        { url: 'static/images/image03-f92207e6c5.jpg', revision: null },
        { url: 'static/images/image52-546f70e9b5.jpg', revision: null },
        { url: 'static/js/387.js', revision: 'f94261f5610b352ca7f1677ef283ae51' },
        { url: 'static/js/main.js', revision: 'e37b3ec00db008dc17c7ca900bde4bbd' },
        { url: 'static/js/math.chunk.js', revision: 'f819017e7130c29dd59fe087cd90c174' },
        { url: 'static/js/runtime~main.js.js', revision: 'c6c300964a3bf894144fbc1131b4faa6' },
        { url: 'static/main.css', revision: '1a4916409316af619ece667c43660a6d' },
      ],
      {}
    );
});
//# sourceMappingURL=service-worker.js.map
