/**
 * 奖励金模型
 */

import apiCommissionAvailable from '@/api/distribution/commission-available';
import apiCommissionHome from '@/api/distribution/commission-home';
import apiCommissionWithdraw from '@/api/distribution/commission-withdraw';
import apiCommissionList from '@/api/distribution/commission-list';
import { orderBy, findIndex } from 'lodash';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
import fecha from 'fecha';
const getCommissionAvailable = async (data) => {
  let result = await apiCommissionAvailable(data);
  return formatResult(result);
};

const getCommissionHome = async (data) => {
  let result = await apiCommissionHome(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'activeCommission': data.active_commission.toString(), // 可提取奖励金
      'totalCommission': data.total_commission.toString(), // 累计奖励金
      'applyCommission': data.apply_commission.toString(), // 申请中的奖励金
      'waitgrantCommission': data.wait_grant_commission.toString(), // 待打款奖励金
      'unsettleCommission': data.unsettle_commission.toString(), // 未结算奖励金
      'withdrawCommission': data.withdraw_commission.toString()
    };
  }
  return formatResult(result);
};

const getCommissionWithdraw = async (data) => {
  let result = await apiCommissionWithdraw(data);
  return formatResult(result);
};

const getCommissionList = async (data) => {
  let result = await apiCommissionList(data);
  let dateAmount = result.data.date_commission;
  result = listResultModel(result);
  let group = [];
  if (result.success) {
    let data = result.data;
    data.items.forEach(e => {
      let createTime = e.create_time_formatted;
      let isSettle = e.status === '1' ? e.is_settle_formatted : e.status_formatted;
      let subTitle = e.type_formatted || 1;
      let commission = e.amount;
      let tmp = new Date(createTime.replace(/-/g, '/'));
      let title = fecha.format(tmp, 'YYYY年MM月');
      let key = fecha.format(tmp, 'YYYY-MM');
      let index = findIndex(group, (x) => x.key === key);
      // 显示当月
      let curdate = new Date();
      let y1 = tmp.getFullYear();
      let m1 = tmp.getMonth();
      let y2 = curdate.getFullYear();
      let m2 = curdate.getMonth();
      if (y1 === y2 && m1 === m2) {
        title = '当月';
      }
      if (index === -1) {
        group.push({
          'name': title,
          'fixed': false,
          'items': [],
          'sortKey': `${tmp.getFullYear()}${tmp.getMonth() + 1 > 9 ? tmp.getMonth() + 1 : '0' + tmp.getMonth() + 1}`,
          'total': 0,
          'key': key
        });
        index = group.length - 1;
      }
      // 组合计
      group[index].total += commission;
      group[index].items.push({
        subTitle,
        createTime,
        'content': '平台销售活动奖励',
        commission,
        isSettle,
        sortKey: tmp.getTime()
      });
    });
    // 内部排序
    group.forEach(x => {
      if (dateAmount[x.key] !== undefined) {
        x.total = dateAmount[x.key].toFixed(2);
      }
      x.items = orderBy(x.items, ['sortKey'], ['desc']);
    });
    // 组排序
    let arr = orderBy(group, ['sortKey'], ['desc']);
    result.data.items = arr;
  }
  // result.data.items = [];
  // result.data.hasMore = false;
  return formatResult(result);
};

export {
  getCommissionAvailable,
  getCommissionHome,
  getCommissionWithdraw,
  getCommissionList
};
