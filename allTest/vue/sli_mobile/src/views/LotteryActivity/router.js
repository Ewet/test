export default[{
  path: '/lottery',
  name: 'Lottery',
  component: () => import('./'),
  meta: { requiresAuth: true }
},
{
  path: '/my-prize',
  name: 'MyPrize',
  component: () => import('./MyPrize'),
  meta: { requiresAuth: true }
},
{
  path: '/prize-detail',
  name: 'PrizeDetail',
  component: () => import('./PrizeDetail'),
  meta: { requiresAuth: true }
},
{
  path: '/lottery-rule',
  name: 'LotteryRule',
  component: () => import('./LotteryRule'),
  meta: { requiresAuth: true }
},
{
  path: '/lottery-prize',
  name: 'LotteryPrize',
  component: () => import('./LotteryPrize'),
  meta: { requiresAuth: true }
}
];
