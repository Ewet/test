/**
 * 我的下线模型
 */
import apiSubordinate from '@/api/distribution/subordinate';
import listResultModel from './listResultModel';
import formatResult from './formatResult';

const getList = async (data) => {
  let result = await apiSubordinate(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'avatar': item.avatar, // 头像
      'mobile': 'ID ' + item.nickname, // ID账号,
      'gender': item.gender,
      'contributed': item.contributed
    };
  }));
};

export {
  getList
};
