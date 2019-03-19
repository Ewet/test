<template>
    <div style="min-height:420px">
      <ModuleHeader title="待确认">
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
import { auditApply } from 'views/finance/PendingConfirmed/model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Confirmed',
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
            h('PassBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.refund(params.row.refundId);
                }
              }
            }, '通过'),
            h('NoPassBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.edit(params.row.refundId);
                }
              }
            }, '不通过')
          ])
        }
      ],
      reasonText: '',
      showReturnModal: false,
      showOrderModal: false
    };
  },
  mounted () {
    this.setInternalFilter({
      refund_status: '1'
    });
    this.pageChange(1);
  },
  methods: {
    handleRefresh () {
      this.reload();
    },
    refund (refundId) {
      this.$m_confirm({
        title: '确定要通过吗？',
        content: '',
        onOk: () => {
          auditApply({
            refund_id: refundId
          }).then(({ success, msg }) => {
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
    edit (refundId) {
      this.$m_confirm({
        render: h => h('Input', {
          props: {
            value: this.reasonText,
            type: 'textarea',
            autofocus: true,
            rows: 4,
            placeholder: '请输入理由：'
          },
          on: {
            input: (val) => {
              this.reasonText = val;
            }
          }
        }),
        onOk: () => {
          auditApply({
            refund_id: refundId,
            is_pass: 0,
            refund_desc: this.reasonText
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('操作成功!');
              this.reasonText = '';
              this.reload();
            } else if (msg) {
              this.$error({
                content: `操作失败${msg}`
              });
            }
          });
        }
      });
    }
  }

};
</script>
