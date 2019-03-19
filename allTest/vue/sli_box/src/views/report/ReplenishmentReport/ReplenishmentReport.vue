<template>
    <div style="min-height:420px">
      <ModuleHeader title="补货报表">
      </ModuleHeader>
      <Toolbar />
       <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          height="600"
          :pageSize="pageSize"
        />
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
  name: 'ReplenishmentReportIndex',
  data () {
    return {
      columns: [
        {
          title: '补货时间',
          key: 'createdTime',
          minWidth: 80
        },
        {
          title: '补货员',
          key: 'name',
          minWidth: 80
        },
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
          title: '类型',
          key: 'detailType',
          minWidth: 80
        },
        {
          title: '商品名称',
          key: 'goodsName',
          minWidth: 100
        },
        {
          title: '总存量',
          key: 'numberOfCells',
          minWidth: 80
        },
        {
          title: '未补前存量',
          key: 'oldQuantity',
          minWidth: 80
        },
        {
          title: '补货量',
          key: 'replenishmentQuantity',
          minWidth: 80
        },
        {
          title: '补后存量',
          key: 'newQuantity',
          minWidth: 80
        }
      ]
      // showReturnModal: false,
      // showGoodsModal: false
    };
  }
};
</script>
