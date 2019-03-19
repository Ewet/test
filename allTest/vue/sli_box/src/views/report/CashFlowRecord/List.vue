<template>
    <div style="min-height:520px">
     <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CashFlowRecordList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '日期',
          key: 'date',
          minWidth: 180
        },
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 100
        },
        {
          title: '商户名称',
          key: 'merchantName',
          minWidth: 100
        },
        {
          title: '会员ID',
          key: 'memeberId',
          minWidth: 100
        },
        {
          title: '会员名称',
          key: 'memberName',
          minWidth: 100
        },
        {
          title: '会员类型',
          key: 'traderTypeFormatted',
          width: 100
        },
        {
          title: '手机号码',
          key: 'mobile',
          minWidth: 110
        },
        {
          title: '订单号',
          key: 'orderSn',
          minWidth: 100
        },
        {
          title: '品名',
          key: 'productName',
          minWidth: 100
        },
        {
          title: '订单金额',
          key: 'orderAmount',
          minWidth: 90
        },
        {
          title: '数量',
          key: 'quantity',
          minWidth: 80
        },
        {
          title: '返点比例',
          key: 'rebateRatio',
          minWidth: 100
        },
        {
          title: '奖励类别',
          key: 'type',
          minWidth: 100
        },
        {
          title: '说明',
          key: 'desc',
          minWidth: 100
        },
        {
          title: '金额',
          key: 'amount',
          minWidth: 80
        }
      ]
    };
  },
  methods: {
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
<style>
</style>
