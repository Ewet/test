
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/box/finance',
  dirname: __dirname,
  actions: [{
    method: 'get',
    name: 'reports_all'
  }, {
    method: 'post',
    name: 'box_nos_all'
  }]
});

module.exports = router;
