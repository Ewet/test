<template>
    <div style="min-height:420px">
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
  name: 'InvoiceDetailsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '商户名称',
          key: 'merchantName'
        },
        {
          title: '盒子编号',
          key: 'boxNo'
        },
        {
          title: '发票号码',
          key: 'invoiceNo'
        },
        {
          title: '下单日期',
          key: 'createdTime'
        },
        {
          title: '订单号',
          key: 'orderSn'
        },
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '商品数量',
          key: 'goodsNumber'
        },
        {
          title: '商品金额',
          key: 'goodsAmounts'
        },
        {
          title: '实付金额',
          key: 'actualPayment'
        },
        {
          title: '开票抬头',
          key: 'invoiceIssuing'
        },
        {
          title: '开票类型',
          key: 'invoiceType'
        },
        {
          title: '开票状态',
          key: 'invoiceState'
        },
        {
          title: '开票时间',
          key: 'invoiceTime'
        },
        {
          title: '开票结果',
          key: 'invoiceResult'
        }
      ]
    };
  },
  mounted () {
    this.filterData({
      status: '1' // 开票状态
    });
  }
};
</script>
