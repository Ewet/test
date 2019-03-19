export default[
  {
    path: '/withdraw-detail',
    name: 'WithdrawDetail',
    component: () => import('views/Withdraw/WithdrawDetail'),
    meta: { requiresAuth: true }
  },
  {
    path: '/withdraw-account-manage',
    name: 'WithdrawAccountManage',
    component: () => import('views/Withdraw/WithdrawAccountManage'),
    meta: { requiresAuth: true }
  },
  {
    path: '/withdraw-result',
    name: 'WithdrawResult',
    component: () => import('views/Withdraw/WithdrawResult'),
    meta: { requiresAuth: true }
  }];
