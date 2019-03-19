export default [
  {
    path: '/goods-detail',
    name: 'GoodsDetail',
    component: () => import('views/Goods/GoodsDetail'),
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/goods-list',
    name: 'GoodsList',
    component: () => import('views/Goods/GoodsList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goods-video',
    name: 'GoodsVideo',
    component: () => import('views/Video/GoodsVideo'),
    meta: {
      requiresAuth: true
    }

  }
];
