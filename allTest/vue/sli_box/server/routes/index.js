const router = require('koa-router')();
const monitor = require('./monitor');
const user = require('./user');
router.prefix('/boxserver/box');
[monitor, user].forEach(d => router.use(d.routes(), d.allowedMethods()));
module.exports = router;
