<template>
    <div style="min-height:420px">
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
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'name'
        },
        {
          title: '盒子编码',
          key: 'boxNo'
        },
        {
          title: '盒子地址',
          key: 'address'
        },
        {
          title: '货区',
          key: 'layerNo'
        },
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '数量',
          key: 'quantity'
        }],
      isloading: true
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {

  }
};
</script>
