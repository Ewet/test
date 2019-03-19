<template>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleRefresh"/>
      <FormItem label="商户名称">
              <Input type="text" v-model="filterObj.merchantName" placeholder="商户名称">
            </Input>
      </FormItem>
      <FormItem class="datePicker" label="下单日期">
         <DatePicker
         v-model="filterObj.createdTime"
         type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
         placeholder="下单日期"
         ></DatePicker>
      </FormItem>
      <FormItem label="订单号">
              <Input type="text" v-model="filterObj.orderSn" placeholder="订单号">
            </Input>
      </FormItem>
      <FormItem label="开票状态">
            <Select v-model="filterObj.invoiceState" clearable placeholder="开票状态">
                <Option
                v-for="(item,index) in invoiceStateOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
      </FormItem>
      <FormItem label="开票结果">
            <Select v-model="filterObj.invoiceResult" clearable placeholder="开票结果">
                <Option
                v-for="(item,index) in invoiceResultOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
      </FormItem>
      <FormItem label="开票类型">
            <Select v-model="filterObj.invoiceType" clearable placeholder="开票类型">
                <Option
                v-for="(item,index) in invoiceTypeOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
      </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
            <ExportDetailsBtn @click="handleExport"/>
        </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { exportReport } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'InvoiceDetailsToolbar',
  data () {
    return {
      filterObj: {
        merchantName: '', // 商户名称
        createdTime: [], // 下单日期
        orderSn: '', // 订单号
        invoiceState: '1', // 开票状态
        invoiceResult: '', // 开票结果
        invoiceType: '' // 开票类型
      },
      invoiceStateOptions: [
        { name: '已开票', value: '1' },
        { name: '未开票', value: '2' }
      ],
      invoiceResultOptions: [
        { name: '开票成功', value: '1' },
        { name: '开票失败', value: '2' }
      ],
      invoiceTypeOptions: [
        { name: '个人', value: '1' },
        { name: '企业', value: '2' }
      ]
    };
  },
  mounted () {
  },
  methods: {
    // 刷新
    handleRefresh () {
      this.reload();
    },
    // 查询
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      const createdTime = this.filterObj.createdTime;
      if (createdTime.length && createdTime.every(x => !!x) > 0) {
        startTime = this.$formatTime(createdTime[0]);
        endTime = this.$formatTime(createdTime[1]);
      }
      this.filterData(Object.assign({
        name: this.filterObj.merchantName,
        created_time_begin: startTime,
        created_time_end: endTime,
        order_sn: this.filterObj.orderSn,
        status: this.filterObj.invoiceState,
        wd_invoice_status: this.filterObj.invoiceResult,
        title_type: this.filterObj.invoiceType
      }));
    },
    // 重置
    handleReset () {
      this.filterObj = {
        merchantName: '', // 商户名称
        createdTime: [], // 下单日期
        orderSn: '', // 订单号
        invoiceState: '1', // 开票状态
        invoiceResult: '', // 开票结果
        invoiceType: '' // 开票类型
      };
      this.filterData({
        status: '1' // 开票状态
      });
    },

    // 导出明细
    handleExport () {
      let startTime = '';
      let endTime = '';
      const createdTime = this.filterObj.createdTime;
      if (createdTime.length && createdTime.every(x => !!x) > 0) {
        startTime = this.$formatTime(createdTime[0]);
        endTime = this.$formatTime(createdTime[1]);
      }
      exportReport({
        name: this.filterObj.merchantName,
        created_time_begin: startTime,
        created_time_end: endTime,
        order_sn: this.filterObj.orderSn,
        status: this.filterObj.invoiceState,
        wd_invoice_status: this.filterObj.invoiceResult,
        title_type: this.filterObj.invoiceType
      });
    }
  }
};
</script>
