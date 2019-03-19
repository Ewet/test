<!--分销关系-->
<template>
  <div>
    <ModuleHeader title="分销关系">
    </ModuleHeader>
    <Toolbar slot="searchbar" @filterClick="filterClick"/>
    <List slot="content" style="height:100%;overflow:auto" :items="items" :loading="loading"/>
    <div style="float: right;margin-top:10px">
      <Page :total="total" :current="current" @on-change="changePage"></Page>
    </div>
  </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import { getList } from './model';

export default {
  name: 'DistributionRelationshipIndex',
  components: {
    List,
    Toolbar
  },
  data () {
    return {
      items: [],
      loading: false,
      total: 20,
      current: 1,
      filterObj: {}
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.loading = true;
      getList({ ...this.filterObj, 'pagination[page]': this.current }).then((result) => {
        if (result.success) {
          console.log(result.data);
          this.items = result.data.items;
          this.total = result.data.total;
        } else if (result.msg) {
          this.$error({
            content: `获取数据失败${result.msg}`
          });
        }
        this.loading = false;
      });
    },
    filterClick (filterObj) {
      console.log('过滤条件', filterObj);
      this.filterObj = filterObj;
      this.current = 1;
      this.loadData();
    },
    changePage (pageNum) {
      console.log('pageNum', pageNum);
      this.current = pageNum;
      this.loadData();
    }
  }
};
</script>
