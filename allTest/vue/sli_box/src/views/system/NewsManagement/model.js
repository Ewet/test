import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
import { formatTime } from 'utils/date';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  createTime: x.create_time_formatted, // 创建时间
  openDate: x.publish_date_formatted, // 公开日期
  title: x.title, // 标题
  picture: x.image, // 主图
  guideReading: x.column_name, // 导读
  id: x.website_news_id // 新闻ID
})));
const getItem = async (Id) => {
  const result = await apiGetItem({
    website_news_id: Id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      id: data.website_news_id, // 新闻ID
      updateDate: data.updated_date_formatted, // 更新日期
      publishDate: formatTime(data.publish_date * 1000), // 公开日期
      title: data.title, // 标题
      picture: data.image, // 主图
      imgId: data.img_file_id, // 主图Id
      guideReading: data.column_name, // 导读
      content: data.content // 内容
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async id => formatResult(await apiDelItem({
  website_news_id: id
}));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem
};
