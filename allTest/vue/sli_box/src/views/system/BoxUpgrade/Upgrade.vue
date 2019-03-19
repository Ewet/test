<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

        <FormItem  label="固件类型:" prop="style" >
            <Select v-model="formValidate.style"  @on-change="styleSelect" >
                <Option v-for="item in firmwareTypeList" :value="item.value" :key="item.value">{{ item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem  label="选择固件:" prop="firmware" >
            <Select v-model="formValidate.firmware"   @on-change="firmwareSelect">
                <Option v-for="item in firmwareOption" :value="item.value+'-'+item.fileId" :key="item.value+'-'+item.fileId">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <Row>
            <Col span="12">
                <FormItem  label="上传时间:">
                    <span>{{infoJson.time}}</span>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem  label="固件大小:">
                    <span>{{infoJson.size}}</span>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <FormItem  label="上传者:">
                    <span>{{infoJson.userName}}</span>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem  label="适配型号:">
                    <span>{{infoJson.typeFormatted}}</span>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <FormItem  label="版本号:">
                    <span>{{infoJson.version}}</span>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem  label="打包类型:">
                    <span>{{infoJson.packagingType}}</span>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <FormItem label="备注:">
                  <span class="remarks">{{infoJson.remarks}}</span>
                </FormItem>
            </Col>
        </Row>

        <FormItem class="formBtn">
            <ZBtn @click="startUpgrade()">开始升级</ZBtn>
        </FormItem>
        </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import {
  getInfoList, getFileList, getResultsUpgrade, getBatchUpgrade
} from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      firmwareTypeList: [
        {
          value: 'clientMain',
          text: '客户端主程序'
        },
        {
          value: 'clientMonitor',
          text: '客户端监控程序'
        },
        {
          value: 'clientAdv',
          text: '客户端广告程序'
        },
        {
          value: 'clentDaemon',
          text: '客户端守护程序'
        },
        {
          value: 'hardware',
          text: '硬件固件'
        }
      ],
      firmwareOption: [],
      formValidate: {
        style: '', // 固件类型
        firmware: '' // 固件'主键id:文件id'
      },
      infoJson: {
        size: '', // 固件大小
        typeFormatted: '', // 盒子型号格式化(1-摩萄盒子,2-摩萄酒柜)
        userName: '', // 操作人
        version: '', // 版本号
        remarks: '', // 备注
        time: '' // 升级时间
      },
      ruleValidate: {
        style: [
          { required: true, message: '请选择固件类型', trigger: 'change' }
        ],
        firmware: [
          { required: true, message: '请选择固件', trigger: 'change' }
        ]

      }
    };
  },
  mounted () {
  },
  methods: {

    // 开始升级
    async startUpgrade () {
      const upgrade = this.upgrade;
      const parameter = {};
      this.$refs.formValidate.validate(async (valid) => {
        const firmwareStr = this.formValidate.firmware ? this.formValidate.firmware : '';
        if (firmwareStr) {
          const firmwareArr = firmwareStr.split('-');
          parameter.file_id = firmwareArr[1];

          if (valid) {
            if (upgrade === 'search') { // 搜索结果升级
              const filter = this.filter;
              parameter.box_no = filter.box_no ? filter.box_no : '';
              parameter.type = filter.type ? filter.type : '';
              const { success, msg } = await getResultsUpgrade(parameter);
              this.upgradeSituation(success, msg);// 固件升级情况
            } else if (upgrade === 'batch') { // 批量升级
              parameter.box_id_str = this.boxIdArr.join(',');
              const { success, msg } = await getBatchUpgrade(parameter);
              this.upgradeSituation(success, msg);// 固件升级情况
            }
          }
        }
      });
    },

    // 固件升级情况
    upgradeSituation (success, msg) {
      if (success) {
        this.$success('升级成功!');
        this.setModalUpgrade(false);
      } else {
        this.$error(msg);
      }
    },

    // 清空数据
    clearData () {
      this.$refs.formValidate.resetFields();
      this.setStyleOption([]);
      this.firmwareOption = [];
      this.infoJson = {
        size: '', // 固件大小
        typeFormatted: '', // 盒子型号格式化(1-摩萄盒子,2-摩萄酒柜)
        userName: '', // 操作人
        version: '', // 版本号
        remarks: '', // 备注
        time: '' // 升级时间
      };
      this.formValidate = {
        style: '',
        firmware: ''
      };
    },

    // 固件类型
    async styleSelect (val) {
      const showModalUpgrade = this.showModalUpgrade;
      if (showModalUpgrade) {
        const { success, data } = await getFileList(val);
        if (success) {
          this.firmwareOption = data;
          this.$set(this.formValidate, 'firmware', '');
          this.infoJson = {
            size: '', // 固件大小
            typeFormatted: '', // 盒子型号格式化(1-摩萄盒子,2-摩萄酒柜)
            userName: '', // 操作人
            version: '', // 版本号
            remarks: '', // 备注
            time: '' // 升级时间
          };
        }
      }
    },

    // 选择固件
    async firmwareSelect (val) {
      console.log(this.formValidate);
      if (val) {
        const showModalUpgrade = this.showModalUpgrade;
        const firmwareArr = val.split('-');
        if (showModalUpgrade) {
          const { success, data } = await getInfoList({
            firmwares_id: firmwareArr[0] // 固件主键id
          });
          if (success) {
            this.infoJson = data;
          }
        }
      }
    }

  },
  watch: {
    // formData (val) {
    //   this.$refs['formValidate'].resetFields();
    //   if (Object.keys(val).length > 0) {
    //     this.formValidate.style = this.formData.style;
    //     this.formValidate.firmware = this.formData.firmware;
    //     this.formValidate.id = this.formData.id;
    //   } else {
    //     this.formValidate = {
    //       style: '',
    //       firmware: '',
    //       id: ''
    //     };
    //     this.options = [];
    //     this.weChatName = '';
    //   }
    // },
    showModalUpgrade (val) {
      this.clearData();
    }
  },
  components: {

  },
  computed: {

  },
  beforeDestroy () {
    this.setBoxIdArr([]);
    this.clearData();
  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.formBtn{
  text-align:right;
}
.wxImgRow{

}
.wxImg{
  width: 100px;
  height: 100px;
  margin:0 auto;
}
.wxImg>img{
  display: block;
  width:100%;
  height: 100%;
  margin-left: -50px;
  border-radius:50%;
}
span.remarks{
  display: block;
  width:100%;
  height:100px;
  overflow:auto;
  border:1px solid #dcdee2;
  box-sizing: border-box;
  border-radius: 4px;
  pandding:10px;
  line-height: 20px;
  padding: 10px;
}

</style>
