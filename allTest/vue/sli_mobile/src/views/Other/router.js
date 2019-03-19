export default[ {
  path: '/callback',
  name: 'Callback',
  component: () => import('./Callback'),
  meta: { requiresAuth: true }
},
{
  path: '/invite',
  name: 'Invite',
  component: () => import('./Invite'),
  meta: { requiresAuth: true }
}, {
  path: '/404',
  name: '404',
  component: () => import('./404'),
  meta: { requiresAuth: true }
}];
