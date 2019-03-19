/**
 * 成为下线的条件枚举
 */
import api from 'api';

export default params => api.post('/platform/common/dictionary/info', { param_key: 'plf_distribution_cfg_tobe_subordinate' });
