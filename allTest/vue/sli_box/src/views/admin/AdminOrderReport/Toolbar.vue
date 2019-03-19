<template>
   <Form inline class="toolBarForm">
     <FormItem label='运营商'>
          <OperatorSelectInput @itemSelect="setOperatorName" v-model="filterObj.operatorId"></OperatorSelectInput>
      </FormItem>
      <FormItem label='订单类型'>
          <Select v-model="filterObj.orderType" clearable filterable placeholder="搜索">
                <Option v-for="(item,index) in orderTypeList" :value="item.enum_id" :key="index">{{ item.enum_name }}</Option>
          </Select>
      </FormItem>
      <FormItem label='所属商户'>
          <!-- <Input @on-focus="merchantNameClick($event)" type="text" v-model="filterObj.merchantName" clearable placeholder="请输入所属商户"></Input> -->
          <MerchantSelectInput v-model="filterObj.merchantName" keyName='merchantName'></MerchantSelectInput>
      </FormItem>
     <FormItem label='下单时间' class="datePicker">
        <DatePicker type="datetimerange" v-model="filterObj.createdTime" placeholder="请输入下单时间"></DatePicker>
      </FormItem>
      <FormItem label='支付时间' class="datePicker">
          <DatePicker type="datetimerange" v-model="filterObj.paidTime" placeholder="请输入支付时间"></DatePicker>
      </FormItem>
      <FormItem>
        <Checkbox
          v-model="filterObj.couponAmount"
          true-value="1"
          false-value=""
        >优惠劵</Checkbox>

        <Checkbox
          v-model="filterObj.randomreduction"
          true-value="1"
          false-value=""
        >随机减</Checkbox>

        <Checkbox
          v-model="filterObj.refund"
          true-value="1"
          false-value=""
        >退款</Checkbox>
      </FormItem>
      <FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="reset"/>
          <ExportReportBtn @click="exportReport"/>
        </FormItem>
      </FormItem>
   </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import apiGetOrderType from 'views/market/Order/api/get-order-type';
import { STORE_NAME } from './store';
import { findComponentDownward } from 'utils/assist';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      orderTypeList: [],
      filterObj: {
        operatorName: '', // 运营商名字
        operatorId: '', // 运营商Id
        orderType: '', // 订单类型
        merchantName: '', // 商户名
        createdTime: [], // 下单时间
        paidTime: [], // 支付时间
        couponAmount: '', // 优惠劵
        randomreduction: '', // 随机减
        refund: '' // 退款
      }
    };
  },
  mounted () {
    this.getOrderTypeList();
    this.initTime();
  },
  watch: {
    merchantName (val) {
      this.filterObj.merchantName = val;
    }
  },
  methods: {
    // 设置运营商名字
    setOperatorName (res) {
      this.filterObj.operatorName = res.name;
    },
    // 弹出商户弹框
    // merchantNameClick (event) {
    //   if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
    //     return false;
    //   }
    //   this.setMerchantModal(true);
    // },

    // 导出报表
    exportReport () {
      const createdTime = this.isTimeEmpty(this.filterObj.createdTime);
      const createdTimeLabel = createdTime[0] !== '' ? `${createdTime[0]}~${createdTime[1]}` : '';
      const createdTimeVal = createdTime[0] !== '' ? createdTime.toString() : '';
      const paidTime = this.isTimeEmpty(this.filterObj.paidTime);
      const paidTimeLabel = paidTime[0] !== '' ? `${paidTime[0]}~${paidTime[1]}` : '';
      const paidTimeVal = paidTime[0] !== '' ? paidTime.toString() : '';

      const orderTypeLabel = this.handleOrderTy(this.filterObj.orderType);

      let tabArr = [
        { text: this.filterObj.operatorName, name: 'operator_id', value: this.filterObj.operatorId },
        { text: orderTypeLabel, name: 'order_type', value: this.filterObj.orderType },
        { text: this.filterObj.merchantName, name: 'merchant', value: this.filterObj.merchantName },
        { text: `下单时间:${createdTimeLabel}`, name: 'created_time_begin:created_time_end', value: createdTimeVal },
        { text: `支付时间:${paidTimeLabel}`, name: 'paid_time_begin:paid_time_end', value: paidTimeVal },
        { text: '优惠劵', name: 'coupon_deduction', value: this.filterObj.couponAmount },
        { text: '随机减', name: 'random_deduction', value: this.filterObj.randomreduction },
        { text: '退款', name: 'refunded_total', value: this.filterObj.refund }
      ];
      tabArr = tabArr.filter(item => item.value !== '');
      this.$emit('setTabArr', tabArr);
      this.showReportFormModal();
    },

    // 处理订单类型
    handleOrderTy (v) {
      const filterArr = this.orderTypeList.filter(item => item.enum_id === v);
      return filterArr[0] ? filterArr[0].enum_name : '';
    },

    // 获取订单类型列表
    async getOrderTypeList () {
      const { success, data } = await apiGetOrderType({
        param_key: 'wd_box_order_type'
      });
      if (success) {
        this.orderTypeList = data;
      }
    },

    // 初始化时间
    initTime () {
      const now = new Date().getTime();
      const timeDifference = now - (7 * 24 * 60 * 60 * 1000);
      const startTiem = this.$formatTime(new Date(timeDifference), 'ymd-hms');
      const endTime = this.$formatTime(new Date(now), 'ymd-hms');
      this.filterObj.createdTime = [startTiem, endTime];
      this.filterObj.createdTime = [startTiem, endTime];
      // this.filterObj.paidTime = [startTiem, endTime];
      return [startTiem, endTime];
    },
    resetOperator () {
      const child = findComponentDownward(this, 'OperatorSelectInput');
      if (child) {
        child.resetText();
      }
    },
    resetMerchant () {
      const child = findComponentDownward(this, 'MerchantSelectInput');
      if (child) {
        child.resetText();
      }
    },
    // 重置
    reset () {
      this.resetOperator();
      this.resetMerchant();
      this.filterObj = {
        operatorName: '', // 运营商名字
        operatorId: '', // 运营商Id
        orderType: '', // 订单类型
        merchantName: '', // 商户名
        createdTime: [], // 下单时间
        paidTime: [], // 支付时间
        couponAmount: '', // 优惠劵
        randomreduction: '', // 随机减
        refund: '' // 退款
      };
      const createdTime = this.initTime();
      this.filterData({
        created_time_begin: createdTime[0], // 下单时间-起始
        created_time_end: createdTime[1] // 下单时间-结束
      });
    },

    // 校验时间
    checkTime (timeArr, msg) {
      if (timeArr[0] || timeArr[1]) {
        const startTiem = this.$formatTime(new Date(timeArr[0]), 'ymd-hms');
        const endTime = this.$formatTime(new Date(timeArr[1]), 'ymd-hms');
        return [startTiem, endTime];
      }
      this.$error(msg);
      return false;
    },

    // 判断时间是否为空
    isTimeEmpty (timeArr) {
      if (!timeArr[0] || !timeArr[1]) {
        return ['', ''];
      }
      const startTiem = this.$formatTime(new Date(timeArr[0]), 'ymd-hms');
      const endTime = this.$formatTime(new Date(timeArr[1]), 'ymd-hms');
      return [startTiem, endTime];
    },

    // /查询
    handleSubmit () {
      const createdTime = this.isTimeEmpty(this.filterObj.createdTime);
      const paidTime = this.isTimeEmpty(this.filterObj.paidTime);
      this.filterData({
        operator_id: this.filterObj.operatorId, // 商户名
        order_type: this.filterObj.orderType ? this.filterObj.orderType : '', // 订单类型
        merchant: this.filterObj.merchantName, // 商户名
        created_time_begin: createdTime[0], // 下单时间-起始
        created_time_end: createdTime[1], // 下单时间-结束
        paid_time_begin: paidTime[0], // 支付时间-起始
        paid_time_end: paidTime[1], // 支付时间-结束
        coupon_deduction: this.filterObj.couponAmount, // 优惠金额
        random_deduction: this.filterObj.randomreduction, // 随机立减
        refunded_total: this.filterObj.refund // 退款额度
      });
    }

  }
};
</script>
