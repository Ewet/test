export default [{
  path: '/user-login',
  name: 'UserLogin',
  component: () => import('views/User/Login'),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/logout',
  name: 'UserLogout',
  component: () => import('views/User/Logout'),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/user-register',
  name: 'UserRegister',
  component: () => import('views/User/Register'),
  meta: {
    requiresAuth: true
  }
}];
