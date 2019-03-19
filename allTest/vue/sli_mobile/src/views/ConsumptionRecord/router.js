export default[{
  path: '/consumption-record-list',
  name: 'ConsumptionRecordList',
  component: () => import('./ConsumptionRecordList'),
  meta: { requiresAuth: false }
}];
