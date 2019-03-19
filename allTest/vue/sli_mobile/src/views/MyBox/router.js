export default[{
  path: '/my-box',
  name: 'MyBox',
  component: () => import('./'),
  meta: { requiresAuth: true }
}, {
  path: '/box-detail',
  name: 'BoxDetail',
  component: () => import('./Detail'),
  meta: { requiresAuth: true }
}];
