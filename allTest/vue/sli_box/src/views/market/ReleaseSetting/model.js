import apiGetCustomerServiceMsgSetting from './api/get-customerServiceMsgSetting';
import apiGetTemplateMsgSetting from './api/get-templateMsgSetting';
import apiSaveCustomerServiceMsgSetting from './api/save-customerServiceMsgSetting';
import apiSaveTemplateMsgSetting from './api/save-templateMsgSetting';
import apiSendMsg from './api/send-msg';
import apiGetMsgTemplateList from './api/get-msgTemplate-list.js';
import formatItem from 'model/formatItem';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
import apiGetImageList from './api/get-image-list';

const getCustomerServiceMsgSetting = async (data) => {
  const result = await apiGetCustomerServiceMsgSetting(data);
  if (result.success) {
    const { success, data, msg } = formatItem(result.data, data => ({
      title: data.csm_title,
      desc: data.csm_desc,
      link: data.csm_link,
      imgUrl: data.csm_pic_url,
      imgId: data.csm_pic_id
    }));
    if (success) {
      result.data = data;
    } else {
      result.success = false;
      result.msg = msg;
    }
  }
  return formatResult(result);
};
const getTemplateMsgSetting = async (data) => {
  const result = await apiGetTemplateMsgSetting(data);
  if (result.success) {
    const { success, data, msg } = formatItem(result.data, data => ({
      templateId: data.wxtm_template_id || '',
      messageHeader: data.wxtm_first || '',
      messageHeaderColor: data.wxtm_first_color || '',
      message1: data.wxtm_keyword1 || '',
      message1Color: data.wxtm_keyword1_color || '',
      message2: data.wxtm_keyword2 || '',
      message2Color: data.wxtm_keyword2_color || '',
      messageEnd: data.wxtm_remark || '',
      messageEndColor: data.wxtm_remark_color || '',
      link: data.wxtm_link || ''
    }));
    if (success) {
      result.data = data;
    } else {
      result.success = false;
      result.msg = msg;
    }
  }
  return formatResult(result);
};
const saveTemplateMsgSetting = data => formatResult(apiSaveTemplateMsgSetting(data));
const saveCustomerServiceMsgSetting = data => formatResult(apiSaveCustomerServiceMsgSetting(data));
const sendMsg = data => formatResult(apiSendMsg(data));

const getMsgTemplateList = async data => formatResult(listResult(await apiGetMsgTemplateList(data), x => ({
  templateId: x.template_id,
  desc: x.desc
})));

const getImageList = async data => formatResult(listResult(await apiGetImageList(data), x => ({
  id: x.file_id,
  name: x.filename,
  url: x.file_url
})));
export {
  getCustomerServiceMsgSetting,
  getTemplateMsgSetting,
  saveTemplateMsgSetting,
  saveCustomerServiceMsgSetting,
  sendMsg,
  getMsgTemplateList,
  getImageList
};
