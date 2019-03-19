const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/box');

router.all('/refund/list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/check', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/refunds', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
// 普通订单
router.all('/refund/apply_audit', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/refund_audit', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/stock_audit', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
// router.all('/refund/orderInfo', async (ctx, next) => {
//   var data = await getFileByUrl(ctx.request);
//   ctx.response.type = 'text/plain';
//   ctx.response.body = data;
// });
// router.all('/refund/goods/info', async (ctx, next) => {
//   var data = await getFileByUrl(ctx.request);
//   ctx.response.type = 'text/plain';
//   ctx.response.body = data;
// });
router.all('/order/sn_info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
