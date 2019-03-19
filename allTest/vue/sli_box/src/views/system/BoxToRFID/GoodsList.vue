<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" ></Table> -->
      <!-- <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        /> -->
      <Table height="570" border :columns="columns" :data="goodsItems" ></Table>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getRfidDetails } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxToRFIDGoodsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '分类',
          key: 'gcateName'
        },
        {
          title: 'bom码',
          key: 'bom'
        },
        {
          title: '市场价',
          key: 'marketPrice'
        },
        {
          title: '建议零售价',
          key: 'suggestPrice'
        },
        {
          title: '库存',
          key: 'quantity'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => h('div', [
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.viewQuantityDetail(params.row.goodsId);
                }
              }
            }, '库存详情')
          ])
        }],
      goodsItems: []
    };
  },
  mounted () {
    // this.loadData();
  },
  methods: {
    async loadData () {
      // this.isloading = true;
      const { success, data, msg } = await getRfidDetails({
        box_id: this.boxId //
      });
      if (success) {
        console.log(data);
        this.goodsItems = data.items;
      } else {
        this.$error(msg);
      }
      // this.isloading = false;
    }
  },
  watch: {
    showModal (val) {
      if (val) {
        this.loadData();
      }
    }
  }
};
</script>
