/**
 * 新闻记录新增
 */
import api from 'api';

export default params => api.post('/platform/website/website_news/create', params);
