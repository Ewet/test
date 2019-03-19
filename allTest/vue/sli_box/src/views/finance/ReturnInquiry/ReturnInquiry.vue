<template>
    <div style="min-height:420px">
      <ModuleHeader title="退货查询">
    </ModuleHeader>
      <Toolbar />
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
    <OrderDetailModal
      :orderSn="orderSn"
      v-model="showOrder">
    </OrderDetailModal>
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
  name: 'RefundInquiry',
  data () {
    return {
      columns: [
        {
          title: '盒子id',
          key: 'boxId',
          minWidth: 80
        },
        {
          title: '会员id',
          key: 'userId',
          minWidth: 80
        },
        {
          title: '订单类型',
          key: 'orderType',
          minWidth: 80
        },
        {
          title: '退货时间',
          key: 'returnTime',
          minWidth: 130
        },
        {
          title: '退货单号',
          key: 'refundId',
          minWidth: 80,
          render: (h, params) => h('div', [
            h('a', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  this.$openReturnDetail({
                    returnId: params.row.refundId
                  });
                }
              }
            }, params.row.refundId)
          ])
        },
        {
          title: '退货数量',
          key: 'quantity',
          minWidth: 80
        },
        {
          title: '退款（元）',
          key: 'refundAmount',
          minWidth: 80
        },
        {
          title: '订单号',
          key: 'orderSn',
          minWidth: 90,
          render: (h, params) => h('div', [
            h('a', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  // this.orderSn = params.row.orderSn;
                  // this.showOrder = true;
                  this.$openOrderDetail({
                    orderSn: params.row.orderSn
                  });
                }
              }
            }, params.row.orderSn)
          ])
        },
        {
          title: '支付方式',
          key: 'paymentMethod',
          minWidth: 80
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 120
        },
        {
          title: '审批备注',
          key: 'refundDesc',
          minWidth: 120

        }
      ],
      showOrder: false,
      orderSn: ''
    };
  },
  mounted () {
    this.setInternalFilter();
    this.pageChange(1);
  }
};
</script>
