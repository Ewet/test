<template>
<Table height="400" highlight-row ref="currentRowTable" :columns="columns" :data="dataList"></Table>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'OrderCorrectionEdit',
  data () {
    return {
      dataList: [],
      columns: [
        {
          title: '商品名称',
          key: 'goodsName',
          minWidth: 100
        },
        {
          title: '商品BOM',
          key: 'goodsBom',
          minWidth: 50
        },
        {
          title: '数量',
          key: 'quantity',
          minWidth: 50
        },
        {
          title: '单价',
          key: 'unitPrice',
          minWidth: 50
        },
        {
          title: '实付金额',
          key: 'paid',
          minWidth: 50
        },
        {
          title: '置换商品',
          key: 'replacementCommodity',
          minWidth: 100
        },
        {
          title: '置换商品单价',
          key: 'replacementUnitPrice',
          minWidth: 80
        },
        {
          title: '金额',
          key: 'amount',
          minWidth: 50
        },
        {
          title: '备注',
          key: 'replacement',
          minWidth: 100
        }
      ]
    };
  },
  methods: {
  },
  watch: {
    formData (val) {
      if (Object.keys(val).length > 0) {
        this.dataList = val.items;
      }
    },
    showModal (val) {
      if (!val) {
        this.setOrderSn('');
      }
    }
  }
};
</script>
<style lang="less">

</style>
