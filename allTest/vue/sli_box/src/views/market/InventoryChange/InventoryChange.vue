<template>
  <div class='inventoryChange'>
    <ModuleHeader title="库存变动记录列表">
    </ModuleHeader>
    <Form></Form>
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
    />
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Form from './Form';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'InventoryChange',
  data () {
    return {
      columns: [
        {
          title: '盒子编号',
          key: 'boxNum'
        },
        {
          title: '货区编号',
          key: 'layerNum',
          width: 100
        },
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '变动前库存量',
          key: 'from',
          width: 150
        },
        {
          title: '变动数量',
          key: 'changeNum',
          width: 100
        },
        {
          title: '变动后库存量',
          key: 'to',
          width: 150
        },
        {
          title: '记录时间',
          key: 'createdFormatted'
        },
        {
          title: '操作类型',
          key: 'typeFormatted',
          width: 160
        },
        {
          title: '订单编号',
          key: 'orderSn'
        }
      ]
    };
  },
  components: {
    Form
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
<style scoped>

</style>
