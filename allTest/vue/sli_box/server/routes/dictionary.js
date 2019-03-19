const router = require('koa-router')();
const { getFileByUrl } = require('../utils/file.js');
router.prefix('/boxserver/common/dictionary');

// router.all('/info', async (ctx, next) => {
//   let key = ctx.request.body['param_key'];
//   var data = await getFileByUrl({url: ctx.request.url, filename: key});
//   ctx.response.type = 'text/plain';
//   ctx.response.body = data;
// });
router.all('/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
