export default[
  {
    path: '/menu-page',
    name: 'MenuPage',
    component: () => import('@/views/ReplenishmentRecord/MenuPage'),
    meta: { requiresAuth: true }
  },
  {
    path: '/replenishment-record',
    name: 'ReplenishmentRecord',
    component: () => import('@/views/ReplenishmentRecord'),
    meta: { requiresAuth: true }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/ReplenishmentRecord/Detail'),
    meta: { requiresAuth: true }
  }
];
