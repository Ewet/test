<template>
    <div style="min-height:420px">
      <ListView :items="items"></ListView>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import ListView from './ListView';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantManagementList',
  data () {
    return {
      isloading: false
    };
  },
  mounted () {
    // this.pageChange(1);
  },
  components: {
    ListView
  }
};
</script>
