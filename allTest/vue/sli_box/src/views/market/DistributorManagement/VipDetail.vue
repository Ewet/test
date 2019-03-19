<template>
  <div class="goods-detail">
    <Spin size="large" fix v-show="spinShow"></Spin>
    <Table border :columns="columns" :data="items"></Table>
  </div>
</template>
<script>
import { getGoodsDetail } from 'views/market/Order/model';

export default {
  name: 'GoodsDetailIndex',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '会员类型',
          key: 'memberType',
          minWidth: 220
        },
        {
          title: '有效期',
          key: 'validityPeriod',
          minWidth: 80
        },
        {
          title: '来源',
          key: 'source',
          minWidth: 80
        },
        {
          title: '会员创建时间',
          key: 'createTime',
          minWidth: 80
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 80
        }
      ],
      spinShow: false
    };
  },
  methods: {
    loadData () {
      this.spinShow = true;
      getGoodsDetail(this.orderId).then((result) => {
        if (result.success) {
          this.items = result.data;
        } else if (result.msg) {
          this.$error({
            content: `获取数据失败${result.msg}`
          });
        }
        this.spinShow = false;
      });
    }
  },
  watch: {
    orderId (val) {
      if (this.orderId) {
        // this.loadData();
      }
    }
  }
};
</script>
