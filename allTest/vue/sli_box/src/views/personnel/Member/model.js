import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiGetPresupposeMember from './api/get-presuppose-member';
import apiCreateMember from './api/create-member';
import apiGetTypeList from './api/get-type-list-enum';
import apiExportReport from './api/export-report';

import formatResult from 'model/formatResult';
// import formatItem from 'model/formatItem';
import listResult from 'model/listResult';

const getItem = async (id) => {
  const result = await apiGetItem({
    user_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      memberIcon: data.avatar,
      memberId: data.user_id,
      memberName: data.nickname,
      phone: data.mobile
    };
  }
  return formatResult(result);
};
// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  memberName: x.nickname,
  memberId: x.user_id,
  boxNum: x.box_no,
  registerTime: x.created_time_formatted,
  typeFormatted: x.type_formatted,
  phone: x.mobile
})));

const getPresupposeMember = async (data) => {
  const result = await apiGetPresupposeMember(data);
  if (result.success) {
    result.data = result.data.map(d => ({
      from: d.from_type,
      key: d.type_key,
      name: d.type_name
    }));
  }
  return formatResult(result);
};

// 新增资格
const createMember = data => formatResult(apiCreateMember(data));

const getTypeList = async (data) => {
  const result = await apiGetTypeList(data);
  if (result.success) {
    result.data = result.data.map(x => ({
      name: x.type_name,
      value: x.type_key
    }));
  }
  return formatResult(result);
};

// 导出
const reportExport = async (data) => {
  console.log(data);
  apiExportReport(data);
};

export {
  getList,
  getItem,
  getPresupposeMember,
  createMember,
  getTypeList,
  reportExport
};
