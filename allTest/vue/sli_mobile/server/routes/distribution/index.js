const router = require('koa-router')();
const { getFileByUrl } = require('../../utils/file.js');
const commission = require('./commission');
const credit = require('./credit');
const grant = require('./grant');
const relation = require('./relation');
const withdraw = require('./withdraw');

router.prefix('/distribution');

router.all('/mypage', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/quota', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/invitation_qrcode', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.all('/buy_memberships', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.use(credit.routes(), credit.allowedMethods());
router.use(commission.routes(), commission.allowedMethods());
router.use(withdraw.routes(), withdraw.allowedMethods());
router.use(grant.routes(), grant.allowedMethods());
router.use(relation.routes(), relation.allowedMethods());

module.exports = router;
