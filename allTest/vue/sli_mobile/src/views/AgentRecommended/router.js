export default[{
  path: '/recommended-code',
  name: 'RecommendedCode',
  component: () => import('./RecommendedCode'),
  meta: { requiresAuth: true }
}];
