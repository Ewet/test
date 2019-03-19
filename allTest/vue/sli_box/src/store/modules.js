const ctx = require.context('views/', true, /(store.js|store\/index.js)$/);
const importAll = ctx => ctx.keys().reduce((init, key) => {
  const item = ctx(key);
  if (item.STORE_NAME) {
    init[item.STORE_NAME] = item.default;
  }
  return init;
}, {});
export default importAll(ctx);
