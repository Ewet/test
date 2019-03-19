import apiGetSelectList from 'api/dictionary/get-SelectList';
import formatResult from 'model/formatResult';
// import formatItem from 'model/formatItem';
// import listResult from 'model/listResult';

// 数字字典
const getDictionary = async data => formatResult(await apiGetSelectList(data), x => ({
  enum_id: x.enum_id,
  enum_name: x.enum_name
}));
export {
  getDictionary
};
