<template>
   <Form inline>
      <RefreshBtn @click="handleRefresh"/>
      <FormItem style="width: 470px;">
        <Select selected='time1' style="width: 140px;margin-right: 10px;" v-model="filterObj.timeStyle" readonly filterable placeholder="请选择">
              <Option name='time2' value="0">支付时间</Option>
              <Option name='time1' value="1">下单时间</Option>
        </Select>
        <DatePicker style="width: 300px;" type="datetimerange" placeholder="请选择时间" v-model="filterObj.dateChange"></DatePicker>
      </FormItem>
      <FormItem label='订单号'>
          <Input type="text" v-model="filterObj.layerNo" placeholder="请输入订单号"></Input>
      </FormItem>
      <FormItem label='所属商户'>
          <Input type="text" v-model="filterObj.nameSelect" clearable placeholder="请输入所属商户"></Input>
          <!-- <Select v-model="filterObj.nameSelect" clearable filterable placeholder="搜索">
                <Option value="beijing">lsjdjsdjksdjksd</Option>
          </Select> -->
      </FormItem>
      <FormItem label='盒子编号'>
        <Input type="text" v-model="filterObj.boxNum" clearable placeholder="请输入盒子编号"></Input>
          <!-- <Select v-model="filterObj.boxNum" clearable filterable placeholder="搜索">
                <Option value="beijing">lsjdjsdjksdjksd</Option>
          </Select> -->
      </FormItem>
      <!-- <FormItem label='顾客手机号'>
          <Input type="text" v-model="filterObj.phone" placeholder="顾客手机号"></Input>
      </FormItem> -->
      <FormItem label='订单类型'>
          <Select v-model="filterObj.orderType" clearable filterable placeholder="搜索">
                <Option v-for="(item,index) in orderTypeList" :value="item.enum_id" :key="index">{{ item.enum_name }}</Option>
          </Select>
      </FormItem>
      <FormItem label='订单状态'>
          <Select v-model="filterObj.orderStyle" clearable filterable placeholder="搜索">
                <Option v-for="(item,index) in orderStatusList" :value="item.enum_id" :key="index">{{ item.enum_name }}</Option>
          </Select>
      </FormItem>
      <FormItem>
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="handleReset"/>
        <ExportDetailsBtn @click="outList"/>
      </FormItem>
   </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import apiGetOrderType from 'views/market/Order/api/get-order-type';
import apiGetOrderStatus from 'views/market/Order/api/get-order-status';
import apiGetOrderOutList from 'views/market/Order/api/get-order-out-list';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      orderTypeList: [],
      orderStatusList: [],
      filterObj: {
        timeStyle: '1',
        dateChange: ['t', 't'],
        layerNo: '',
        nameSelect: '',
        boxNum: '',
        phone: '',
        orderType: '',
        orderStyle: ''
      }
    };
  },
  mounted () {
    const that = this;
    apiGetOrderType({
      param_key: 'wd_box_order_type'
    }).then((res) => {
      that.orderTypeList = res.data;
    });
    apiGetOrderStatus({
      param_key: 'wd_box_order_status'
    }).then((res) => {
      that.orderStatusList = res.data;
    });
    const time = new Date().getTime();
    const end = (7 * 24 * 60 * 60 * 1000);
    const dt = time - end;
    const startTiem = this.$formatTime(new Date(dt), 'ymd-hms');
    const endTime = this.$formatTime(new Date(time), 'ymd-hms');
    that.filterObj.dateChange[0] = startTiem;
    that.filterObj.dateChange[1] = endTime;
    this.filterData({
      created_time_start: startTiem,
      created_time_end: endTime
    });
  },
  methods: {
    // 刷新
    handleRefresh () {
      this.reload();
    },
    outList () {
      const filterItem = this.filterObj;
      const noTimeForm = {
        order_sn: filterItem.layerNo,
        merchantName: filterItem.nameSelect,
        box_no: filterItem.boxNum,
        mobile: filterItem.phone,
        order_type: filterItem.orderType,
        status: filterItem.orderStyle
      };
      if (filterItem.timeStyle === '0') {
        if (filterItem.dateChange[0] || filterItem.dateChange[1]) {
          noTimeForm.paid_time_start = this.$formatTime(filterItem.dateChange[0], 'ymd-hms');
          noTimeForm.paid_time_end = this.$formatTime(filterItem.dateChange[1], 'ymd-hms');
        }
      } else if (filterItem.dateChange[0] || filterItem.dateChange[1]) {
        noTimeForm.created_time_start = this.$formatTime(filterItem.dateChange[0], 'ymd-hms');
        noTimeForm.created_time_end = this.$formatTime(filterItem.dateChange[1], 'ymd-hms');
      }
      apiGetOrderOutList(noTimeForm);
    },
    handleSubmit () {
      const filterItem = this.filterObj;
      const noTimeForm = {
        order_sn: filterItem.layerNo,
        merchantName: filterItem.nameSelect,
        box_no: filterItem.boxNum,
        mobile: filterItem.phone,
        order_type: filterItem.orderType,
        status: filterItem.orderStyle
      };
      if (filterItem.timeStyle === '0') {
        if (filterItem.dateChange[0] || filterItem.dateChange[1]) {
          noTimeForm.paid_time_start = this.$formatTime(filterItem.dateChange[0], 'ymd-hms');
          noTimeForm.paid_time_end = this.$formatTime(filterItem.dateChange[1], 'ymd-hms');
          this.filterData(
            noTimeForm
          );
        } else {
          this.$error('支付时间必填');
        }
      } else if (filterItem.dateChange[0] || filterItem.dateChange[1]) {
        noTimeForm.created_time_start = this.$formatTime(filterItem.dateChange[0], 'ymd-hms');
        noTimeForm.created_time_end = this.$formatTime(filterItem.dateChange[1], 'ymd-hms');
        this.filterData(
          noTimeForm
        );
      } else {
        this.$error('下单时间必填');
      }
    },
    handleReset () {
      const time = new Date().getTime();
      const end = (7 * 24 * 60 * 60 * 1000);
      const dt = time - end;
      const startTiem = this.$formatTime(dt, 'ymd-hms');
      const endTime = this.$formatTime(time, 'ymd-hms');
      this.filterObj = {
        timeStyle: '1',
        dateChange: [startTiem, endTime],
        layerNo: '',
        nameSelect: '',
        boxNum: '',
        phone: '',
        orderType: '',
        orderStyle: ''
      };
      this.filterData({
        created_time_start: startTiem,
        created_time_end: endTime
      });
    }
  }
};
</script>

<style scoped>
.ivu-form-item{
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
}
</style>
