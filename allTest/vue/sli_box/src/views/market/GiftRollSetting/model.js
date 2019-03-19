import apiGetList from './api/get-list';
import apiSaveItem from './api/save-item';
import apiGetItem from './api/get-item';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  id: x.scheme_id,
  name: x.name,
  openEvent: x.scheme_switch,
  hasDeadline: x.time_switch,
  activeTime: x.time_switch === '1' ? [x.start_time_formatted, x.end_time_formatted] : [],
  coupon: x.coupon.map(g => ({
    name: g.name,
    id: g.coupon_id,
    count: g.count
  }))
})));
const getItem = async (id) => {
  const result = await apiGetItem({
    rule_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      levelName: data.name,
      level: data.level,
      proportion: data.proportion,
      activeTime: data.active_time_formatted,
      id: data.rule_id,
      toplimit: data.toplimit,
      isdefault: data.is_default,
      isdefaultformatted: data.is_default_formatted
    };
  }
  return formatResult(result);
};

const saveItem = async (data) => {
  const result = await apiSaveItem(data);
  return formatResult(result);
};

export {
  getList,
  saveItem,
  getItem
};
