
const createRouter = require('../createRouter');
const router = createRouter({
  prefix: '/boxserver/mobile/userRole',
  dirname: __dirname,
  actions: [{
    method: 'post',
    name: 'judge'
  }]
});

module.exports = [router];
