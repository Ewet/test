<template>
   <div class="order">
        <ModuleHeader title="订单列表">
          <Button type="primary" @click="setSupplyOrderModal(true)" slot="right">补充订单</Button>
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
        <Modal
          title="补充订单"
          :value="showSupplyOrderModal"
          :footer-hide = "true"
          width="900"
          :mask-closable="false"
          @on-cancel="offSupplyOrderModal">
          <SupplyOrder />
        </Modal>

        <!-- <Modal
          title="订单详情"
          :value="showOrderDetail"
          :footer-hide = "true"
          style="z-index:1001;"
          :width="800"
          @on-cancel="setOrderDetailModal(false)">
          <OrderDetail :orderData="orderData">
            <Note
              :orderId="orderData.orderId"
              ></Note>
          </OrderDetail>
        </Modal> -->

        <Modal
          title="选择盒子"
          :value="showBoxModal"
          :footer-hide = "true"
          width=800
          @on-cancel="offBoxModal">
          <BoxSelect @itemSelect="boxNoSelect"/>
        </Modal>
   </div>
</template>

<script>
import apiCancelOrder from 'views/market/Order/api/cancel-order';
import vuexMixins from 'mixins/module-map';
import Form from './Form';
import SupplyOrder from './SupplyOrder';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Order',
  components: {
    Form,
    SupplyOrder
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    openCancelDialog (orderId) {
      this.reasonText = '';
      this.$Modal.confirm({
        render: h => h('Input', {
          props: {
            value: this.reasonText,
            type: 'textarea',
            autofocus: true,
            maxlength: 225,
            rows: 4,
            placeholder: '请输入取消订单理由'
          },
          on: {
            input: (val) => {
              this.reasonText = val;
            }
          }
        }),
        onOk: () => {
          this.cancelItem(orderId);
        }
      });
    },
    cancelItem (orderId) {
      if (!this.reasonText.trim()) {
        this.$error('请输入取消订单的理由');
        return false;
      }
      apiCancelOrder({
        order_id: orderId,
        note: this.reasonText
      }).then((res) => {
        if (res.success === true) {
          this.$success('该订单已取消！');
          this.pageChange(this.page);
        }
      });
    },
    boxNoSelect (row) {
      this.$g_emit('supplyOrderBoxNoSelect', row);
    },
    offBoxModal () {
      this.$Bus.$emit('refreshBoxList');
      this.setBoxModal(false);
    },
    offSupplyOrderModal () {
      this.$g_emit('clearSupplyOrderModal');
      this.setSupplyOrderModal(false);
    }
  },
  data () {
    return {
      columns: [
        {
          title: '商户名称',
          key: 'name',
          tooltip: true
        },
        {
          title: '盒子编号',
          key: 'boxNum'
        },
        {
          title: '订单号',
          key: 'orderNum'
        },
        {
          title: '下单时间',
          key: 'orderTime',
          width: 150
        },
        {
          title: '订单类型',
          key: 'orderTyle',
          width: 100
        },
        {
          title: '订单总额',
          key: 'orderTotal',
          width: 150
        },
        {
          title: '状态',
          key: 'orderStyle'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(
              h('ViewDetailsBtn', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px',
                  marginTop: '2px'
                },
                on: {
                  click: () => {
                    this.$openOrderDetail({
                      orderSn: params.row.orderNum
                    });
                  }
                }
              }, '查看详情')
            );
            const status = params.row.status;
            if (status === 10 || status === 15) {
              action.push(
                h('CancelOrderBtn', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px',
                    marginTop: '2px'
                  },
                  on: {
                    click: () => {
                      this.openCancelDialog(params.row.orderId);
                    }
                  }
                }, '取消订单')
              );
            }
            return h('div', action);
          }
        }
      ],
      reasonText: ''
    };
  }

};
</script>

<style scoped>
</style>
