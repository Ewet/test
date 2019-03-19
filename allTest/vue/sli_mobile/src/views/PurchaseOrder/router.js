export default[{
  path: '/purchase-order',
  name: 'PurchaseOrder',
  component: () => import('views/PurchaseOrder'),
  meta: { requiresAuth: true }
}];
