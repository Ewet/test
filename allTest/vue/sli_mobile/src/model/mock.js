import apiForgeryLogin from '@/api/mock/forgery-login';

const login = async () => {
  return apiForgeryLogin();
};

export {
  login
};
