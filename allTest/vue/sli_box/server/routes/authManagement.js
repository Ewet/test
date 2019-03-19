const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/auth');

router.all('/resources/list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/auth_resources/menu', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
