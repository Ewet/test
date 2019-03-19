export default[{
  path: '/recommended-awards',
  name: 'RecommendedAwards',
  component: () => import('views/RecommendedAwards'),
  meta: { requiresAuth: true }
},
{
  path: '/my-red-envelope',
  name: 'MyRedEnvelope',
  component: () => import('views/RecommendedAwards/MyRedEnvelope'),
  meta: { requiresAuth: true }
},
{
  path: '/user-scan',
  name: 'UserScan',
  component: () => import('views/RecommendedAwards/UserScan'),
  meta: { requiresAuth: true }
}];
