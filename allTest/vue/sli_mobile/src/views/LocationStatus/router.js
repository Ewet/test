export default[{
  path: '/location-status',
  name: 'LocationStatus',
  component: () => import('./'),
  meta: { requiresAuth: true }
}];
