const createRouter = require('../../createRouter');
const router = createRouter({
  prefix: '/boxserver/tickets',
  dirname: __dirname,
  actions: [
    {
      method: 'get',
      name: 'list'
    },
    {
      method: 'get',
      name: 'count',
      filename: 'badge'
    },
    {
      method: 'post',
      name: ':ticket_id/operating',
      filename: 'operating'
    },
    {
      method: 'get',
      name: ':ticket_id/record',
      filename: 'communicateInfo'
    },
    {
      method: 'get',
      name: 'dept',
      filename: 'dept'
    }
  ]
});

module.exports = router;
