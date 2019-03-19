<!--随机立减规则列表-->
<template>
 <div class="order-list">
    <ModuleHeader :title="title">
        <Button type="primary" slot="right" @click="addItem">添加规则</Button>
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
  name: 'RandomRemissionRuleListIndex',
  data () {
    return {
      title: '随机立减活动规则列表'
    };
  },
  components: {
    List,
    Toolbar
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
