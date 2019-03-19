<!--代购规则列表-->
<template>
 <div class="order-list">
    <ModuleHeader :title="'代购规则'">
      <Button type="primary" slot="right" @click="addItem">添加规则</Button>
    </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content" style="height:100%;overflow:auto"/>
    <Modal
      :value="showModal"
      title="代购规则详情"
      :footerHide= "true"
      @on-cancel="setModal(false)"
      >
      <PurchasingRulesEdit/>
    </Modal>
 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';
import PurchasingRulesEdit from './Edit';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingRulesListIndex',
  data () {
    return {

    };
  },
  components: {
    List,
    Toolbar,
    PurchasingRulesEdit
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
