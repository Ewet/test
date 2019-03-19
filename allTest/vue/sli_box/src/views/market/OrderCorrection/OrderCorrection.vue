<!--随机立减规则列表-->
<template>
 <div class="order-list">
    <ModuleHeader :title="title">
        <Button type="primary" @click="setAddRefundsModal(true)" slot="right">新增退收款</Button>
    </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content" style="height:100%;overflow:auto"/>
    <Modal
        :value="showModal"
        :title="`详情(订单号:${orderSn})`"
        :footerHide= "true"
        :mask-closable="false"
        :width="1200"
        @on-cancel="setModal(false)">
        <Edit/>
    </Modal>
    <Modal
        :width="1250"
        :value="showAddRefundsModal"
        :title="'新增退收款'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setAddRefundsModal(false)">
        <AddRefunds/>
    </Modal>
    <Modal
      title="选择商品"
      :value="showGoodsModal"
      :footer-hide = "true"
      style="z-index:1001;"
      @on-cancel="offGoodsSelect">
      <GoodsSelect @itemSelect="goodsNameSelect"/>
    </Modal>
 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import Edit from './Edit';
import AddRefunds from './AddRefunds';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'OrderCorrectionIndex',
  data () {
    return {
      title: '订单纠正列表'
    };
  },
  components: {
    List,
    Toolbar,
    Edit,
    AddRefunds
  },
  methods: {
    goodsNameSelect (row) {
      const data = {
        name: row.goodsName,
        pirce: row.price,
        goodsId: row.goodsId
      };
      this.$g_emit('orderCorrectionChangeGoods', data);
    },
    offGoodsSelect () {
      this.$Bus.$emit('refreshGoodsList');
      this.setGoodsModal(false);
    }
  }
};
</script>
<style scoped lang="less">

</style>
