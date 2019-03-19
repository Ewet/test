const {
  getFileByUrl
} = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/box/door');

router.all('/qr_code', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
module.exports = router;

