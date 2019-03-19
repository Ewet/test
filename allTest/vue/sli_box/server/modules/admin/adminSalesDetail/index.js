
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/box/finance/report',
  dirname: __dirname,
  actions: [{
    method: 'get',
    name: 'reports_all'
  }, {
    method: 'post',
    name: 'saleDetails_all'
  }]
});

module.exports = router;
