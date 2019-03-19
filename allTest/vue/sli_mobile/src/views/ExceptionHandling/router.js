export default[{
  path: '/exceptionHandling',
  name: 'ExceptionHandling',
  component: () => import('./'),
  meta: { requiresAuth: true }
}];
