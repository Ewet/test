<template>
    <div style="min-height:420px">
      <ModuleHeader title="备货报表">
      </ModuleHeader>
      <Toolbar />
      <Table height='500'  border :columns="columns" :data="items" :loading = isLoading ></Table>
      <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :page-size="pageSize" :show-total="true" @on-change="num => pageChange(num)" ></Page>
      </div>
    </div>
</template>
<script>

import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar
  },
  name: 'StockingReportIndex',
  data () {
    return {
    //   containerHeight: 0,
      columns: [
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 80
        },
        {
          title: '货区编号',
          key: 'layerNo',
          minWidth: 80
        },
        {
          title: '商品名称',
          key: 'goodsName',
          minWidth: 80
        },
        {
          title: '总存量',
          key: 'numberOfCells',
          minWidth: 130
        },
        {
          title: '现存量',
          key: 'quantity',
          minWidth: 80
        },
        {
          title: '计划补货量',
          key: 'planQuantity',
          minWidth: 80
        }
      ]
    };
  },
  mounted () {
    this.setInternalFilter();
    // this.pageChange(1);
    // this.loadData();
  },
  methods: {
  }

};
</script>
