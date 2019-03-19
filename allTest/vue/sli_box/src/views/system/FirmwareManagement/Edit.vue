<template>
   <div class="addFirmware">
        <Form class='content' :label-width="86" ref="addFirmwareForm" :model="firmwareForm" :rules='ruleValidate'>
            <!-- <FormItem label='上传固件' prop='firmwareFile' v-show="isAddEdit">
              <Upload
                  :action="upLoads"
                  ref="uploadBtn"
                  name="file"
                  :with-credentials="true"
                  :before-upload="handleBeforeUpload"
                  :on-success="handleSuccess"
                  >
                  <Button class='btn'>请上传固件文件</Button>
              </Upload>
            </FormItem> -->
            <FormItem label='固件类型' prop='firmwareType'>
                <Select v-model="firmwareForm.firmwareType" clearable>
                    <Option v-for="item in firmwareTypeList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
                </Select>
            </FormItem>
            <FormItem label='固件名称' prop='firmwareName'>
                <Input v-model="firmwareForm.firmwareName" placeholder="请输入固件名称"></Input>
            </FormItem>
            <FormItem label='版本号' prop='version'>
                <Input v-model="firmwareForm.version" placeholder="请输入版本号"></Input>
            </FormItem>
            <FormItem label='固件地址' prop='address'>
                <Input v-model="firmwareForm.address" placeholder="请输入固件地址"></Input>
            </FormItem>
            <FormItem label='适配盒子' prop='boxNum'>
                <Select v-model="firmwareForm.boxNum" multiple>
                    <Option v-for="item in fitBoxList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
                </Select>
            </FormItem>
            <FormItem label='备注' prop='remarks'>
                <Input v-model="firmwareForm.remarks" :maxlength="100" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="备注不超过100字"></Input>
            </FormItem>
        </Form>
        <CloseBtn style='float:right;margin:40px 0 10px' @click="cancel"/>
        <DetermineBtn style='float:right;margin:40px 10px 10px 0' @click="addOk('addFirmwareForm')"/>
   </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { UPLOADP_FIRMWARE } from '@/const/url';
import { modifyItem, createItem } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AddFirmware',
  data () {
    return {
      upLoads: UPLOADP_FIRMWARE,
      fileId: '',
      firmwareForm: {
        firmwareType: '',
        firmwareName: '',
        version: '',
        address: '',
        boxNum: [],
        remarks: ''
      },
      fitBoxList: [
        {
          enum_id: '1',
          enum_name: '摩萄盒子'
        },
        {
          enum_id: '2',
          enum_name: '摩萄酒柜'
        }
      ],
      firmwareTypeList: [
        {
          enum_id: 'clientMain',
          enum_name: '客户端主程序'
        },
        {
          enum_id: 'clientMonitor',
          enum_name: '客户端监控程序'
        },
        {
          enum_id: 'clientAdv',
          enum_name: '客户端广告程序'
        },
        {
          enum_id: 'clentDaemon',
          enum_name: '客户端守护程序'
        },
        {
          enum_id: 'hardware',
          enum_name: '硬件固件'
        }
      ],
      ruleValidate: {
        // firmwareFile: [
        //   { required: true, validator: this.validateInvoiceFile }
        // ]
        firmwareType: this.$rulesChange('请选择一个固件类型'),
        firmwareName: this.$rulesBlur('请输入固件名称'),
        version: this.$rulesBlur('请输入本版号'),
        address: this.$rulesBlur('请输入地址'),
        boxNum: this.$rulesChange('请选择一个固件类型', 'array')
      }
    };
  },
  watch: {
    isAddEdit (val) {
      if (val === false) {
        const that = this.firmwareForm;
        that.firmwareType = this.detailData.firmwares_type;
        that.firmwareName = this.detailData.file_name;
        that.version = this.detailData.version;
        that.address = this.detailData.url;
        that.remarks = this.detailData.remarks;
        const arr = this.detailData.type.split(',');
        that.boxNum = arr;
      }
    }
  },
  created () {
    this.$g_on('clearUpLoadsModal', this.clearUpLoadsModal);
  },
  beforeDestroy () {
    this.$g_off('clearUpLoadsModal', this.clearUpLoadsModal);
  },
  methods: {
    // handleSuccess (res, file, fileList) {
    //   this.$refs['addFirmwareForm'].validateField('firmwareFile');
    //   if (res.success) {
    //     this.fileId = res.data.file_id;
    //   }
    // },
    // handleBeforeUpload (response) {
    //   let reg = /^(clientMain|clientMonitor|clientAdv|clentDaemon|hardware)_(1|2)_[A-Za-z0-9_+.]_(full|incremental)\.zip$/;
    //   let name = response.name;
    //   if (!reg.test(name)) {
    //     // true
    //     let len = this.$refs['uploadBtn'].fileList.length;
    //     const check = len < 1;
    //     if (!check) {
    //       this.$warning('只能上传一个文件');
    //     }
    //     return check;
    //   } else {
    //     this.$Modal.warning({
    //       title: '上传文件命名格式错误',
    //       width: '600',
    //       content: `<pre>升级包命名规则：【程序类型】_【盒子型号】_【版本】_【打包类型】.zip
    //           1、程序类型
    //           客户端主程序：clientMain
    //           客户端监控程序：clientMonitor
    //           客户端广告程序：clientAdv
    //           客户端守护程序：clentDaemon
    //           硬件固件：hardware
    //           2、盒子型号：1或者2
    //           3、打包类型
    //           full，全量
    //           incremental，增量
    //           4、文件为zip的压缩包
    //           例子：clientMain_1_vx.x_incremental.zip
    //           </pre>`
    //     });
    //     return false;
    //   }
    // },
    cancel () {
      this.setModal(false);
      this.$refs.addFirmwareForm.resetFields();
      // this.$refs['uploadBtn'].clearFiles();
      setTimeout(() => {
        this.setIsAddFirmwareModal(true);
        this.setDetailData('');
        this.setFirmwareId('');
      }, 600);
    },
    // validateInvoiceFile (rule, value, callback) {
    //   let file = this.$refs['uploadBtn'].fileList[0];
    //   if (file) {
    //     callback();
    //   } else {
    //     callback(new Error('请选择固件文件'));
    //   }
    // },
    clearUpLoadsModal () {
      this.cancel();
    },
    async addOk (name) {
      if (this.isAddEdit) {
        // 增加
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            // 请求接口
            const that = this.firmwareForm;
            const str = that.boxNum.toString();
            const { success, msg } = await createItem({
              firmwares_type: that.firmwareType,
              file_name: that.firmwareName,
              version: that.version,
              url: that.address,
              type: str,
              remarks: that.remarks
            });
            if (success) {
              this.$success('增加成功！');
              this.reload();
            } else {
              this.$error(`增加失败！${msg}`);
            }
            this.cancel();
          }
        });
      } else {
        // 编辑
        const that = this.firmwareForm;
        const str = that.boxNum.toString();
        const { success, msg } = await modifyItem({
          firmwares_id: this.firmwareId,
          firmwares_type: that.firmwareType,
          file_name: that.firmwareName,
          version: that.version,
          url: that.address,
          type: str,
          remarks: that.remarks
        });
        if (success) {
          this.$success('编辑成功！');
          this.reload();
        } else {
          this.$error(`编辑失败！${msg}`);
        }
        this.cancel();
      }
    }
  }
};
</script>

<style lang='less'>
.addFirmware{
  clear: both;
  overflow: hidden;
  .ivu-input-wrapper,.ivu-upload,.ivu-select{
    width: 88%;
  }
  .ivu-upload{
    display: inline-block;
  }
  .ivu-upload-select,.btn{
    width: 100%;
  }
  textarea.ivu-input{
      resize: none;
  }
}
</style>
