/**
 * 提现明细模型
 */

import apiWithdrawDetail from '@/api/distribution/withdraw-detail-list';
import { orderBy, findIndex } from 'lodash';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
import fecha from 'fecha';

const getList = async (data) => {
  let result = await apiWithdrawDetail(data);
  let dateAmount = result.data.date_amount;
  result = listResultModel(result);
  let group = [];
  if (result.success) {
    let data = result.data;
    data.items.forEach(e => {
      let createTime = e.create_time_formatted;
      let statusFormatted = e.status_formatted;
      let modeFormatted = e.account.mode_formatted;
      let amount = e.real_amount;
      let tmp = new Date(createTime.replace(/-/g, '/'));
      let title = fecha.format(tmp, 'YYYY年MM月');
      let key = fecha.format(tmp, 'YYYY-MM');
      let index = findIndex(group, (x) => x.key === key);
      let withdrawType = e.withdraw_type_formatted;
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
          key
        });
        index = group.length - 1;
      }
      group[index].items.push({
        modeFormatted,
        createTime,
        amount,
        statusFormatted,
        sortKey: tmp.getTime(),
        withdrawType
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
  getList
};
