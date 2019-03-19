<template>
   <div class="collectionDetailList">
       <Table border :columns="columns" :data="items" height='550' :loading = 'isLoading' >
        <div style="padding-left:10px;" slot='footer'>
          合计：
          <span>订单总金额&nbsp;{{totalAmountOrders}} 元</span>
          <span>实收总金额&nbsp;{{totalAmountReceived}} 元</span>
          <span>成本总金额&nbsp;{{totalCost}} 元</span>
          <span>毛利总金额&nbsp;{{grossGrossProfit}} 元</span>
          <span>总毛利率&nbsp;{{grossMargin}} %</span>
        </div>
      </Table>
      <div style="float: right;margin-top:10px">
        <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
      </div>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CollectionDetailList',
  data () {
    return {
      columns: [
        {
          title: '所属商户',
          key: 'merchantName',
          minWidth: 80
        },
        {
          title: '支付时间',
          key: 'payTime',
          minWidth: 80
        },
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 80
        },
        {
          title: '订单金额/元',
          key: 'orderAmount',
          minWidth: 80
        },
        {
          title: '实收金额/元',
          key: 'paidAmount',
          minWidth: 80
        },
        {
          title: '成本金额/元',
          key: 'costAmount',
          minWidth: 80
        },
        {
          title: '毛利金额/元',
          key: 'grossProfitAmount',
          minWidth: 80
        },
        {
          title: '毛利率/%',
          key: 'grossProfitMargin',
          minWidth: 80
        }
      ]
    };
  },
  mounted () {
    // this.pageChange(1);
  },
  components: {

  }
};
</script>

<style scoped lang='less'>
</style>
