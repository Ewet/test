/**
 * 获取枚举
 */
import api from 'api';

export default enumKey => api.post('/platform/common/dictionary/info', { param_key: enumKey });
