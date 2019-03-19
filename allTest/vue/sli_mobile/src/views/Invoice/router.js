export default[
  {
    path: '/invoice',
    name: 'Invoice',
    component: () => import('./'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice-request',
    name: 'InvoiceRequest',
    component: () => import('./InvoiceRequest'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice-header-list',
    name: 'InvoiceHeaderList',
    component: () => import('./InvoiceHeaderList'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice-header-edit',
    name: 'InvoiceHeaderEdit',
    component: () => import('./InvoiceHeaderEdit'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice-detail',
    name: 'InvoiceDetail',
    component: () => import('./InvoiceDetail'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice-pdf',
    name: 'InvoicePDF',
    component: () => import('./InvoicePDF'),
    meta: { requiresAuth: true }
  }
];
