/**
 * 新闻单条记录查询
 */
import api from 'api';

export default params => api.post('/platform/website/website_news/info', params);
