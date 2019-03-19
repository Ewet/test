/**
 * 积分明细模型
 */

import apiGetList from '@/api/distribution/credit-list';
import { orderBy, findIndex } from 'lodash';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
import fecha from 'fecha';

const getList = async (data) => {
  let result = await apiGetList(data);
  result = listResultModel(result);
  let group = [];
  if (result.success) {
    let data = result.data;
    data.items.forEach(e => {
      let createTime = e.create_time_formatted;
      let statusFormatted = e.status_formatted;
      let fromType = e.from_type_formatted;
      let credit = e.credit;
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
          'unionKey': newGuid(),
          key
        });
        index = group.length - 1;
      }
      group[index].items.push({
        createTime,
        credit,
        statusFormatted,
        fromType,
        sortKey: tmp.getTime()
      });
    });
    // 内部排序
    group.forEach(x => {
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

const newGuid = () => {
  var guid = '';
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { guid += '-'; }
  }
  return guid;
};
export {
  getList
};
