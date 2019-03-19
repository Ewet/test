export default[{
  path: '/replenishment',
  name: 'Replenishment',
  component: () => import('@/views/Replenishment'),
  meta: { requiresAuth: true }
}];
