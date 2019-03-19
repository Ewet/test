<template>
 <div class="order-list">
      <div style="text-align:right; padding: 0 5px 10px;">
      <Button type="primary" @click="editPrize('')">新增奖品</Button>
      </div>
    <List slot="content" style="height:100%;overflow:auto"/>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatprizeSettingsIndex',
  data () {
    return {
      title: ''
    };
  },
  methods: {
    editPrize (id) {
      this.prizeEdit(id);
    }
  },
  components: {
    List
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
