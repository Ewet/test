<template>
    <div style="min-height:420px">
      <ModuleHeader title="我的消息">
      </ModuleHeader>
      <Toolbar />
      <List/>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import List from './List';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    List,
    Toolbar
  },
  name: 'MyMessageIndex',
  created () {
    this.setInternalFilter({
      isMine: '1'
    });
  }
};
</script>
<style lang="less">
// .skyblue{
//   color:skyblue;
// }
</style>
