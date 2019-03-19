<template>
    <div class="assignBox">
        <Card :bordered="false">
            <span slot="title">工单详情</span>
            <div class="infoBox">
                <p>
                    <i>工单内容:</i>
                    <span v-html="workOrderInfo.content"></span>
                </p>
                <p>
                    <i>指派给:</i>
                    <span>{{workOrderInfo.handler?workOrderInfo.handler:'无'}}</span>
                </p>
                <p>
                    <i>优先级:</i>
                    <span>{{workOrderInfo.priorityFormatted}}</span>
                </p>
                <p>
                    <i>状态:</i>
                    <span>{{workOrderInfo.statusFormatted}}</span>
                </p>
                <p>
                    <i>工单编号:</i>
                    <span>{{workOrderInfo.ticketNo}}</span>
                </p>
                <p>
                    <i>提交人:</i>
                    <span>{{workOrderInfo.name}}</span>
                </p>
                <p>
                    <i>提交时间:</i>
                    <span>{{workOrderInfo.updateTime}}</span>
                </p>
                <p>
                    <i>截止时间:</i>
                    <span>{{workOrderInfo.endTime}}</span>
                </p>
                <p>
                    <i>附件:</i>
                    <span  v-if="workOrderInfo.files&&workOrderInfo.files.length>0">
                      <a v-for="item in workOrderInfo.files" :key="item.fileId" @click="attachmentDownload(item.fileId)">{{item.fileName}}</a>
                    </span>
                    <span  v-else>无</span>
                </p>
                <p style="text-align: right;" v-if="workOrderInfo.status===0&&workOrderInfo.isMe===1">
                    <a  @click="delWorkOrder">删除工单</a>
                    <a   @click="editItem(ticketId)">编辑</a>
                </p>
            </div>
        </Card>
        <Card :bordered="false" style="margin:20px 0 0 0;">
            <span slot="title">沟通详情</span>
            <div :class="item.isMe===1?'row me':'row'" v-for="(item,index) in communicateInfo" :key="index">
                <div class="rowContent">
                    <!-- <h6>{{item.isMe===0?item.assignedName:'我'}}{{item.handlerName?('对'+item.handlerName):''}}说 ：</h6> -->
                    <div v-html="item.assignedHandlerTalk"></div>
                    <div v-html="item.ticketContent"></div>
                </div>
                <h5 class="rowTime">{{item.createTime}}</h5>
                <div class="enclosureBox">
                  <p>附件:</p>
                  <p  v-if="item.files&&item.files.length>0">
                     <a v-for="x in item.files" :key="x.fileId" @click="attachmentDownload(x.fileId)">{{x.fileName}}</a>
                  </p>
                  <p  v-else>
                     <span>无</span>
                  </p>
                </div>
            </div>
        </Card>
        <Card v-show="isShowReply" :bordered="false" style="margin:20px 0 0 0;">
            <span slot="title">回复</span>
            <Form class="formValidate" ref="formValidate" :rules="ruleValidate"  :model="formValidate"  :label-width="90">
                <FormItem label="回复内容" prop="content">
                  <ZRichText
                    v-model="formValidate.content"
                    :config="myConfig"
                    style="height:200px"
                  />
                </FormItem>
                <FormItem label="附件">
                        <Upload
                        ref="uploadFile"
                        :default-file-list="defaultList"
                        :on-success="handleUpload"
                        :data="uploadfileData"
                        :action= "UploadFileUrl"
                        :with-credentials="true"
                        :on-remove="handleRemove"
                        :on-format-error="fileHandleFormatError"
                        :on-exceeded-size="fileHandleMaxSize"
                        :before-upload="handleBeforeUploadMedia"
                        name="file"
                        >
                        <Button icon="ios-cloud-upload-outline">上传附件</Button>
                        </Upload>
                </FormItem>
                <FormItem label="操作" prop="operate">
                    <Select v-model="formValidate.operate"  @on-change="operationTypeChange">
                        <Option v-for="item in workOrderInfo.operationType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem v-show="isShow">
                    <Row>
                        <Col span="12" style="padding-right:10px;">
                            <Select @on-change="departmentChange" v-model="department" placeholder="请选择部门">
                                <Option v-for="item in departmentOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col span="12" style="padding-left:10px;">
                            <Select v-model="formValidate.personnel"  placeholder="请选择人员">
                                <Option v-for="item in personnelOption" :value="item.admin_id" :key="item.admin_id">{{ item.work_name }}</Option>
                            </Select>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <ImmediateSubmissionBtn @click="submission"/>
                    <CancelBtn @click="setCommunicateInfoModal(false);"/>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { workOrderProcessing, delItem, downloadEnclosure } from './model';
import { UPLOADP_FILE } from '@/const/url';
import guid from 'utils/guid';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    const operateCheck = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error('操作不能为空'));
      } else {
        callback();
      }
    };
    return {
      isShowReply: false, // 是否显示回复模块
      isSubmit: false, // 是否提交
      isShow: false, // 是否显示指派
      defaultList: [], // 默认附件列表
      UploadFileUrl: UPLOADP_FILE,
      uploadfileData: {
        source: 'uf_box'
      },
      operateOption: [],
      myConfig: Object.assign({}, this.$richTextConfig, {
        toolbars: [[
          'bold', // 加粗
          'underline', // 下划线
          'italic', // 斜体
          'simpleupload' // 单图上传
        ]],
        maximumWords: 255
      }, {
        textarea: guid()
      }),
      temporaryOption: [], // 暂存部门列表
      departmentOption: [], // 部门列表
      departmentReplyOption: [], // 回复部门列表
      personnelOption: [], // 人员列表
      department: '', // 部门
      formValidate: {
        content: '', // 回复内容
        operate: null, // 操作
        personnel: '', // 指给
        fileList: [] // 附件列表Id
      },
      workOrderInfo: {}, // 工单详情
      communicateInfo: [], // 沟通详情
      ruleValidate: {
        content: [
          { required: true, trigger: 'blur', message: '回复内容不能为空' }
        ],
        operate: [
          { required: true, validator: operateCheck, trigger: 'blur', type: 'number' }
        ]
      }
    };
  },
  methods: {
    // 附件下载
    attachmentDownload (fileId) {
      downloadEnclosure({
        file_id: fileId
      });
    },

    // 操作选中的Option变化时触发
    operationTypeChange (v) {
      this.department = '';
      this.formValidate.personnel = '';
      if (this.isSubmit) {
        this.$refs.formValidate.validateField('operate');
      }
      if (v === 0) {
        this.departmentOption = [...this.departmentReplyOption];
        this.isShow = true;
      } else if (v === 1 || v === 2 || v === 3) {
        this.departmentOption = [...this.temporaryOption];
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    handleUpload (res, file, fileList) {
      const defaultList = [...this.formValidate.fileList];
      if (res.success) {
        const fileItem = {
          name: res.data.file_name,
          file_id: res.data.file_id,
          file_url: res.data.file_url
        };
        defaultList.push(fileItem);
        this.formValidate.fileList = defaultList;
      } else {
        this.$error(res.message);
      }
      this.mediaUploading = false;
      this.$store.commit('setLoading', false);
    },
    handleRemove (file) {
      if (this.formValidate.fileList && this.formValidate.fileList.length > 0) {
        const fileList = [...this.formValidate.fileList];
        for (let i = 0; i < fileList.length; i++) {
          if (file.response && fileList[i].file_id === file.response.data.file_id) {
            fileList.splice(i, 1);
            break;
          } else if (file.file_id && fileList[i].file_id === file.file_id) {
            fileList.splice(i, 1);
            break;
          }
        }
        this.formValidate.fileList = fileList;
      }
    },
    fileHandleFormatError (file) {
      this.$error('不能上传非法文件');
    },
    fileHandleMaxSize (file) {
      this.$error('超过文件大小限制,文件大小不要超过100M.');
    },
    handleBeforeUploadMedia (res) {
      const fileName = res.name;
      const exe = 'exe';
      if (this.getType(fileName) === exe.toLowerCase()) {
        this.$error('不能上传非法文件');
        return false;
      }
      return true;
    },
    // 获取文件Id
    getFileId (arr) {
      const fileId = [];
      arr.forEach((item) => {
        if (item.file_id) {
          fileId.push(item.file_id);
        }
      });
      return fileId;
    },

    // 获取文件后缀
    getType (file) {
      const filename = file;
      const index1 = filename.lastIndexOf('.');
      const index2 = filename.length;
      const type = filename.substring(index1 + 1, index2);
      return type.toLowerCase();
    },

    submission () {
      this.$refs.formValidate.validate((valid) => {
        this.isSubmit = true;
        if (valid) {
          const fileIdStr = this.getFileId(this.formValidate.fileList).toString();
          workOrderProcessing({
            ticket_id: this.ticketId,
            operating_type: this.formValidate.operate,
            handler: this.formValidate.personnel ? this.formValidate.personnel : '',
            file_id: fileIdStr,
            content: this.formValidate.content
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('提交成功!');
              this.setCommunicateInfoModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        }
      });
    },
    // 部门Option变化时触发
    departmentChange (res) {
      this.personnelOption = [];
      this.formValidate.personnel = '';
      this.departmentOption.forEach((x) => {
        if (x.value && res === x.value) {
          this.personnelOption = x.emps;
        }
      });
    },

    // 删除工单
    delWorkOrder () {
      this.$Modal.confirm({
        title: '确定删除当前工单吗？',
        onOk: () => {
          delItem({
            ticket_id: this.ticketId
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.setCommunicateInfoModal(false);
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除工单失败${msg}`
              });
            }
          });
        }
      });
    }
  },
  watch: {
    communicateInfoData (val) {
      if (Object.keys(val).length > 0) {
        this.workOrderInfo = val.record;// 工单详情
        this.communicateInfo = val.replies;// 沟通详情
        this.departmentOption = val.dept_emp.map(x => ({ label: x.dept, value: x.deptId, emps: x.emps }));
        this.temporaryOption = [...this.departmentOption];
        this.departmentReplyOption = val.dept_emp_reply.map(x => ({ label: x.dept, value: x.deptId, emps: x.emps }));
        if (this.workOrderInfo.status === 0) { // 工单状态为0/1/2/3/4时不显示回复操作
          this.isShowReply = true;
        } else if (this.workOrderInfo.status === 1) {
          this.isShowReply = true;
        } else if (this.workOrderInfo.status === 2) {
          this.isShowReply = true;
        } else if (this.workOrderInfo.status === 3) {
          this.isShowReply = true;
        } else if (this.workOrderInfo.status === 4) {
          this.isShowReply = true;
        } else {
          this.isShowReply = false;
        }
      } else {
        this.isShowReply = false;
        this.workOrderInfo = {};// 工单详情
        this.communicateInfo = [];// 沟通详情
      }
    },
    communicateInfoModal (val) {
      this.isSubmit = false;
      if (!val) {
        this.setFormData({});
        this.formValidate = {
          content: '', // 回复内容
          operate: null, // 操作
          personnel: '', // 指给
          fileList: [] // 附件列表Id
        };
        this.department = '';
        this.$refs.uploadFile.clearFiles();
        this.$refs.formValidate.resetFields();
      }
    }
  }
};
</script>

<style lang="less">
    .assignBox{
        max-height: 700px;
         overflow: auto;
        .ivu-select-dropdown{
              z-index: 9999 !important;
        }
         .infoBox{
             p{
                 overflow: auto;
                 i{
                    float: left;
                    padding-right: 10px;
                    text-align: right;
                    width:10%;
                    font-style: normal;
                    margin-right: 10px;
                 }
                 span{
                     float: left;
                     width: 88%;
                 }
                 a{
                   margin-right: 15px;
                   text-decoration:underline;
                 }
             }
         }

        .row{
                border-bottom: 1px dotted #eee;
                padding: 10px 0;
                border-radius: 4px;
                margin-bottom: 10px;
            .rowContent{
                overflow: hidden;
                padding:0 10px;
                h6{
                    margin: 0;
                    line-height: 21px;
                    font-size: 14px;
                    padding-right: 10px;
                }
                p{
                    margin: 0;
                    padding: 0;
                }

             }
             h5{
                  color: #999;
                  padding-left: 10px;
                   margin-top: 10px;
             }
             .enclosureBox{
               display: flex;
               font-size: 12px;
              p:nth-of-type(1){
                margin-right: 15px;
                width: 50px;
                padding-left: 10px;
                font-size: 12px;
              }
              a{
                margin-right: 15px;
                font-size: 12px;
                text-decoration:underline;
              }
             }
        }
        .me{
          background: #f4f4f4;
        }
        .edui-default .edui-editor{
             width: auto !important;
        }
        .edui-editor-iframeholder{
            height: 100px !important;
        }

    }
</style>
