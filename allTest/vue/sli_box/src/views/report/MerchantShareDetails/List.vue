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
  name: 'MerchantShareDetailsIndex',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderSn',
          minWidth: 100
        },
        {
          title: '支付时间',
          key: 'paidTime',
          minWidth: 100
        },
        {
          title: '商品名称',
          key: 'goodsName',
          minWidth: 150
        },
        {
          title: '商品数量',
          key: 'quantity',
          minWidth: 80
        },
        {
          title: '单价',
          key: 'price',
          minWidth: 80
        },
        {
          title: '实付金额',
          key: 'actualPayment',
          minWidth: 100
        },
        {
          title: '退款金额',
          key: 'refundedMoney',
          minWidth: 100
        },
        {
          title: '分成规则',
          key: 'ruleName',
          minWidth: 150
        },

        {
          title: '分成比例',
          key: 'proportion',
          minWidth: 80
        },
        {
          title: '分成金额',
          key: 'shareAmount',
          minWidth: 100
        }
      ]
    };
  },
  mounted () {
  },
  methods: {
  }
};
</script>
