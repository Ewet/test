const router = require('koa-router')();
const { getFileByUrl } = require('../utils/file.js');
router.prefix('/member');

router.all('/type/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
