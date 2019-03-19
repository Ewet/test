export default[
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('views/Payment/Payment'),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout-counter',
    name: 'CheckoutCounter',
    component: () => import('views/Payment/CheckoutCounter'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pay-success',
    name: 'PaySuccess',
    component: () => import('views/Payment/PaySuccess'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pay-fail',
    name: 'PayFail',
    component: () => import('views/Payment/PayFail'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-purchase',
    name: 'MemberPurchase',
    component: () => import('views/Payment/MemberPurchase'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-purchase-success',
    name: 'MemberPurchaseSuccess',
    component: () => import('views/Payment/MemberPurchase/Success'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-purchase-fail',
    name: 'MemberPurchaseFail',
    component: () => import('views/Payment/MemberPurchase/Fail'),
    meta: { requiresAuth: true }
  },
  {
    path: '/friends-payment',
    name: 'FriendsPayment',
    component: () => import('views/Payment/FriendsPayment'),
    meta: { requiresAuth: true }
  }
];
