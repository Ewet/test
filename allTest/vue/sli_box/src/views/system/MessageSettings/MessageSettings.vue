
<template>
 <div class="order-list">
    <ModuleHeader title="消息设置">
      </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content" style="height:100%;overflow:auto"/>

    <Modal
        :value="showModal"
        :title="'推送时段设置'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        width="480"
        >
        <Edit/>
    </Modal>

 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import Edit from './Edit';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageSettingsIndex',
  data () {
    return {
    };
  },
  components: {
    List,
    Toolbar,
    Edit
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
