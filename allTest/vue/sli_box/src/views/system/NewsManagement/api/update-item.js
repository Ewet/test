/**
 * 新闻记录更新
 */
import api from 'api';

export default params => api.post('/platform/website/website_news/modify', params);
