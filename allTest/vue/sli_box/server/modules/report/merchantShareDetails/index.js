
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/box/merchant',
  dirname: __dirname,
  actions: [{
    method: 'get',
    name: ':merchant_id/distribution/:rule_id',
    filename: 'list'
  }]
});

module.exports = router;
