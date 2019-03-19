let ctx = require.context('views', true, /router.js$/);
let importAll = ctx => ctx.keys().reduce((init, key) => {
  let route = ctx(key).default || ctx(key);
  if (Array.isArray(route)) {
    init.push(...route);
  } else {
    init.push(route);
  }
  return init;
}, []);
export default importAll(ctx);
