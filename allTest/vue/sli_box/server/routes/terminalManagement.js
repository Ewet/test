const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver');

// 盒子广告-计划删除
router.del('/advert_plan_boxes/:box_advert_plan__id', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
// 盒子广告-状态修改
router.put('/advert_plan_boxes/:box_id/update', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
// 盒子广告-列表
router.get('/advert_plan_boxes', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
// 盒子广告-计划批量删除
router.del('/advert_plan_boxes', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子广告-计划列表
router.get('/advert_plan_boxes/:box_id', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

module.exports = router;
