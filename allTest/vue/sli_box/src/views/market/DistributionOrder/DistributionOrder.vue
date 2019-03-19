<!--分销订单-->
<template>
 <div>
    <ModuleHeader title="分销订单">
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
  name: 'DistributionOrderIndex',
  components: {
    List,
    Toolbar
  }
};
</script>
