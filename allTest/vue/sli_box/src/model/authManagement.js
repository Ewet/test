import apiGetConfig from 'api/authManagement/get-config';
import apiGetMenu from 'api/authManagement/get-menu';
import formatResult from 'model/formatResult';
import { setMenu, getMenu as getMenuData } from 'utils/apiCache';

const convertTree = (source, leafCollection) => source.map((x) => {
  const obj = {
    key: x.id,
    title: x.name
  };
  if (x.children && x.children.length > 0) {
    obj.children = convertTree(x.children, leafCollection);
  } else {
    leafCollection.push({ ...obj, desc: x.notes });
  }
  return obj;
});

const convertMenu = (source, map, parentIndex) => source.map((x, index) => {
  const obj = {
    name: x.name,
    routerName: x.routerName || '',
    url: x.resUrl || '',
    ignore: !!x.ignore
  };
  if (x.routerName === 'workorder.html') {
    x.children = getWorkOrderMenu();
  }
  // 存在父级则非顶级目录
  if (x.fatherId && x.children.length === 0) {
    obj.parentIndex = parentIndex;
  }
  if (x.routerName) {
    map[x.routerName] = obj;
  }
  if (x.children && x.children.length > 0) {
    obj.items = convertMenu(x.children, map, index);
  }
  return obj;
});

const getMenu = async (moduleId) => {
  let result = getMenuData();
  if (result === null) {
    result = await apiGetMenu();
    if (result.success) {
      const data = result.data;
      const map = {};
      const menu = convertMenu(data, map).filter(x => x.items && x.items.length > 0);
      // console.log(menu);
      result.data = {
        menu, // convertMenu(data, map).filter(x => x.items.length === 0),
        map
      };
      setMenu(result);
    }
  }
  return formatResult(result);
};

const getConfig = async (params) => {
  const result = await apiGetConfig(params);
  if (result.success) {
    const data = result.data;
    const leafCollection = [];
    const treeData = convertTree(data, leafCollection);
    result.data = {
      treeData,
      leafCollection
    };
  }
  return formatResult(result);
};

const getId = () => {
  let index = 0;
  return () => (+new Date() + (++index)).toString();
};

const getWorkOrderMenu = () => [{
  name: '我的工单',
  id: getId(),
  children: [{
    name: '全部',
    id: getId(),
    routerName: 'MyWorkOrder_0',
    ignore: true
  }, {
    name: '我创建的',
    id: getId(),
    routerName: 'MyWorkOrder_1'
  },
  {
    name: '待我处理的',
    id: getId(),
    routerName: 'MyWorkOrder_2'
  }],
  routerName: ''
}, {
  name: '未解决工单',
  id: getId(),
  children: [{
    name: '待指派的',
    id: getId(),
    routerName: 'MyWorkOrder_3'
  },
  {
    name: '处理中',
    id: getId(),
    routerName: 'MyWorkOrder_4'
  }],
  routerName: ''
}, {
  name: '已完成工单',
  id: getId(),
  children: [{
    name: '已解决',
    id: getId(),
    routerName: 'MyWorkOrder_5'
  },
  {
    name: '不需解决',
    id: getId(),
    routerName: 'MyWorkOrder_6'
  }],
  routerName: ''
}];

export {
  getConfig,
  getMenu
};
