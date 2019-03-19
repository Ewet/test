export default [
  {
    path: '/',
    component: () => import('./'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-center',
    name: 'MemberCenter',
    component: () => import('./'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-info',
    name: 'MemberInfo',
    component: () => import('./MemberInfo'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-qr',
    name: 'MemberQR',
    component: () => import('./MemberQRCode'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-credit',
    name: 'MemberCredit',
    component: () => import('./MemberCredit'),
    meta: { requiresAuth: true }
  }
];
