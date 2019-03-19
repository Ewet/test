/**
 * 提现方式枚举
 */
import api from 'api';

export default params => api.post('/platform/common/dictionary/info', { param_key: 'plf_distribution_withdraw_account_mode' });
