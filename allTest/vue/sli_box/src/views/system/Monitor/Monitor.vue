<template>
 <div class="coupon-list">
   <ModuleHeader title="防盗监控">
      </ModuleHeader>
        <Toolbar />
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
    <Modal
        :title="`监控详情(${formData.boxNo})`"
        :value="viewModal"
        :footer-hide = "true"
        :fullscreen = "true"
        @on-cancel="handleCloseMonitorDetial">
        <MonitorDetail/>
    </Modal>
    <!-- <Modal
        title="订单详情"
        :value="showOrderDetail"
        :footer-hide = "true"
        style="z-index:1001;"
        @on-cancel="setOrderDetailModal(false)"
        :orderData="orderData">
        <OrderDetail :orderData="orderData"/>
    </Modal> -->
    <!-- <OrderDetailModal
      :orderSn="orderSn"
      v-model="showOrder">
    </OrderDetailModal> -->
 </div>
</template>
<script>
import List from './List';
import MonitorDetail from './MonitorDetail';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MonitorIndex',
  data () {
    return {
      title: '',
      showMonitorDetail: false
    };
  },
  methods: {
    handleCloseMonitorDetial () {
      this.setViewModal(false);
      this.setFormData({});
    }
  },
  components: {
    List,
    MonitorDetail,
    Toolbar
  },
  watch: {
  }
};
</script>
<style scoped lang="less">
.coupon-list {
  header {
    position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    button {
      position: absolute;
      right: 0;
      top:0;
    }
  }
}
</style>
