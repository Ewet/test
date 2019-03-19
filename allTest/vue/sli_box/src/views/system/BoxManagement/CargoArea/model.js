
// 货区、货位
import apiGetList from './api/get-list';
// import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import apiGetEditInfo from './api/edit-item-info';
import apiGetAddInfo from './api/add-item-info';

import formatResult from 'model/formatResult';
// import listResult from 'model/listResult';

// 货区-货位通道管理start
const getList = async (boxId) => {
  const result = await apiGetList({
    box_id: boxId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      boxId,
      items: data.map(x => ({
        cargoAreaNo: x.layer_no, // 货区编号
        cargoAreaQuantity: x.number_of_cells,
        // 'boxId': x.box_id,
        layerId: x.layer_id // 货区id
      }))
    };
  }
  return formatResult(result);
};
// const getItem = async layerId => {
//   let result = await apiGetItem({
//     layer_id: layerId
//   });
//   if (result.success) {
//     let data = result.data;
//     result.data = {
//     };
//   }
//   return formatResult(result);
// };
const addItem = async params => formatResult(await apiAddItem(params));
const delItem = async layerId => formatResult(await apiDelItem({
  layer_id: layerId
}));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const getEditInfo = async (layerId) => {
  const result = await apiGetEditInfo({
    layer_id: layerId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      layerNo: data.layer_no, // 货区编号
      boxId: data.box_id,
      masterControro: data.masterControro.map(a => ({
        ipAddress: a.ip_address,
        // 采集板
        cjbData: a.mcb.map(x => ({
          acquisitionNo: x.acquisition_no, // 采集板编号
          isSelectMultiple: false,
          jsbData: x.extension.map(y => ({
            extensionNo: y.extension_no, // 扩展板编号
            channelData: y.channel.map(z => ({
              channelId: z.channel_id, // 通道id
              channelNo: z.channel_no, // 通道编号
              isUsed: z.is_used, // 是否被使用
              sensorType: z.sensor_type, // 传感器类型
              sensorTypeFormatted: z.sensor_type_formatted, // 传感器类型formatted
              isDisable: z.read_only // 能否编辑
            }))
          }))
        }))
      }))
    };
  }

  return formatResult(result);
};
const getAddInfo = async (boxId) => {
  const result = await apiGetAddInfo({
    box_id: boxId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      boxId: data.box_id,
      masterControro: data.masterControro.map(a => ({
        ipAddress: a.ip_address,
        // 采集板
        cjbData: a.mcb.map(x => ({
          acquisitionNo: x.acquisition_no, // 采集板编号
          isSelectMultiple: false,
          jsbData: x.extension.map(y => ({
            extensionNo: y.extension_no, // 扩展板编号
            channelData: y.channel.map(z => ({
              channelId: z.channel_id, // 通道id
              channelNo: z.channel_no, // 通道编号
              isUsed: z.is_used, // 是否被使用
              sensorType: z.sensor_type, // 传感器类型
              sensorTypeFormatted: z.sensor_type_formatted, // 传感器类型formatted
              isDisable: z.read_only // 能否编辑
            }))
          }))
        }))
      }))
    };
  }
  return formatResult(result);
};
// 货区-货位通道管理end

export {
  getList,
  // getItem,
  addItem,
  delItem,
  updateItem,
  getEditInfo,
  getAddInfo
};
