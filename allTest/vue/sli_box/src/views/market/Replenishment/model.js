import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiGetRemark from './api/get-remark';

import formatResult from 'model/formatResult';
// import formatItem from './formatItem';
import listResult from 'model/listResult';

const getItem = async (id) => {
  const result = await apiGetItem({
    replenishment_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      replenishment_id: data.replenishment_id,
      boxNum: data.box_no,
      boxAddress: data.address,
      replenishmentTime: data.created_formatted,
      replenishmentName: data.replenishman_name,
      replenishmentPhone: data.mobile,
      items: data.items.map(d => ({
        goodsAreaNum: d.layer_no,
        operationType: d.detail_type_formatted,
        plantType: d.plan_type_formatted,
        operationTime: d.created_formatted,
        goodsChangeOld: d.old_goods_name,
        goodsChangeNew: d.new_goods_name,
        stockChangeOld: d.old_quantity,
        stockChangeNew: d.new_quantity,
        priceChangeOld: d.old_price,
        priceChangeNew: d.new_price,
        numberOfExceptions: d.number_of_exceptions,
        detailId: d.detail_id
      }))
    };
  }
  return formatResult(result);
};
// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  replenishment_id: x.replenishment_id,
  boxNum: x.box_no,
  merchantName: x.name,
  replenishmentTime: x.created_formatted,
  replenishmentName: x.replenishman_name
})));

// 补货记录查看备注
const getRemark = async (detailId) => {
  const result = await apiGetRemark({
    detail_id: detailId
  });
  result.data = result.data.items.map(x => ({
    exception: x.exception,
    fileUrl: x.file_url,
    remark: x.remark
  }));
  return formatResult(result);
};

export {
  getList,
  getItem,
  getRemark
};
