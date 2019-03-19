const router = require('koa-router')();
const coupon = require('./coupon');
const order = require('./order');
router.prefix('/user');
router.use(coupon.routes(), coupon.allowedMethods());
router.use(order.routes(), order.allowedMethods());
module.exports = router;
