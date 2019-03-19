
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/ad',
  dirname: __dirname,
  actions: [{
    method: 'get',
    name: 'customer'
  }]
});

module.exports = router;
