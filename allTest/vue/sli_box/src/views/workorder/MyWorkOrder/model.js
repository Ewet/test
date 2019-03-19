import apiGetList from './api/get-list';
import apiGetBadge from './api/get-badge';
import apiGetCommunicateInfo from './api/get-communicate-info';
import apiGetItem from './api/get-item';
import apiExportOrder from './api/export-order';
import apiDelItem from './api/del-item';
import apiAddItem from './api/add-item';
import apiGetDept from './api/dept';
import apiUpdateItem from './api/update-item';
import apiWorkOrderProcessing from './api/operating';
import apiDownload from './api/download';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  id: x.ticket_id,
  orderNumber: x.ticket_no,
  orderContent: x.content,
  orderDepartment: x.auth_department_name,
  // 'orderType': x.orderType,
  submitter: x.work_name,
  Assignor: x.handler,
  assignTime: x.create_time_formatted,
  updateTime: x.update_time_formatted,
  closingTime: x.end_time_formatted,
  status: x.status_formatted
})));
// 获取徽标
const getBadge = async (data) => {
  const result = await apiGetBadge();
  return formatResult(result);
};

// 沟通详情
const getCommunicateInfo = async (params) => {
  const result = await apiGetCommunicateInfo(params);
  if (result.success) {
    const record = result.data.record;
    const filesRecord = result.data.record.files;
    const replies = result.data.replies;
    const operationType = result.data.record.operation_type;
    const deptEmp = result.data.dept_emp ? result.data.dept_emp : [];
    const deptEmpReply = result.data.dept_emp_reply ? result.data.dept_emp_reply : [];

    result.data.record.operation_type = operationType.map(x => ({
      label: x.status_formatted,
      value: x.status
    }));

    // 工单详情文件
    if (filesRecord) {
      result.data.record.files = filesRecord.map(x => ({
        fileId: x.file_id, // 文件Id
        fileName: x.filename, // 文件名
        fileUrl: x.fileurl // 文件地址
      }));
    } else {
      result.data.record.files = [];
    }

    // 工单详情
    result.data.record = {
      content: record.content, // 工单内容
      handler: record.handler_name, // 指派给
      ticketNo: record.ticket_no, // 工单编号
      name: record.assigner_name, // 工单提交人
      updateTime: record.update_time, // 提交时间
      endTime: record.end_time, // 截止时间
      priority: record.priority, // 优先级
      priorityFormatted: record.priority_formatted, // 优先级枚举
      status: record.status, // 工单状态  0-待分配 1-待确认 2-处理中 3-待验收 4-待关闭 5-已关闭
      statusFormatted: record.status_formatted, // 工单状态枚举
      isMe: record.is_me, // //0:表示不是登陆者创建的工单 1：表示是登陆者创建的工单
      files: record.files, // 附件
      operationType: record.operation_type // 操作
    };

    // 沟通详情
    result.data.replies = replies.map((x) => {
      const files = x.files;
      if (files) {
        x.files = files.map(x => ({
          fileId: x.file_id, // 文件Id
          fileName: x.filename, // 文件名
          fileUrl: x.fileurl // 文件地址
        }));
      } else {
        x.files = [];
      }
      return {
        assignedName: x.assigned_name, // 当前评论人姓名
        handlerName: x.handler_name, // 指派给
        assignedHandlerTalk: x.assigned_handler_talk, // "客服一 将工单指派给 客服二："
        identity: x.identity, // 操作类型 0-回复 1-指派 2-不需处理
        createTime: x.create_time, // 提交时间
        ticketFileId: x.ticket_file_id, // 文件file_id
        ticketFileMap: x.ticket_file_map,
        ticketContent: x.ticket_content, // 文件内容
        files: x.files, // 附件
        isMe: x.is_me // 0-不是当前登录者的回复 1-当前登录者的回复
      };
    });

    // 回复以外指定的人
    result.data.dept_emp = deptEmp.map(x => ({
      deptId: x.auth_department_id, // 部门ID
      dept: x.auth_department_name, // 部门
      emps: x.emps
    }));

    // 回复指定的人
    result.data.dept_emp_reply = deptEmpReply.map(x => ({
      deptId: x.auth_department_id, // 部门ID
      dept: x.auth_department_name, // 部门
      emps: x.emps
    }));
  }
  return formatResult(result);
};

// 工单详情
const getItem = async (params) => {
  const result = await apiGetItem(params);
  if (result.success) {
    const record = result.data.record;
    const deptEmp = result.data.dept_emp;
    const files = result.data.files;
    // 工单详情
    result.data.record = {
      content: record.content, // 工单内容
      handler: record.handler, // 指派给Id
      handlerName: record.handler_name, // 指派给
      ticketNo: record.ticket_no, // 工单编号
      name: record.name, // 工单提交人
      updateTime: record.update_time, // 提交时间
      endTime: record.end_time, // 截止时间
      priority: record.priority, // 优先级
      priorityFormatted: record.priority_formatted, // 优先级枚举 0：一般 1：紧急
      status: record.status, // 工单状态  0-待分配 1-待确认 2-处理中 3-待验收 4-待关闭 5-已关闭
      statusFormatted: record.status_formatted, // 工单状态枚举
      authDepartmentId: record.auth_department_id,
      authDepartmentName: record.auth_department_name
    };

    // 文件
    result.data.files = files.map(x => ({
      file_id: x.file_id, // 文件Id
      name: x.filename, // 文件名
      file_url: x.fileurl // 文件地址
    }));

    // 指给
    result.data.dept_emp = deptEmp.map(x => ({
      deptId: x.auth_department_id, // 部门ID
      dept: x.auth_department_name, // 部门
      emps: x.emps
    }));
  }
  return formatResult(result);
};

// 工单处理
const workOrderProcessing = async params => formatResult(await apiWorkOrderProcessing(params));
const getDepartmentOptions = async (params) => {
  const result = await apiGetDept(params);
  if (result.success) {
    const res = result.data;
    result.data = res.dept_emp.map(x => ({
      enum_id: x.auth_department_id,
      enum_name: x.auth_department_name
    }));
  }
  return formatResult(result);
};
const exportOrder = async params => formatResult(await apiExportOrder(params));

// 删除工单
const delItem = async (params) => {
  const result = await apiDelItem(params);
  return formatResult(result);
};

// 部门人员信息
const getDept = async (params) => {
  const result = await apiGetDept(params);
  return formatResult(result);
};

const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));

const downloadEnclosure = (params) => {
  apiDownload(params);
};

export {
  getList,
  getBadge,
  getDepartmentOptions,
  exportOrder,
  getCommunicateInfo,
  delItem,
  getItem,
  addItem,
  getDept,
  updateItem,
  downloadEnclosure,
  workOrderProcessing
};
