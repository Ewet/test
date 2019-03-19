export default[
  {
    path: '/purchase-application',
    name: 'PurchaseApplication',
    component: () => import('views/PurchaseApplication/TransferPage'),
    meta: { requiresAuth: true }
  },
  {
    path: '/request-page',
    name: 'Request',
    component: () => import('views/PurchaseApplication/Request'),
    meta: { requiresAuth: true }
  },
  {
    path: '/request-result',
    name: 'RequestResult',
    component: () => import('views/PurchaseApplication/RequestResult'),
    meta: { requiresAuth: true }
  },
  {
    path: '/merchant-list',
    name: 'MerchantList',
    component: () => import('views/PurchaseApplication/MerchantList'),
    meta: { requiresAuth: true }
  }
];
