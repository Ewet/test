const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/box');

router.all('/recommendedAwards/list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/recommendedAwards/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/recommendedAwards/create', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/recommendedAwards/delete', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/recommendedAwards/modify', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
