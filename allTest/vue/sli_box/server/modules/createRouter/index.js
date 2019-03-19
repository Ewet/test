module.exports = ({ prefix, dirname, actions }) => {
  const getJSON = filename => {
    let data = null;
    try {
      data = require(`${dirname}/${filename}.json`);
    } catch (ex) {
      data = require(`./${filename}.json`);
    }
    return data;
  };
  const router = require('koa-router')();
  router.prefix(prefix);
  if (Array.isArray(actions)) {
    actions.forEach(({
      method,
      name,
      filename
    }) => {
      router[method](`/${name}`, async (ctx, next) => {
        ctx.response.type = 'text/plain';
        ctx.response.body = getJSON(`${filename || name}`);
      });
    });
  }
  // 列表
  router.get('/', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('list');
  });
  // 获取单条
  router.get('/:id', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('info');
  });
  // 新增
  router.post('/', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('create');
  });
  // 更新
  router.put('/:id', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('modify');
  });
  // 删除
  router.del('/:id', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('delete');
  });
  // 批量删除
  router.del('/', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('delete');
  });
  return router;
};
