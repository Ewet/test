<!--代购员管理列表-->
<template>
 <div class="order-list">
    <ModuleHeader :title="title">
      <Button type="primary" slot="right" @click="addItem">新增代购员</Button>
    </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content" style="height:100%;overflow:auto"/>
    <Modal
          title="选择盒子"
          :value="showBoxModal"
          :footer-hide = "true"
          style="z-index:1001;"
          width=800
          @on-cancel="setShowBoxModal(false)">
          <BoxSelect @itemSelect="boxNoSelect"/>
    </Modal>

 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingManagementIndex',
  data () {
    return {
      title: '代购员管理'
    };
  },
  methods: {
    boxNoSelect (row) {
      const boxRow = {
        merchantName: row.merchantName, // 商户名称
        boxNo: row.boxNo, // 盒子编码
        boxId: row.id // 盒子编码
      };
      this.addBox(boxRow);
      this.setShowBoxModal(false);
    }
  },
  components: {
    List,
    Toolbar
  },
  created () {
    this.$Bus.$on('purchasingRulesSaveSuccess', this.loadData);
  },
  beforeDestroy () {
    this.$Bus.$off('purchasingRulesSaveSuccess', this.loadData);
  }
};
</script>
<style scoped lang="less">
.order-list {
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
