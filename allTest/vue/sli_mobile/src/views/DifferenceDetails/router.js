export default[
  {
    path: '/difference-details',
    name: 'DifferenceDetails',
    component: () => import('./'),
    meta: { requiresAuth: true }
  },
  {
    path: '/meg-page',
    name: 'MegPage',
    component: () => import('./MegPage'),
    meta: { requiresAuth: true }
  }
];
