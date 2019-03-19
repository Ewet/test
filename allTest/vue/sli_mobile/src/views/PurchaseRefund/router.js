export default[{
  path: '/purchase-refund',
  name: 'PurchaseRefund',
  component: () => import('views/PurchaseRefund'),
  meta: { requiresAuth: true }
}];
