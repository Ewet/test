import api from 'api';

export default params => api.post('/boxserver/auth/employee_role_area_relation/batchUpdateRelation',
  params,
  {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
