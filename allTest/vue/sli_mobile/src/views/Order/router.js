export default [{
  path: '/order-list',
  name: 'OrderList',
  // component: () => import('views/OrderOld/OrderList'),
  component: () => import('views/Order'),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/order-detail',
  name: 'OrderDetail',
  component: () => import('views/OrderDetail'),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/generate-order',
  name: 'GenerateOrder',
  component: () => import('views/GenerateOrder'),
  meta: {
    requiresAuth: true
  }
}
];
