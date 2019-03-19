<template>
<div class='form'>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleSubmit"/>
      <FormItem label='所属商户'>
        <Select v-model="filterObj.nameSelect" clearable>
            <Option v-for="item in merchantNameList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
        </Select>
      </FormItem>
      <FormItem label='盒子编号'>
        <Select v-model="filterObj.boxNum" clearable>
            <Option v-for="item in boxNumList" :value="item.boxNo" :key="item.value">{{ item.boxNo }}</Option>
        </Select>
      </FormItem>
      <FormItem label='告警类型'>
        <Select v-model="filterObj.alarmType" clearable>
              <Option v-for="item in alarmTypeList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
        </Select>
      </FormItem>
      <FormItem label='告警来源'>
        <Select v-model="filterObj.alarmSource" clearable>
              <Option v-for="item in alarmSourceList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
        </Select>
      </FormItem>
      <FormItem label='告警代码'>
        <Select v-model="filterObj.alarmCode" clearable>
              <Option v-for="item in alarmCodeList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
        </Select>
      </FormItem>
      <FormItem label='告警级别'>
        <Select v-model="filterObj.alarmLevel" clearable>
              <Option v-for="item in alarmLevelList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
        </Select>
      </FormItem>
      <FormItem label='处理状态'>
        <Select v-model="filterObj.processingState" clearable>
              <Option v-for="item in processingStateList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
        </Select>
      </FormItem>
      <FormItem style="width: 320px;">
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="reset"/>
      </FormItem>
   </Form>
</div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getDictionary } from 'model/dictionary';
import { getList } from 'views/system/BoxManagement/model';
import { getList as getMerchantList } from 'views/system/MerchantManagement/model';
import { STORE_NAME } from './store';

export default {
  name: 'SalesReportIndex',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      filterObj: {
        nameSelect: '',
        boxNum: '',
        alarmType: '',
        alarmSource: '',
        alarmCode: '',
        alarmLevel: '',
        processingState: ''
      },
      merchantNameList: [],
      boxNumList: [],
      alarmTypeList: [],
      alarmSourceList: [],
      alarmCodeList: [],
      alarmLevelList: [],
      processingStateList: []
    };
  },
  mounted () {
    getList({
      'pagination[page_size]': 1000,
      box_no: this.filterObj.boxNo,
      name: this.filterObj.name
    }).then(({ success, data, msg }) => {
      if (success) {
        this.boxNumList = data.items;
      }
    });
    getMerchantList().then((result) => {
      if (result.success) {
        this.merchantNameList = result.data.items.map(x => ({
          enum_id: x.id,
          enum_name: x.merchantName
        }));
      }
    });
    getDictionary({
      param_key: 'wd_box_alert_type'
    }).then((res) => {
      if (res.msg === 'success') {
        this.alarmTypeList = res.data;
      }
    });
    getDictionary({
      param_key: 'wd_box_alert_source'
    }).then((res) => {
      if (res.msg === 'success') {
        this.alarmSourceList = res.data;
      }
    });
    getDictionary({
      param_key: 'wd_box_alert_code'
    }).then((res) => {
      if (res.msg === 'success') {
        this.alarmCodeList = res.data;
      }
    });
    getDictionary({
      param_key: 'wd_box_alert_level'
    }).then((res) => {
      if (res.msg === 'success') {
        this.alarmLevelList = res.data;
      }
    });
    getDictionary({
      param_key: 'wd_box_alert_is_handled'
    }).then((res) => {
      if (res.msg === 'success') {
        this.processingStateList = res.data;
      }
    });
  },
  methods: {
    handleSubmit () {
      this.filterData({
        merchant_id: this.filterObj.nameSelect,
        box_no: this.filterObj.boxNum,
        type: this.filterObj.alarmType,
        source: this.filterObj.alarmSource,
        code: this.filterObj.alarmCode,
        level: this.filterObj.alarmLevel,
        is_handled: this.filterObj.processingState
      });
    },
    reset () {
      this.filterObj = {
        nameSelect: '',
        boxNum: '',
        alarmType: '',
        alarmSource: '',
        alarmCode: '',
        alarmLevel: '',
        processingState: ''
      };
      this.clearFilter();
    }
  }
};
</script>

<style scoped>
/* .ivu-form-item{
  width: 240px;
}
.ivu-form-item-label{
  width: 30%;
}
.ivu-input-wrapper{
  width: 70%;
}
.ivu-select{
  width: 70%;
} */
</style>
