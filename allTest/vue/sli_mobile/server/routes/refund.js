const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/mobile/box');

router.all('/refund/list', async (ctx, next) => {
  var refund_status = ctx.request.body['refund_status'];
  console.log('refund_status', refund_status);

  var data = await getFileByUrl(ctx.request);
  if (refund_status.toString() === '1') {
    data = JSON.parse(data);
    data.data.items = data.data.items.filter(x => x.status === '10');
    data = JSON.stringify(data);
  }
  if (refund_status.toString() === '0') {
    data = JSON.parse(data);
    data.data.items = data.data.items.filter(x => x.status === '30');
    data = JSON.stringify(data);
  }
  // data = JSON.parse(data);
  // data.data.items = [];
  // data = JSON.stringify(data);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/modify', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/create', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/refund/cancel_refund', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
