<template>
    <div class="mark-read">
        标记已读
        <i-switch v-model="read" size="large">
            <span slot="open">已读</span>
            <span slot="close">未读</span>
        </i-switch>
        <div class="mock" @click="readChange"></div>
    </div>
</template>
<script>
import { changeRead } from '../model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      read: true
    };
  },
  methods: {
    async readChange () {
      const newState = Number(!this.read);
      const { success, msg } = await changeRead({
        event_id: this.itemId,
        is_read: newState
      });
      if (success) {
        this.$success('修改成功!');
        this.read = !this.read;
        this.reload();
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    'formData.isRead': function (val) {
      this.read = val;
    }
  }
};
</script>
<style lang="less" scoped>
.mark-read {
  background-color:#fff;
  line-height: 36px;
  padding: 0 20px;
  position: relative;
  .mock {
    position: absolute;
    left:0;
    top:0;
    height:100%;
    width:150px;
    z-index: 1;
  }
}
</style>
