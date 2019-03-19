export default[{
  path: '/tally',
  name: 'Tally',
  component: () => import('views/Tally'),
  meta: { requiresAuth: true }
}];
