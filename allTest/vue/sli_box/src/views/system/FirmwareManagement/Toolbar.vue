<template>
   <div class="firmwareManagementEdit">
    <Form inline class="toolBarForm">
        <!-- <FormItem style="width: 80px;"> -->
            <RefreshBtn @click='handleRefresh'/>
        <!-- </FormItem> -->
        <FormItem label='上传者'>
            <Input type="text" v-model="filterObj.uploadsName" clearable placeholder="请输入上传者名称"></Input>
        </FormItem>
        <FormItem label='上传时间' class="datePicker">
            <DatePicker type="datetimerange" placeholder="请选择时间" v-model="filterObj.dateChange"></DatePicker>
        </FormItem>
        <FormItem label='固件名称'>
            <Input type="text" v-model="filterObj.firmwareName" clearable placeholder="请输入固件名称"></Input>
        </FormItem>
        <FormItem label='适配盒子'>
            <Select v-model="filterObj.fitBox" clearable>
                <Option v-for="item in fitBoxList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
            </Select>
        </FormItem>
        <FormItem label='固件类型'>
            <Select v-model="filterObj.firmwareType" clearable>
                <Option v-for="item in firmwareTypeList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
        </FormItem>
    </Form>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'FirmwareManagementToolbar',
  data () {
    return {
      filterObj: {
        uploadsName: '',
        dateChange: ['', ''],
        firmwareName: '',
        fitBox: '',
        firmwareType: ''
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
      ]
    };
  },
  methods: {
    handleSubmit () {
      if (this.filterObj.dateChange[0] || this.filterObj.dateChange[1]) {
        this.filterData({
          created_time_start: this.$formatTime(new Date(this.filterObj.dateChange[0]), 'ymd-hms'),
          created_time_end: this.$formatTime(new Date(this.filterObj.dateChange[1]), 'ymd-hms'),
          user_name: this.filterObj.uploadsName.trim(),
          file_name: this.filterObj.firmwareName.trim(),
          type: this.filterObj.fitBox,
          firmwares_type: this.filterObj.firmwareType
        });
      } else {
        this.filterData({
          user_name: this.filterObj.uploadsName.trim(),
          file_name: this.filterObj.firmwareName.trim(),
          type: this.filterObj.fitBox,
          firmwares_type: this.filterObj.firmwareType
        });
      }
    },
    reset () {
      this.filterObj = {
        uploadsName: '',
        dateChange: ['', ''],
        firmwareName: '',
        fitBox: '',
        firmwareType: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  },
  components: {
  }
};
</script>

<style scoped lang='less'>
.firmwareManagementEdit{
  // .ivu-form-item{
  //   width: 240px;
  // }
  // .ivu-input-wrapper, .ivu-input-number{
  //   width: 70%;
  // }
  // .ivu-date-picker-editor{
  //   width: 100%;
  // }
  // .ivu-select{
  //   width: 70%;
  // }
  ::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:#999;
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:#999;
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
  }
  .ivu-input-number-handler-wrap{
    width: 0px;
  }
}
</style>
