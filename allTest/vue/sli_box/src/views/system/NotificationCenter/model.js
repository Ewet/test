
import apiGetList from './api/get-list';
import apiGetItem from './api/review_remark';
import apiUpdateItem from './api/submit_remark';
import apiGetMyMessage from 'views/system/MyMessage/api/get-list';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 列表
const getList = async (data) => {
  // console.log(data, data.isMine === '1');
  const fetch = data.isMine === '1' ? apiGetMyMessage : apiGetList;
  return formatResult(listResult(await fetch(data), x => ({
    messageId: x.message_id, // 消息Id
    orderSn: x.order_sn, // 订单sn
    noticeDate: x.created_time_formatted, // 日期
    orderType: x.order_type, // 订单类型
    orderTypeFormatted: x.order_type_formatted, // 订单类型
    noticeType: x.message_type, // 通知类型
    noticeTypeFormatted: x.message_type_formatted, // 通知类型
    boxNo: x.box_no, // 盒子编号
    noticeContent: x.content, // 通知内容
    isHandled: x.is_handled, // 状态
    isHandledFormatted: x.is_handled_formatted, // 状态
    adminId: x.admin_id, // 处理人
    processingPerson: x.name // 处理人
    // 'cellClassName': {
    //   noticeContent: 'skyblue'
    // }
  })));
};
const getItem = async (id) => {
  const result = await apiGetItem({
    message_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      remark: data.remark // 备注
    };
  }
  return formatResult(result);
};

const updateItem = async params => formatResult(await apiUpdateItem(params));
export {
  getList,
  getItem,
  updateItem
};
