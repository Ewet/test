<template>
    <div class="inventory-change">
      <Card :bordered="false">
            <span slot="title">库存变化</span>
            <!-- <Table border :columns="columns" :data="inventoryChangeItems" ></Table> -->
            <ZTable
              :columns="columns"
              :items="inventoryChangeItems"
              :loading="isLoading"
              :page="page"
              :total="total"
              :showPageBar="false"
              :pageChange="pageChange.bind(this)"
            />
      </Card>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AssociatedOrder',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '货区',
          key: 'cargoArea',
          minWidth: 80
        },
        {
          title: '初始库存',
          key: 'initialStock',
          minWidth: 80
        },
        {
          title: '离开时库存',
          key: 'leavingStock',
          minWidth: 80
        },
        {
          title: '时间',
          key: 'time',
          minWidth: 80
        }
      ],
      inventoryChangeItems: []
    };
  },
  watch: {
    'formData.inventoryChange': function (val) {
      this.inventoryChangeItems = val || [];
    }
  }
};
</script>
<style lang="less" scope>
.inventory-change {
  background-color: #fff;
  .ivu-card-head span {
    font-weight: bold;
  }
}

</style>
