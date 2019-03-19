
let ctx = require.context('./', true, /router.js$/);
const importAll = ctx => ctx.keys().map(key => ctx(key).default || ctx(key));
const routes = importAll(ctx);
ctx = null;
export default routes;
