const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/auth');

router.all('/department/list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/department/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/department/create', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/department/delete', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/department/update', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/employee_role_area_relation/batchUpdateRelation', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
