
const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/box/inventory/',
  dirname: __dirname,
  actions: [{
    method: 'post',
    name: 'correct'
  }]
});

module.exports = router;
