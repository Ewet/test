const types = [0, 1, 2, 3, 4, 5, 6];

const getRoutes = () => types.map(x => ({
  path: `/my-work-order-${x}`,
  name: `MyWorkOrder_${x}`,
  component: () => import('views/workorder/MyWorkOrder')
}));

export default [
  {
    path: '/',
    redirect: '/my-work-order-0'
  },
  ...getRoutes()
];
