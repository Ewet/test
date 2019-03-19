export default[
  {
    path: '/sweepcode-payment',
    name: 'SweepCodePayment',
    component: () => import('views/SweepCodePayment'),
    meta: { requiresAuth: true } // 为false时路由跳转不了
  }
];
