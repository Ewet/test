const router = require('koa-router')();
const cashFlowRecord = require('./cashFlowRecord');
router.use(cashFlowRecord.routes(), cashFlowRecord.allowedMethods());
module.exports = router;
