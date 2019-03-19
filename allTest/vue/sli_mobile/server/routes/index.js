const router = require('koa-router')();
const { getFileByUrl } = require('../utils/file.js');
const coupon = require('./coupon');
const payment = require('./payment');
const distribution = require('./distribution');
const user = require('./user');
const member = require('./member');
const prizesList = require('./prizesList');
router.prefix('/platform/mobile');

router.all('/login', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/logout', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

router.all('/current_lander', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
router.use(payment.routes(), payment.allowedMethods());
router.use(distribution.routes(), distribution.allowedMethods());
router.use(coupon.routes(), coupon.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(member.routes(), member.allowedMethods());
router.use(prizesList.routes(), prizesList.allowedMethods());
module.exports = router;
