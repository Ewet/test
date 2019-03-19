import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiDelItem from './api/del-item';
import apiAddItem from './api/add-item';
import apiUpdateItem from './api/update-item';
import apiGetQRCode from './api/get-qr-code';
import apiExportTable from './api/export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 盒子列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxNo: x.box_no,
  merchantName: x.merchant_name,
  boxType: x.type,
  boxTypeFormatted: x.type_formatted,
  // 'boxTypeFormatted': '默认类型',
  address: x.address,
  acceptanceDate: x.installed_time_formatted,
  status: x.status_formatted,
  id: x.box_id
  // 'qrCode': 'http://192.168.1.216/tomcat/boxserver/box/goods/qr_code?id=331713613621249535'
})));

const getItem = async (boxId) => {
  const result = await apiGetItem({
    box_id: boxId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      merchantName: data.merchant_name,
      merchantId: data.merchant_id,
      boxNo: data.box_no,
      address: data.address,
      lat: data.lat,
      boxType: data.type,
      lng: data.lng,
      acceptanceDate: data.installed_time,
      areaId: data.district_id,
      areaName: data.district_name,
      id: data.box_id
    };
  }
  return formatResult(result);
};
const delItem = async boxId => formatResult(await apiDelItem({
  box_id: boxId
}));
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const getQRCode = async (boxId) => {
  const result = await apiGetQRCode({
    box_id: boxId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      boxNo: data.box_no,
      url: data.url
    };
  }
  return formatResult(result);
};
const exportTable = (params) => {
  apiExportTable(params);
};

export {
  getList,
  getItem,
  delItem,
  addItem,
  updateItem,
  getQRCode,
  exportTable
};
