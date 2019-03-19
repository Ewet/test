const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/platform/member_center/limit/rule',
  dirname: __dirname,
  actions: [
    {
      method: 'post',
      name: 'list',
      filename: 'limitRuleList'
    },
    {
      method: 'post',
      name: 'info',
      filename: 'info'
    },
    {
      method: 'post',
      name: 'delete',
      filename: 'delete'
    },
    {
      method: 'post',
      name: 'enable',
      filename: 'enable'
    },
    {
      method: 'post',
      name: 'create',
      filename: 'create'
    },
    {
      method: 'post',
      name: 'modify',
      filename: 'modify'
    },
    {
      method: 'post',
      name: 'log_list',
      filename: 'logList'
    }
  ]
});
module.exports = router;
