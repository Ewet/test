<template>
    <div style="min-height:420px">
      <ModuleHeader title="待复核">
      </ModuleHeader>
      <Form inline style="text-align:left">
        <RefreshBtn @click="handleRefresh"/>
      </Form>
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
import { checkItem } from 'views/finance/PendingConfirmed/model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchaseRefund',
  data () {
    return {
    //   containerHeight: 0,
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
          minWidth: 80,
          render: (h, params) => h('div', [
            h('a', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  // this.viewOrderItem(params.row.orderSn);
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
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 150,
          align: 'center',
          render: (h, params) => h('div', [
            h('ConfirmBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.check(params.row.refundId);
                }
              }
            }, '确认')
          ])
        }
      ],
      // items: [],
      // total: 0,
      showReturnModal: false,
      showGoodsModal: false
    };
  },
  mounted () {
    this.setInternalFilter({
      refund_status: '20'
    });
    this.pageChange(1);
    // this.loadData();
  },
  methods: {
    check (refundId) {
      this.$m_confirm({
        title: '确定要通过吗？',
        content: '',
        onOk: () => {
          checkItem(refundId).then(({ success, msg }) => {
            if (success) {
              this.$success('通过成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `通过失败${msg}`
              });
            }
          });
        }
      });
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
