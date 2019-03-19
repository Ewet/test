// fwfwefew
// fewf
let ctx = require.context('./', true, /router.js$/);
const importAll = ctx => ctx.keys().reduce((init, key) => {
  const route = ctx(key).default || ctx(key);
  console.log(route);
  if (Array.isArray(route)) {
    init.push(...route);
  } else {
    init.push(route);
  }
  return init;
}, []);
const routes = importAll(ctx);
ctx = null;
export default routes;
