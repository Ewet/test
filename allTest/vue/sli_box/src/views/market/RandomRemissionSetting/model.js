import apiUpdateItem from './api/save';
import apiGetItem from './api/get';
import formatResult from 'model/formatResult';

const get = async () => {
  const result = await apiGetItem();
  if (result.success) {
    const data = result.data;
    result.data = {
      validDay: data.valid_day,
      status: data.status,
      useNumber: data.use_number
    };
  }
  return formatResult(result);
};

const update = async (data) => {
  const result = await apiUpdateItem(data);
  return formatResult(result);
};
export {
  update,
  get
};
