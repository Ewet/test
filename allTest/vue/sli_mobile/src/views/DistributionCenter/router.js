export default[{
  path: '/distribution-center-home',
  name: 'DistributionCenterHome',
  component: () => import('./Home'),
  meta: { requiresAuth: true }
},
{
  path: '/faq',
  name: 'Faq',
  component: () => import('./Faq'),
  meta: { requiresAuth: true }
},
{
  path: '/my-partner',
  name: 'MyPartner',
  component: () => import('./MyPartner'),
  meta: { requiresAuth: true }
},
{
  path: '/my-quota',
  name: 'MyQuota',
  component: () => import('./MyQuota'),
  meta: { requiresAuth: true }
}];
