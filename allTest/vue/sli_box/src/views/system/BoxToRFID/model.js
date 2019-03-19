import apiGetList from './api/get-list';
import apiGetQuantityList from './api/quantity-list';
import apiGetRfidDetails from './api/rfid-details';
import formatResult from 'model/formatResult';
// import formatItem from './formatItem';
import listResult from 'model/listResult';
// 地区
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxId: x.box_id,
  boxNo: x.box_no,
  quantity: x.quality
})));
const getRfidDetails = async (data) => {
  const result = await apiGetRfidDetails(data);
  if (result.success) {
    const data = result.data;
    result.data = {
      items: data.items.map(x => ({
        goodsId: x.goods_id,
        goodsName: x.goods_name,
        gcateName: x.cate_name,
        bom: x.barcode,
        marketPrice: x.market_price_formatted,
        suggestPrice: x.suggest_price_formatted,
        quantity: x.quality
      }))

    };
  }
  return formatResult(result);
};
const getQuantityList = async (data) => {
  const result = await apiGetQuantityList(data);
  if (result.success) {
    const data = result.data;
    result.data = {
      items: data.items.map(x => ({
        RFID: x.rfid_no,
        gcateName: x.goods_name,
        addedTimeFormatted: x.checkin_time_formatted,
        replenisher: x.name
      }))

    };
  }
  return formatResult(result);
};

export {
  getList,
  getRfidDetails,
  getQuantityList
};
