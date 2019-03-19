
<template>
    <Form inline  class="toolBarForm">
      <RefreshBtn @click="handleRefresh"/>
      <FormItem  label='所属商户'>
        <span @click="merchantNameClick($event)">
          <Input type="text" v-model="filterObj.merchantName" clearable readonly placeholder="请输入商户名称"></Input>
        </span>
      </FormItem>
        <FormItem  label='收款时间' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.receiptTime"
          type="datetimerange"
          placeholder="收款时间"
          style="width: 300px"
          @on-clear="setReceiptTime"></DatePicker>
        </FormItem>
        <FormItem style="width: 210px;">
        <Checkbox
          v-model="filterObj.isCoupon"
          :true-value="1"
          :false-value="null"
        >优惠劵</Checkbox>

        <Checkbox
          v-model="filterObj.isDeduction"
          :true-value="1"
          :false-value="null"
        >随机减</Checkbox>

        <Checkbox
          v-model="filterObj.isRefund"
          :true-value="1"
          :false-value="null"
        >退款</Checkbox>
      </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportReportBtn @click="showExport"/>
        </FormItem>
      <Modal
      title="选择商户"
      v-model="showMerchantModal"
      :footer-hide = "true"
      style="z-index:1001;"
      >
      <MerchantSelect @itemSelect="merchantNameSelect"/>
    </Modal>
      <Modal
      v-model="showExportModal"
      :footer-hide = "true"
      style="z-index:1001;"
      >
      <ExportReport
        :filterItems="filterItems"
        @export="handleExport"
      />
    </Modal>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getExcel } from 'views/report/SalesSummary/model';
import { getLastWeek } from 'utils/date';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'SalesSummaryToolbar',
  data () {
    return {
      showMerchantModal: false,
      showExportModal: false,
      filterObj: {
        merchantName: '',
        // receiptTime: [],
        receiptTime: getLastWeek({ returnType: 'string' }),
        isCoupon: null,
        isDeduction: null,
        isRefund: null
      },
      statusOptions: [],
      filterItems: []
    };
  },
  methods: {
    newGuid () {
      let guid = '';
      for (let i = 1; i <= 32; i++) {
        const n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { guid += '-'; }
      }
      return guid;
    },
    showExport (data) {
      const tmp = [];
      if (this.filterObj.merchantName) {
        tmp.push({ text: this.filterObj.merchantName, value: this.filterObj.merchantName, name: 'name' });
      }
      if (this.filterObj.receiptTime[0]) {
        const time = this.timeFormat(this.filterObj.receiptTime);
        tmp.push({ text: `收款时间：${time[0]}~${time[1]}`, value: time, name: 'receiptTime' });
      }
      if (this.filterObj.isCoupon) {
        tmp.push({ text: '优惠券', value: this.filterObj.isCoupon, name: 'coupon_deduction' });
      }
      if (this.filterObj.isDeduction) {
        tmp.push({ text: '随机减', value: this.filterObj.isDeduction, name: 'random_deduction' });
      }
      if (this.filterObj.isRefund) {
        tmp.push({ text: '退款', value: this.filterObj.isRefund, name: 'refunded_total' });
      }
      this.filterItems = tmp;
      this.showExportModal = true;
    },
    // 时间格式化
    timeFormat (date) {
      let startTime = '';
      let endTime = '';
      if (date.length && date.every(x => !!x) > 0) {
        startTime = this.$formatTime(date[0]);
        endTime = this.$formatTime(date[1]);
      }
      return [startTime, endTime];
    },
    setReceiptTime () {
      this.$nextTick(() => {
        this.filterObj.receiptTime = [];
      });
    },
    handleSubmit () {
      const time = this.timeFormat(this.filterObj.receiptTime);
      this.filterData(Object.assign({
        name: this.filterObj.merchantName,
        coupon_deduction: this.filterObj.isCoupon,
        random_deduction: this.filterObj.isDeduction,
        refunded_total: this.filterObj.isRefund,
        paid_time_begin: time[0],
        paid_time_end: time[1]
      }));
    },
    handleReset () {
      this.filterObj = {
        merchantName: '',
        // receiptTime: [],
        receiptTime: getLastWeek({ returnType: 'string' }),
        isCoupon: null,
        isDeduction: null,
        isRefund: null
      };
      const time = this.timeFormat(getLastWeek({ returnType: 'string' }));
      this.filterData({
        paid_time_begin: time[0],
        paid_time_end: time[1]
      });
    },
    handleRefresh () {
      this.reload();
    },
    handleExport (data) {
      this.$g_emit('export_report_clear');
      this.showExportModal = false;
      const tmp = data.items.reduce((x, y) => {
        if (y.name !== 'receiptTime') {
          x[y.name] = y.value;
        } else if (y.name === 'receiptTime') {
          x.paid_time_begin = y.value[0];
          x.paid_time_end = y.value[1];
        }
        return x;
      }, {});
      tmp.box_no = data.boxSn;
      getExcel(this.$filterParams(tmp));
    },
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    merchantNameSelect (row) {
      this.filterObj.merchantName = row.merchantName;
      this.showMerchantModal = false;
    }

  },
  mounted () {
    this.handleSubmit();
  },
  watch: {
    showMerchantModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshMerchantList');
      }
    }
  }
};
</script>
