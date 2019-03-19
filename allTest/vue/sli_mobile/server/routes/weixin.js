const router = require('koa-router')();
const {
  getFileByUrl
} = require('../utils/file.js');
router.prefix('/platform/mobile/weixin');

router.all('/openid', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/login', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
