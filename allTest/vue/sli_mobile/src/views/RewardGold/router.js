export default[
  {
    path: '/rewardGold-withdraw',
    name: 'RewardGoldWithdraw',
    component: () => import('views/RewardGold/RewardGoldWithdraw'),
    meta: { requiresAuth: true }
  },
  {
    path: '/rewardGold-detail',
    name: 'RewardGoldDetail',
    component: () => import('views/RewardGold/RewardGoldDetail'),
    meta: { requiresAuth: true }
  },
  {
    path: '/rewardgold-operation',
    name: 'RewardGoldOperation',
    component: () => import('views/RewardGold/RewardGoldOperation'),
    meta: { requiresAuth: true }
  },
  {
    path: '/rewardGold-pool',
    name: 'RewardGoldPool',
    component: () => import('views/RewardGold/RewardGoldPool'),
    meta: { requiresAuth: true }
  }];
