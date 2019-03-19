
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/box',
  dirname: __dirname,
  actions: [{
    method: 'get',
    name: 'export_all'
  }, {
    method: 'post',
    name: 'proceeds_all'
  }]
});

module.exports = router;
