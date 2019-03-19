import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import formatResult from 'model/formatResult';
// import listResult from './listResult';
const convertTree = (source, leafCollection, expand = []) => source.map((x) => {
  // let isExpand = expand.some(h => {
  //   return h === x.gcate_id;
  // });
  // console.log(expand);
  const obj = {
    expand: expand.includes(x.gcate_id),
    gcateId: x.gcate_id,
    cateName: x.cate_name,
    parentId: x.parent_id
    // 'key': x.gcate_id,
    // 'name': x.cate_name
  };
    // console.log(obj, expand, expand.includes(x.gcate_id));
  if (x.children && x.children.length > 0) {
    obj.children = convertTree(x.children, leafCollection, expand);
  }
  leafCollection.push({ x, ...obj });
  return obj;
});
const getList = async (params) => {
  const result = await apiGetList(params);
  if (result.success) {
    const data = result.data;
    const leafCollection = [];
    const treeData = convertTree(data, leafCollection, params.expand.split(','));
    result.data = {
      treeData,
      leafCollection
    };
  }
  return formatResult(result);
};
const getCategoryOptions = async (params) => {
  const result = await apiGetList(params);
  if (result.success) {
    const data = result.data;
    const leafCollection = [];
    convertTree(data, leafCollection);
    result.data = leafCollection.map(x => ({
      name: x.cateName,
      value: x.gcateId
    }));
  }
  // console.log(result.data);
  return formatResult(result);
};
// const getList = async data => {
//   return formatResult(listResult(await apiGetList(data), (x) => {
//     return {
//       'gcateId': x.gcate_id,
//       'cateName': x.cate_name,
//       'parantId': x.parant_id,
//       'children': x.children.map(d => ({
//         'gcateId': d.gcate_id,
//         'cateName': d.cate_name,
//         'parantId': d.parant_id
//       }))
//     };
//   }));
// };
// const getList = async data => {
//   return formatResult(listResult(await apiGetList(data), (x) => {
//     return {
//       'gcateId': x.gcate_id,
//       'cateName': x.cate_name,
//       'parantId': x.parant_id,
//       'children': x.children.map(d => ({
//         'gcateId': d.gcate_id,
//         'cateName': d.cate_name,
//         'parantId': d.parant_id
//       }))
//     };
//   }));
// };
const getItem = async (id) => {
  const result = await apiGetItem({
    gcate_id: id
  });
  if (result.success) {
    result.data = {
      gcateId: result.data.gcate_id,
      cateName: result.data.cate_name,
      parentId: result.data.parent_id,
      parentName: result.data.parent_name
    };
  }
  // console.log(formatResult(result));
  return formatResult(result);
};
const addItem = async (params) => {
  const result = await apiAddItem(params);
  if (result.success) {
    const data = result.data;
    if (data) {
      result.data = {
        gcateId: data.gcate_id,
        cateName: data.cate_name,
        parentId: data.parent_id
      };
    }
  }
  return formatResult(result);
};
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async id => formatResult(await apiDelItem({
  gcate_id: id
}));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem,
  getCategoryOptions
};
