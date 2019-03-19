export default[{
  path: '/purchase-register',
  name: 'PurchaseRegister',
  component: () => import('views/PurchaseRegister'),
  meta: { requiresAuth: true }
}];
