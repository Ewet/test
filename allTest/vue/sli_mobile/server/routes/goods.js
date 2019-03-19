const router = require('koa-router')();
const { getFileByUrl } = require('../utils/file.js');
router.prefix('/boxserver/mobile/goods');

router.all('/:id', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/order/:id', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
module.exports = router;
