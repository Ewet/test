export default[
  {
    path: '/pay-result-success',
    name: 'PayResultSuccess',
    component: () => import('views/PaymentResult/Success'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pay-result-fail',
    name: 'PayResultFail',
    component: () => import('views/PaymentResult/Fail'),
    meta: { requiresAuth: true }
  }
];
