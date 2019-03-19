export default[
  {
    path: '/real-status-time',
    name: 'RealStatusTime',
    component: () => import('views/RealStatusTime'),
    meta: { requiresAuth: true }
  }
];
