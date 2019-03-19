<template>
   <div class='firmwareManagement'>
    <ModuleHeader title="固件管理">
      <ZBtn slot="right" @click="addItem">添加固件</ZBtn>
    </ModuleHeader>
    <Toolbar></Toolbar>
    <List></List>
    <Modal
      :value="showModal"
      title="上传固件"
      :footerHide= "true"
      :mask-closable="false"
      @on-cancel="offModal"
      :width="600"
      >
      <Edit/>
    </Modal>
    </Modal>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import List from './List';
import Edit from './Edit';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'FirmwareManagement',
  data () {
    return {

    };
  },
  components: {
    Toolbar,
    List,
    Edit
  },
  methods: {
    offModal () {
      this.$g_emit('clearUpLoadsModal');
    }
  }
};
</script>

<style scoped>
</style>
