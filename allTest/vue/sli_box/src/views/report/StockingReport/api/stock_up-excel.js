//
import api from 'api';

export default params => api.download('/boxserver/box/report/stock_up/get_excel', params);
