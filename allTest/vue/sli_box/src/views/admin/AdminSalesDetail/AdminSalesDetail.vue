<template>
    <div style="min-height:420px">
      <ModuleHeader title="销售明细">
      </ModuleHeader>
      <Toolbar />
      <List
        slot="content"
        style="height:100%;overflow:auto"
        />
      <!-- <Table
        border
        :columns="columns"
        :data="items"
        :loading ="isLoading">
      </Table>
      -->
      <div style="float: right;margin-top:10px">
          <Page
            :current="page"
            :total="total"
            :show-total="true"
            @on-change="num => pageChange(num)"
          ></Page>
      </div>
      <!-- <OrderDetailModal
      :orderSn="orderSn"
      v-model="showOrder">
    </OrderDetailModal> -->
      <!-- <Modal
        title="订单详情"
        :value="showOrderDetail"
        :footer-hide = "true"
        style="z-index:1001;"
        @on-cancel="setOrderDetailModal(false)"
       >
        <OrderDetail  :orderData="orderData"/>
    </Modal> -->
    </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    List,
    Toolbar
  },
  name: 'SalesDetailIndex',
  data () {
    return {
      showOrder: false,
      orderSn: ''
    };
  },
  mounted () {
    // this.pageChange(1);
  },
  methods: {
    // viewOrderDetail (orderSn) {
    //   console.log(orderSn);
    //   this.showOrder = true;
    //   this.orderSn = orderSn;
    // }
    // refresh () {
    //   this.reload();
    // }
  }

};
</script>
<style lang="less">
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
