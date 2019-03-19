/**
 * 新闻列表查询
 */
import api from 'api';

export default params => api.post('/platform/website/website_news/list', params);
