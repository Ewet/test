export default[
  {
    path: '/coupon-receiving',
    name: 'CouponReceiving',
    component: () => import('./CouponReceiving'),
    meta: { requiresAuth: true }
  },
  {
    path: '/available-coupon',
    name: 'AvailableCoupon',
    component: () => import('./AvailableCoupon'),
    meta: { requiresAuth: true }
  },
  {
    path: '/coupon-detail',
    name: 'CouponDetail',
    component: () => import('./CouponDetail'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-coupon',
    name: 'MyCoupon',
    component: () => import('./MyCoupon'),
    meta: { requiresAuth: true }
  }
];
