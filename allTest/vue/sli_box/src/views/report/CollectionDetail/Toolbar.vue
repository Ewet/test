<template>
  <div class='form'>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='所属商户'>
          <span @click="merchantNameClick($event)">
            <Input type="text" v-model="filterObj.ownedMerchant" clearable readonly placeholder="请输入所属商户"></Input>
          </span>
        </FormItem>
        <FormItem label='支付时间' class="datePicker">
            <DatePicker type="datetimerange" v-model="filterObj.payTime" placeholder="请输入支付时间"></DatePicker>
        </FormItem>
        <FormItem style="width: 280px;">
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportReportBtn @click="showExport"/>
        </FormItem>
    </Form>
    <Modal
      title="选择商户"
      v-model="showMerchantModal"
      :footer-hide = "true"
      style="z-index:1001;"
      >
      <MerchantSelect @itemSelect="merchantNameSelect"/>
    </Modal>
    <Modal
        :value="showExportReportModal"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setExportReportModal">
        <ExportReport
          :filterItems="filterArray"
          @export="handleExport"
        />
      </Modal>
  </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getExcel } from 'views/report/CollectionDetail/model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
  },
  data () {
    return {
      showMerchantModal: false,
      showExportReportModal: false,
      filterObj: {
        ownedMerchant: '',
        payTime: []
      },
      filterArray: []
    };
  },
  mounted () {
    const timeArr = this.defaultTime();
    this.filterObj.payTime[0] = timeArr[0];
    this.filterObj.payTime[1] = timeArr[1];
    this.filterData({
      paid_time_begin: timeArr[0],
      paid_time_end: timeArr[1]
    });
  },
  methods: {
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    merchantNameSelect (row) {
      this.filterObj.ownedMerchant = row.merchantName;
      this.showMerchantModal = false;
    },
    defaultTime (data) {
      if (!data) {
        const time = new Date().getTime();
        const end = (7 * 24 * 60 * 60 * 1000);
        const dt = time - end;
        const startTiem = this.$formatTime(new Date(dt), 'ymd-hms');
        const endTime = this.$formatTime(new Date(time), 'ymd-hms');
        return [startTiem, endTime];
      }
      const startTiem = this.$formatTime(data[0], 'ymd-hms');
      const endTime = this.$formatTime(data[1], 'ymd-hms');
      return [startTiem, endTime];
    },
    handleSubmit () {
      const that = this.filterObj;
      if (that.payTime[0] === '' && that.payTime[1] === '') {
        this.filterData({
          name: that.ownedMerchant
        });
      } else {
        this.filterData({
          name: that.ownedMerchant,
          paid_time_begin: this.$formatTime(new Date(that.payTime[0]), 'ymd-hms'),
          paid_time_end: this.$formatTime(new Date(that.payTime[1]), 'ymd-hms')
        });
      }
    },
    handleReset () {
      const timeArr = this.defaultTime();
      this.filterObj = {
        ownedMerchant: '',
        payTime: timeArr
      };
      this.filterData({
        paid_time_begin: timeArr[0],
        paid_time_end: timeArr[1]
      });
    },
    handleRefresh () {
      this.reload();
    },
    setExportReportModal () {
      this.showExportReportModal = false;
    },
    showExport () {
      const that = this.filterObj;
      const exp = [];
      if (that.ownedMerchant !== '') {
        exp.push({ text: `所属商户：${that.ownedMerchant}`, value: that.ownedMerchant, name: 'name' });
      }
      if (that.payTime[0] !== '' && that.payTime[1] !== '') {
        const time = this.defaultTime(that.payTime);
        exp.push({ text: `支付时间：${time[0]}~${time[1]}`, value: time, name: 'payTime' });
      }
      this.filterArray = exp;
      this.showExportReportModal = true;
    },
    handleExport (data) {
      this.$g_emit('export_report_clear');
      this.showExportReportModal = false;
      const tmp = data.items.reduce((x, y) => {
        if (y.name !== 'payTime') {
          x[y.name] = y.value;
        } else if (y.name === 'payTime') {
          x.paid_time_begin = y.value[0];
          x.paid_time_end = y.value[1];
        }
        return x;
      }, {});
      tmp.box_no = data.boxSn.trim();
      getExcel(tmp);
    }
  }
};
</script>
