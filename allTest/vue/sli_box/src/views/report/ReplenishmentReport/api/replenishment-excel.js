//
import api from 'api';

export default params => api.download('/boxserver/box/report/replenishment/get_excel', params);
