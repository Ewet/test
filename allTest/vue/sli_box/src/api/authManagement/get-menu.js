/**
 * 获取权限菜单
 */
import api from 'api';

export default params => api.post('/boxserver/auth/auth_resources/menu', params, {
  mock: false
});
