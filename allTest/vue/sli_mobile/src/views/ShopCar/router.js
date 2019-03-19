export default[
  {
    path: '/shop-car',
    name: 'ShopCar',
    component: () => import('views/ShopCar'),
    meta: { requiresAuth: true }
  }
];
