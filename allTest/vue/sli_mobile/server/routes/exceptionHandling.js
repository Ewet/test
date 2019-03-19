const router = require('koa-router')();
const { getFileByUrl } = require('../utils/file.js');
router.prefix('/boxserver/mobile/replenishment');

router.all('/exception_list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/collate/exceptions', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
module.exports = router;
