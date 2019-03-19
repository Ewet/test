<!--提现流水记录列表-->
<template>
 <div class="cash-flow-list">
    <ModuleHeader :title="title">
    </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content" style="height:100%;overflow:auto"/>
 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CashFlowRecordListIndex',
  data () {
    return {
      title: '提现流水记录列表'
    };
  },
  components: {
    List,
    Toolbar
  }
};
</script>
<style scoped lang="less">
.cash-flow-list {
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
