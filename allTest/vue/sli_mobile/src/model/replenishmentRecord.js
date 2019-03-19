/**
 * 补货记录
 */
import apiGetListBox from '@/api/replenishmentRecord/get-list';
import apiGetInfo from '@/api/replenishmentRecord/get-info';
import apiReplenishment from '@/api/replenishmentRecord/replenishment';
import apiCollate from '@/api/replenishmentRecord/collate';
import listResultModel from './listResultModel';
import formatResult from './formatResult';

// 补货的盒子列表
const getListBox = async (data) => {
  let result = await apiGetListBox(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'address': item.address, // 地址,
      'boxNo': item.box_no, // 盒子编号
      'time': item.created_formatted, // 创建时间
      'boxId': item.box_id, // 盒子id
      'id': item.replenishment_id// 补货记录id
    };
  }));
};

// 补货/理货
const getInfo = async (data) => {
  let result = await apiGetInfo(data);
  if (result.success) {
    let data = result.data;
    result.data = data.map(item => {
      let status = item.status;
      if (status === 1) { // 上新
        if (item.old_goods_id === '-1') {
          return {
            'position': item.layer_no, /// /货区编号
            'imgUrl': item.new_pic, // 商品图片
            'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
            'name': item.new_goods_name, // 商品名称
            'before': null, // 补货前
            'after': item.new_quantity, // 补货后
            'price': item.new_price, // 价格
            'state': item.status_format,
            'itemList': []
          };
        } else {
          return {
            'position': item.layer_no, /// /货区编号
            'state': item.status_format,
            itemList: [
              {
                'imgUrl': item.new_pic, // 商品图片
                'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
                'name': item.new_goods_name, // 商品名称
                'before': null, // 补货前
                'after': item.new_quantity, // 补货后
                'price': item.new_price, // 价格
                'state': '上新'
              },
              {
                'position': item.layer_no, /// /货区编号
                'imgUrl': item.old_pic, // 商品图片
                'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
                'name': item.old_goods_name, // 商品名称
                'before': item.old_quantity, // 补货前
                'after': null, // 补货后
                'price': item.old_price, // 价格
                'state': '下架'
              }
            ]
          };
        }
      } else if (status === 2) { // 调价
        return {
          'position': item.layer_no, /// /货区编号
          'imgUrl': item.new_pic, // 商品图片
          'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
          'name': item.new_goods_name, // 商品名称
          'before': item.old_quantity, // 补货前
          'after': item.new_quantity, // 补货后
          'price': item.new_price, // 价格
          'state': item.status_format
        };
      } else if (status === 3) { // 下架
        return {
          'position': item.layer_no, /// /货区编号
          'imgUrl': item.old_pic, // 商品图片
          'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
          'name': item.old_goods_name, // 商品名称
          'before': item.old_quantity, // 补货前
          'after': null, // 补货后
          'price': item.old_price, // 价格
          'state': item.status_format
        };
      } else if (status === 4) { // 理货
        return {
          'position': item.layer_no, /// /货区编号
          'imgUrl': item.new_pic, // 商品图片
          'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
          'name': item.new_goods_name, // 商品名称
          'before': item.old_quantity, // 补货前
          'after': item.new_quantity, // 补货后
          'price': item.new_price, // 价格
          'state': item.status_format
        };
      } else if (status === 5) { // 补货
        return {
          'position': item.layer_no, /// /货区编号
          'imgUrl': item.new_pic, // 商品图片
          'planType': item.planType, // 计划类型(1-上新,2-调价,3-下架)
          'name': item.new_goods_name, // 商品名称
          'before': item.old_quantity, // 补货前
          'after': item.new_quantity, // 补货后
          'price': item.new_price, // 价格
          'state': item.status_format
        };
      }
    });
  }
  return formatResult(result);
};

// 我要补货
const replenishment = async (params) => {
  return formatResult(await apiReplenishment(params));
};

// 我要理货
const collate = async (params) => {
  return formatResult(await apiCollate(params));
};

export {
  getListBox,
  getInfo,
  replenishment,
  collate
};
