import apiGetOrderDetail from 'views/market/Order/api/get-order-detail';
import apiGetGoodsDetail from 'views/market/Order/api/get-goods-detail';
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiSetRead from './api/set-read';
import apiAddRemark from './api/add-remark';
import apiGetRemarkList from './api/get-remark-list';

import formatResult from 'model/formatResult';
import formatItem from 'model/formatItem';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxNo: x.box_no,
  wecharName: x.nickname,
  customerMobile: x.mobile,
  entryTime: x.entry_time_formatted,
  departureTime: x.departure_time_formatted,
  residenceTime: x.duration_minutes,
  hasOrder: x.is_order_exist_formatted,
  hasLocationChange: x.is_changed_exist_formatted,
  id: x.event_id,
  isReaded: x.is_read,
  inventoryChange: x.inventory_change,
  associatedOrder: x.order_sn
})));

const getItem = async (id) => {
  const result = await apiGetItem({
    event_id: id
  });
  if (result.success) {
    if (result.success) {
      const { success, data, msg } = formatItem(result.data, data => ({
        captureInterface: {
          items: data.file_list.map(e => ({
            name: `报像${e.camera}`,
            list: e.details.sort((m1, m2) => m1.correlation_time > m2.correlation_time).map(x => ({
              imgUrl: x.file_url,
              desc: x.correlation_time_formatted,
              id: x.file_id
            })),
            no: parseInt(e.camera) || 0
          })).sort((m1, m2) => m1.no > m2.no)
        },
        changeContrast: data.changed_sensors_format.map(x => ({
          layerNo: x.layer_no,
          rowNo: x.row_no,
          cellNo: x.cell_no,
          before: x.before,
          after: x.after
        })),
        orderList: data.order_list.map(m => ({
          id: m.order_id,
          merchantName: m.s,
          boxNum: m.store_id,
          orderNum: m.order_sn,
          orderTime: m.create_time_formatted,
          orderType: m.order_type_formatted ? m.order_type_formatted : '---',
          orderTotal: m.order_total,
          status: m.pay_status_formatted,
          orderSn: m.order_sn
        })),
        inventoryChange: data.inventory_logList.map(g => ({
          cargoArea: g.layer_no,
          initialStock: g.from,
          leavingStock: g.to,
          time: g.created_formatted
        })),
        customerServiceNote: data.remarkList.map(g => ({
          operator: g.work_name,
          content: g.remark,
          time: g.create_time_formatted
        })),
        isRead: !!data.is_read,
        boxNo: data.box.box_no
      }));
      if (success) {
        result.data = data;
      } else {
        result.success = false;
        result.msg = msg;
      }
    }
  }
  return formatResult(result);
};
// 订单详情
const getOrderDetail = async (orderId) => {
  const result = await apiGetOrderDetail({
    order_id: orderId
  });
  if (result.success) {
    const x = result.data;
    result.data = {
      orderId: x.order_id,
      createTime: x.create_time_formatted,
      willReceive: x.will_receive,
      realReceive: x.real_receive,
      shipStatus: x.ship_status_formatted,
      payMode: x.pay_mode_formatted,
      payTime: x.pay_time_formatted,
      nickName: x.nickname,
      mobile: x.mobile,
      couponDeduction: x.coupon_deduction,
      randomDeduction: x.random_deduction
    };
    const { success, data } = await getGoodsDetail(orderId);
    if (success) {
      result.data.goods = data;
    }
  }
  return formatResult(result);
};
// 订单商品详情
const getGoodsDetail = async (orderId) => {
  const result = await apiGetGoodsDetail({ order_id: orderId });
  let items = result.data;
  if (items) {
    try {
      items = items.map(x => ({
        goodsName: x.goods_name,
        quantity: x.quantity,
        price: x.price
      }));
      result.data = items;
    } catch (e) {
      result.data = [];
      result.success = false;
      result.msg = '，API数据结构错误！';
    }
  }
  return formatResult(result);
};

const changeRead = async data => formatResult(await apiSetRead(data));
const addRemark = async data => formatResult(await apiAddRemark(data));

const getRemarkList = async (data) => {
  const result = await apiGetRemarkList(data);
  if (result.success) {
    result.data = result.data.map(x => ({
      operator: x.work_name,
      content: x.remark,
      time: x.create_time_formatted
    }));
  }
  return formatResult(result);
};

export {
  getList,
  getItem,
  getOrderDetail,
  getGoodsDetail,
  changeRead,
  addRemark,
  getRemarkList
};
