/**
 * 微信抽奖-中奖纪录-导出表格
 */
import api from 'api';

export default params => api.download('/platform/winningRecord/get_excel', params);
