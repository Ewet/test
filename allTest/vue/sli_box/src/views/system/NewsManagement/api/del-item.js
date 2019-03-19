/**
 * 新闻记录删除
 */
import api from 'api';

export default params => api.post('/platform/website/website_news/delete', params);
