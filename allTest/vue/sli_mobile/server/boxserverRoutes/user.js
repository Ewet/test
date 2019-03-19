const router = require('koa-router')();
const {
  getFileByUrl
} = require('../utils/file.js');
router.prefix('/boxserver/mobile/user');
router.all('/is_login', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
module.exports = router;
