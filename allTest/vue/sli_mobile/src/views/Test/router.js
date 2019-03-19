export default[{
  path: '/wechat-api',
  name: 'WechatAPi',
  component: () => import('views/Test/WechatApi'),
  meta: { requiresAuth: true }
}];
