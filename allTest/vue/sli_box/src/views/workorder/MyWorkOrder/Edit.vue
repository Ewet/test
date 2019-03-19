<template>
    <div class="myWorkOrderEdit">
        <Form ref="formValidate" :rules="ruleValidate" :model="formValidate"  :label-width="90">
            <!-- <FormItem label="工单类型" prop="type">
            <Select v-model="formValidate.type" multiple>
                <Option v-for="item in typeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </FormItem> -->
            <FormItem label="工单状态" >
                <span  v-if="Object.keys(formData).length <= 0">待确认</span>
                <span v-if="Object.keys(formData).length > 0">{{formValidate.statusFormatted}}</span>
            </FormItem>
            <FormItem label="描述内容" prop="content">
              <ZRichText
                v-model="formValidate.content"
                :config="myConfigText"
                style="height:200px"/>
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
            <FormItem label="指给">
                <Row>
                    <Col span="12" style="padding-right:10px;">
                        <Select @on-change="departmentChange" v-model="formValidate.department">
                            <Option v-for="item in departmentOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="12" style="padding-left:10px;">
                        <Select v-model="formValidate.personnel">
                            <Option v-for="item in personnelOption" :value="item.admin_id" :key="item.admin_id">{{ item.work_name }}</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="优先级" prop="priority">
                <RadioGroup v-model="formValidate.priority">
                    <Radio :label="0">一般</Radio>
                    <Radio :label="1">紧急</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label='截止时间' class="datePicker" prop="deadline">
                <DatePicker
                style="width:339px;"
                format="yyyy-MM-dd HH:mm:ss"
                v-model="formValidate.deadline"
                type="datetime"
                placeholder="截止时间"
                :options="optionsDeadline"
                @on-change="deadlineChange"
                ></DatePicker>
            </FormItem>
            <FormItem>
                <IncreaseBtn v-if="Object.keys(formData).length <= 0" @click="add"/>
                <SaveBtn v-if="Object.keys(formData).length > 0" @click="save"/>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { UPLOADP_FILE } from '@/const/url';
import { updateItem, addItem, getDept } from './model';
import guid from 'utils/guid';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      optionsDeadline: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      defaultList: [], // 默认附件列表
      UploadFileUrl: UPLOADP_FILE,
      uploadfileData: {
        source: 'uf_box'
      },
      typeOption: [],
      myConfigText: Object.assign({}, this.$richTextConfig, {
        toolbars: [[
          'bold', // 加粗
          'underline', // 下划线
          'italic', // 斜体
          'simpleupload' // 单图上传,
        ]],
        maximumWords: 255
      }, {
        textarea: guid()
      }),
      departmentOption: [// 部门列表
      ],
      departmentData: [], // 部门列表数据(新增时用到)
      personnelOption: [// 人员列表
      ],
      formValidate: {
        statusFormatted: '', // 描述内容工单状态
        content: '', // 描述内容
        personnel: '', // 指给
        department: '', // 部门
        priority: 1, // 优先级
        deadline: '', // 截止时间
        workOrderId: '', // 工单Id
        fileList: [] // 附件列表Id
      },
      ruleValidate: {
        content: [
          { required: true, trigger: 'blur', message: '描述内容不能为空' }
        ],
        deadline: [
          {
            required: true, trigger: 'blur', message: '截止时间不能为空', transform: value => value.toString().trim()
          }
        ]
      }

    };
  },
  mounted () {
    this.getDeptData();
  },
  methods: {
    // 日期发生变化时触发
    deadlineChange () {
      this.$refs.formValidate.validateField('deadline');
    },

    beforeUpload (res) {
    },
    // 上传文件
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

    save (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const fileIdStr = this.getFileId(this.formValidate.fileList).toString();
          let endTime = '';
          if (this.formValidate.deadline) {
            endTime = this.$formatTime(this.formValidate.deadline);
          }
          updateItem({
            content: this.formValidate.content, // 工单内容
            priority: this.formValidate.priority, // 优先级 0-一般 1-紧急
            end_time: endTime, // 截止时间
            handler: this.formValidate.personnel, // 指派人ID
            file_id: fileIdStr, // 文件ID
            ticket_id: this.ticketId // 工单ID
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.getCommunicateInfoData(this.ticketId);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        }
      });
    },

    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const fileIdStr = this.getFileId(this.formValidate.fileList).toString();
          let endTime = '';
          if (this.formValidate.deadline) {
            endTime = this.$formatTime(this.formValidate.deadline);
          }
          addItem({
            content: this.formValidate.content, // 工单内容
            priority: this.formValidate.priority, // 优先级 0-一般 1-紧急
            end_time: endTime, // 截止时间
            handler: this.formValidate.personnel, // 指派人ID
            file_id: fileIdStr // 文件ID
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        }
      });
    },

    // 部门人员信息
    async getDeptData () {
      const { success, data } = await getDept();
      const deptEmp = data.dept_emp;
      if (success) {
        this.departmentData = deptEmp.map(x => ({ label: x.auth_department_name, value: x.auth_department_id, emps: x.emps }));
      }
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
    }
  },
  watch: {
    formData (val) {
      if (Object.keys(val).length > 0) {
        this.formValidate.statusFormatted = val.record.statusFormatted;// 工单状态
        this.formValidate.content = val.record.content;// 工单内容
        this.formValidate.priority = val.record.priority;// 优先级
        this.formValidate.deadline = val.record.endTime;// 截止时间
        this.formValidate.fileList = val.files;// 文件
        this.defaultList = val.files;// 默认文件
        this.departmentOption = val.dept_emp.map((x) => {
          if (x.deptId && val.record.authDepartmentId === x.deptId) {
            this.personnelOption = x.emps;
          }
          return { label: x.dept, value: x.deptId, emps: x.emps };
        });
        this.formValidate.department = val.record.authDepartmentId;// 部门
        this.formValidate.personnel = val.record.handler;// 指给
      } else {
        this.departmentOption = this.departmentData;
      }
    },
    showModal (val) {
      if (val) {
        this.departmentOption = this.departmentData;
      } else {
        this.defaultList = [];
        this.formValidate = {
          statusFormatted: '', // 描述内容工单状态
          content: '', // 描述内容
          personnel: '', // 指给
          department: '', // 部门
          priority: 1, // 优先级
          deadline: '', // 截止时间
          workOrderId: '', // 工单Id
          fileList: [] // 附件列表Id
        };
        this.$refs.formValidate.resetFields();
      }
    }
  }
};
</script>

<style lang="less">
.myWorkOrderEdit{
    .edui-default .edui-editor{
      width: auto !important;
    }
    .ivu-select-dropdown{
      z-index: 999999!important;
    }
}

</style>
