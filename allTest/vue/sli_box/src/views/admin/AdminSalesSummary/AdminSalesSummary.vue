<template>
    <div style="min-height:420px">
      <ModuleHeader title="收款汇总">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          height="530"
          :pageChange="pageChange.bind(this)"
        />
    </div>
</template>
<script>
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
// import fecha from 'fecha';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar
  },
  name: 'SalesSummaryIndex',
  data () {
    return {
      columns: [
        {
          title: '运营商',
          key: 'operatorName',
          minWidth: 120
        },
        {
          title: '商户',
          key: 'merchantName',
          minWidth: 120
        },
        {
          title: '编号',
          key: 'boxNo',
          minWidth: 100,
          align: 'center'
        },
        // {
        //   title: '收款时间',
        //   key: 'paidTimeFormatted',
        //   minWidth: 150
        // },
        {
          title: '优惠券(元)',
          key: 'couponDeduction',
          minWidth: 80
        },
        {
          title: '随机减(元)',
          key: 'randomDeduction',
          minWidth: 80
        },
        {
          title: '退款(元)',
          key: 'refundedTotal',
          minWidth: 80
        },
        {
          title: '实收(元)',
          key: 'paidAmount',
          minWidth: 80
        },
        {
          title: '发出奖励',
          key: 'amount',
          minWidth: 80
        },
        {
          title: '代购奖励',
          key: 'hotboom',
          minWidth: 80
        },
        {
          title: '会员佣金',
          key: 'member',
          minWidth: 80
        },
        {
          title: '特邀佣金',
          key: 'shareholders',
          minWidth: 80
        },
        {
          title: '抽奖奖励',
          key: 'events',
          minWidth: 80
        }
      ]

    };
  },
  mounted () {
    // this.pageChange(1);
  },
  methods: {
  },
  watch: {
  }

};
</script>
<style lang="less">
.red{
  color:red;
}
.qrcode{
  width:300px;
  margin:20px auto;
  text-align: center;
  h3{
    font-size: 24px;
  }
  img{
    width: 300px;
    height: 300px;
  }
  span{
    line-height: 30px;
  }
}
</style>
