export default [ {
  path: '/password-setting',
  name: 'PasswordSetting',
  component: () => import('./PasswordReset'),
  meta: { requiresAuth: false }
},
{
  path: '/password-reset',
  name: 'PasswordReset',
  component: () => import('./PasswordSetting'),
  meta: { requiresAuth: false }
} ];
