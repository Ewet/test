const {
  getFileByUrl
} = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/platform/member_center/random_remission');

router.all('/list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
module.exports = router;
