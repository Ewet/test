export default[
  {
    path: '/refund',
    name: 'Refund',
    component: () => import('views/Refund/Refund'),
    meta: { requiresAuth: true }
  },
  {
    path: '/refund-request',
    name: 'RefundRequest',
    component: () => import('views/Refund/RefundRequest'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-request',
    name: 'EditRequest',
    component: () => import('views/Refund/EditRequest'),
    meta: { requiresAuth: true }
  },
  {
    path: '/refund-success',
    name: 'RefundSuccess',
    component: () => import('views/Refund/RefundSuccess'),
    meta: { requiresAuth: true }
  },
  {
    path: '/refund-fail',
    name: 'RefundFail',
    component: () => import('views/Refund/RefundFail'),
    meta: { requiresAuth: true }
  }

];
