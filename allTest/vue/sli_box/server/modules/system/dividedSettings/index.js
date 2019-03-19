
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/box/merchant/:merchant_id/distribution/rule',
  dirname: __dirname,
  actions: [
    {
      method: 'get',
      name: ':rule_id/operation',
      filename: 'operation'
    },
    {
      method: 'put',
      name: ':rule_id/start',
      filename: 'start'
    },
    {
      method: 'put',
      name: 'end',
      filename: 'end'
    }
  ]
});

module.exports = router;
