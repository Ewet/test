export default[{
  path: '/address-list',
  name: 'AddressList',
  component: () => import('./AddressList'),
  meta: { requiresAuth: false }
},
{
  path: '/address-edit',
  name: 'AddressEdit',
  component: () => import('./AddressEdit'),
  meta: { requiresAuth: false }
} ];
