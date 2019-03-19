import apiGetList from '@/api/exceptionHandling/get-list';
import apiExceptions from '@/api/exceptionHandling/exceptions';
// import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
const getList = async (data) => {
  let result = await apiGetList(data);
  if (result.success) {
    let data = result.data;
    result.data = data.map(item => {
      return {
        'detailId': item.detail_id, // 异常详情ID
        'layerNo': item.layer_no, // 货区编号
        'numberOfExceptions': item.number_of_exceptions // 异常数
      };
    });
  }
  console.log(formatResult(result));
  return formatResult(result);
};

// 理货-异常提交
const submitExceptions = async (params) => {
  return formatResult(await apiExceptions(params));
};

export {
  getList,
  submitExceptions
};
