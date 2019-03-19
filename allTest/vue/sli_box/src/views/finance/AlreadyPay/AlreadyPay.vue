<!--提现申请-->
<template>
 <div>
    <ModuleHeader title="已打款">
    </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content"/>
    <!-- <div style="float: right;margin-top:10px">
      <Page :total="total" :current="page" @on-change="num => pageChange(num)"></Page>
    </div> -->
  </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AlreadyPayIndex',
  data () {
    return {
      title: ''
    };
  },
  mounted () {
    // this.setTitle();
    this.setInternalFilter({
      status: '2'
    });
    this.pageChange(1);
  },
  components: {
    List,
    Toolbar
  },
  methods: {
    filterClick (filterObj) {
      console.log('过滤条件', filterObj);
      this.filterObj = filterObj;
      this.current = 1;
      this.loadData();
    }
  },
  watch: {
  }
};
</script>
