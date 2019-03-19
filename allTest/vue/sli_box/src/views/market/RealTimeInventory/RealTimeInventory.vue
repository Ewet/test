<!--实时库存列表-->
<template>
 <div class="coupon-list">
   <ModuleHeader title="实时库存列表">
   </ModuleHeader>
    <Toolbar />
    <List slot="content" style="height:100%;overflow:auto"/>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
    };
  },
  methods: {
  },
  components: {
    List,
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
.remark {
    padding: 5px 10px;
    background: skyblue;
    color: #fff;
    margin: 10px auto;
}
</style>
