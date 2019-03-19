<template>
    <div class="associated-order">
       <Card :bordered="false">
            <span slot="title">订单详情</span>
            <!-- <Table border :columns="columns" :data="assosiatedOrderItems" ></Table> -->
        <ZTable
          :columns="columns"
          :items="assosiatedOrderItems"
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
  mixins: [vuexMixins({ moduleName: STORE_NAME, state: ['showOrderDetail'], action: ['viewOrderItem'] })],
  name: 'AssociatedOrder',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          key: 'num',
          minWidth: 60,
          render: (h, params) => h('span', params.index + 1)
        },
        {
          title: '订单编号',
          key: 'orderNum',
          minWidth: 100
        },
        {
          title: '订单类型',
          key: 'orderType',
          minWidth: 100
        },
        {
          title: '支付状态',
          key: 'status',
          minWidth: 100
        },
        {
          title: '金额',
          key: 'orderTotal',
          minWidth: 80
        },
        {
          title: '下单时间',
          key: 'orderTime',
          minWidth: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => h('div', [
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$openOrderDetail({
                    orderSn: params.row.orderSn
                  });
                }
              }
            }, '查看详情')
          ])
        }
      ],
      assosiatedOrderItems: []
    };
  },
  watch: {
    'formData.orderList': function (val) {
      this.assosiatedOrderItems = val || [];
    }
  }
};
</script>
<style lang="less" scope>
.associated-order {
  background-color: #fff;
  .ivu-card-head span {
    font-weight: bold;
  }
}

</style>
