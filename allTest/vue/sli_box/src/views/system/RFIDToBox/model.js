import apiGetList from './api/get-list';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  RFIDIdentification: x.rfid_no, // RFID标识
  goodName: x.goods_name, // 商品名称
  bomSn: x.bom_code, // bom码
  boxNo: x.box_no, // 盒子编号
  state: x.status_formatted, // //出售状态 0:已售  1：在售
  enterLibraryTime: x.checkin_time_formatted, // 入库时间
  outLibraryTime: x.checkout_time_formatted, // 出库时间
  cellClassName: {
    state: x.status === 0 ? 'red' : ''
  }
})));

export {
  getList
};
