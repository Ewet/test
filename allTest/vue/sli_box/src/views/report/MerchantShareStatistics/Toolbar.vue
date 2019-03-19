<template>
   <div>
     <Form inline class="toolBarForm">
        <FormItem label='商户名称'>
             <MerchantSelectInput v-model="filterObj.merchantName" ></MerchantSelectInput>
        </FormItem>
        <FormItem label='统计月份' style="width: 296px;">
          <DatePicker v-model="filterObj.statisticalMonth" type="month" placeholder="统计月份" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem style="width: 310px;margin-left: -28px;">
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportBtn @click="handleExport"/>
        </FormItem>
    </Form>
   </div>
</template>

<script>
import { findComponentDownward } from 'utils/assist';
import vuexMixins from 'mixins/module-map';
import { exportList } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantShareStatisticsTlbar',
  components: {
  },
  data () {
    return {
      filterObj: {
        merchantName: '',
        statisticalMonth: ''
      }
    };
  },
  mounted () {
  },
  methods: {
    resetMerchant () {
      const child = findComponentDownward(this, 'MerchantSelectInput');
      if (child) {
        child.resetText();
      }
    },

    handleRefresh () {
      this.reload();
    },

    handleSubmit () {
      let statisticalMonth = this.filterObj.statisticalMonth ? this.$formatTime(this.filterObj.statisticalMonth, 'ym') : '';
      this.filterData({
        merchant_name: this.filterObj.merchantName,
        time: statisticalMonth
      });
    },
    handleReset () {
      this.resetMerchant();
      this.filterObj = {
        merchantName: '',
        statisticalMonth: ''
      };
      this.clearFilter();
    },
    handleExport () {
      let statisticalMonth = this.filterObj.statisticalMonth ? this.$formatTime(this.filterObj.statisticalMonth, 'ym') : '';
      exportList({
        merchant_name: this.filterObj.merchantName,
        time: statisticalMonth
      });
    }
  }
};
</script>

<style scoped lang='less'>
</style>
