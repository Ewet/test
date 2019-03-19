<template>
  <div>
    <ModuleHeader title="分销商管理">
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
  name: 'DistributorManagementIndex',
  components: {
    List,
    Toolbar
  },
  created () {
    this.$Bus.$on('distributeManageSaveSuccess', this.loadData);
  },
  beforeDestroy () {
    this.$Bus.$off('distributeManageSaveSuccess', this.loadData);
  }
};
</script>
