module.exports = ({prefix, dirname, actions}) => {
  const getJSON = filename => {
    let data = null;
    try {
      data = require(`${dirname}/${filename}`);
    } catch (ex) {
      data = require(`./${filename}`);
    }
    return data;
  };
  const router = require('koa-router')();
  router.prefix(prefix);
  if (Array.isArray(actions)) {
    actions.forEach(({
      method,
      name
    }) => {
      router[method](`/${name}`, async (ctx, next) => {
        ctx.response.type = 'text/plain';
        ctx.response.body = getJSON(`${name}.json`);
      });
    });
  }
  // 列表
  router.get('/', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('/list.json');
  });
  // 获取单条
  router.get('/:id', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('info.json');
  });
  // 新增
  router.post('/', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('create.json');
  });
  // 更新
  router.put('/:id', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('modify.json');
  });
  // 删除
  router.del('/:id', async (ctx, next) => {
    ctx.response.type = 'text/plain';
    ctx.response.body = getJSON('delete.json');
  });
  return router;
};
