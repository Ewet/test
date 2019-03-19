<template>
    <div style="min-height:420px">
      <Table height="570" border :columns="columns" :data="quantityItems" ></Table>
      <!-- <ZTable
          :columns="columns"
          :items="quantityItems"
          :loading="isloading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        /> -->
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getQuantityList } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxToRFIDQuantityList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: 'rfid标识',
          key: 'RFID'
        },
        {
          title: '关联品名',
          key: 'gcateName'
        },
        {
          title: '上架时间',
          key: 'addedTimeFormatted'
        },
        {
          title: '上架员',
          key: 'replenisher'
        }],
      quantityItems: [],
      isloading: false,
      quantityTotal: 0,
      quantityPage: 1
    };
  },
  mounted () {
    // this.loadData();
  },
  methods: {
    async loadData () {
      this.isloading = true;
      const { success, data, msg } = await getQuantityList({
        goods_id: this.goodsId //
      });
      if (success) {
        console.log(data);
        this.quantityItems = data.items;
        this.quantityTotal = data.total;
        this.quantityPage = data.pageNum;
      } else {
        this.$error(msg);
      }
      this.isloading = false;
    }

  },
  watch: {
    showQuantityModal (val) {
      if (val) {
        this.loadData();
      }
    }
  }
};
</script>
