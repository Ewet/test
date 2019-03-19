
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='商户名称'>
          <span @click="merchantNameClick($event)">
            <Input type="text" v-model="filterObj.merchantName" clearable readonly placeholder="请输入商户名称"></Input>
          </span>
        </FormItem>
        <FormItem class="datePicker" label='销售时间'>
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.saleTime"
          type="datetimerange"
          placeholder="销售时间"
          @on-clear="setSaleTime"></DatePicker>
        </FormItem>
        <FormItem label='商品名称'>
            <span @click="goodsNameClick($event)">
              <Input @on-click.stop  placeholder="商品名称" readonly clearable v-model="filterObj.goodsName"></Input>
            </span>
        </FormItem>
        <FormItem style="width: 210px;">
          <Checkbox
            v-model="filterObj.isCoupon"
            :true-value="1"
            :false-value="0"
          >优惠劵</Checkbox>

          <Checkbox
            v-model="filterObj.isDeduction"
            :true-value="1"
            :false-value="0"
          >随机减</Checkbox>

          <Checkbox
            v-model="filterObj.isRefund"
            :true-value="1"
            :false-value="0"
          >退款</Checkbox>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportReportBtn @click="showExport"/>
        </FormItem>
        <Modal
        title="选择商品"
        v-model="showGoodsModal"
        :footer-hide = "true"
        style="z-index:1001;"
        >
        <GoodsSelect @itemSelect="goodsNameSelect"/>
      </Modal>
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
import { getExcel } from 'views/report/SalesDetail/model';
import fecha from 'fecha';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ReplenishmentReportToolbar',
  data () {
    return {
      showMerchantModal: false,
      showGoodsModal: false,
      showExportModal: false,
      filterObj: {
        merchantName: '',
        saleTime: this.timeInitialize(),
        goodsName: '',
        isCoupon: 0,
        isDeduction: 0,
        isRefund: 0
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
      if (this.filterObj.saleTime.length > 0) {
        const time = this.timeFormat(this.filterObj.saleTime);
        tmp.push({ text: `销售时间：${time[0]}~${time[1]}`, value: time, name: 'saleTime' });
      }
      if (this.filterObj.goodsName) {
        tmp.push({ text: this.filterObj.goodsName, value: this.filterObj.goodsName, name: 'goods_name' });
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
    // 获取[一周前-当前时间]时间段数组
    timeInitialize () {
      const time = new Date().getTime();
      const end = (7 * 24 * 60 * 60 * 1000);
      const dt = time - end;
      return [new Date(dt), new Date(time)];
    },
    // 时间格式化
    timeFormat (date) {
      let startTime = '';
      let endTime = '';
      if (date.length && date.every(x => !!x) > 0) {
        startTime = fecha.format(date[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(date[1], 'YYYY-MM-DD HH:mm:ss');
      }
      return [startTime, endTime];
    },
    setSaleTime () {
      this.$nextTick(() => {
        this.filterObj.saleTime = [];
      });
    },
    handleSubmit () {
      const time = this.timeFormat(this.filterObj.saleTime);
      this.filterData(Object.assign({
        name: this.filterObj.merchantName,
        goods_name: this.filterObj.goodsName,
        coupon_deduction: this.filterObj.isCoupon,
        random_deduction: this.filterObj.isDeduction,
        refunded_total: this.filterObj.isRefund,
        time_pricing_begin: time[0],
        time_pricing_end: time[1]
      }));
    },
    handleReset () {
      this.filterObj = {
        merchantName: '',
        saleTime: this.timeInitialize(),
        goodsName: '',
        isCoupon: 0,
        isDeduction: 0,
        isRefund: 0
      };
      const time = this.timeFormat(this.timeInitialize());
      this.filterData({
        time_pricing_begin: time[0],
        time_pricing_end: time[1]
      });
    },
    handleRefresh () {
      this.reload();
    },
    handleExport (data) {
      this.$g_emit('export_report_clear');
      this.showExportModal = false;
      const tmp = data.items.reduce((x, y) => {
        if (y.name !== 'saleTime') {
          x[y.name] = y.value;
        } else if (y.name === 'saleTime') {
          x.time_pricing_begin = y.value[0];
          x.time_pricing_end = y.value[1];
        }
        return x;
      }, {});
      // console.log('sn', data.boxSn);
      // if (data.boxSn.trim()) {
      tmp.box_no = data.boxSn;
      // }
      // console.log('tmp', this.$filterParams(tmp));
      getExcel(this.$filterParams(tmp));
    },
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    goodsNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showGoodsModal = true;
    },
    merchantNameSelect (row) {
      this.filterObj.merchantName = row.merchantName;
      this.showMerchantModal = false;
    },
    goodsNameSelect (row) {
      this.filterObj.goodsName = row.goodsName;
      this.showGoodsModal = false;
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
    },
    showGoodsModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshGoodsList');
      }
    }
  }
};
</script>
