const { getFileByUrl } = require('../utils/file.js');
const router = require('koa-router')();
router.prefix('/boxserver/box');

// 盒子升级-详情
router.all('/upgrade/info', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子升级-列表
router.all('/upgrade/list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子升级-搜索结果列表
router.all('/upgrade/result_upgrade', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子升级-批量升级
router.all('/upgrade/batch_upgrade', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子升级-固件类型列表
router.all('/firmware/firmwares_type_list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子升级-固件文件列表
router.all('/firmware/file_list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});

// 盒子升级-固件信息列表
router.all('/firmware/info_list', async (ctx, next) => {
  var data = await getFileByUrl(ctx.request);
  ctx.response.type = 'text/plain';
  ctx.response.body = data;
});
module.exports = router;
