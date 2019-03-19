<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" :loading="isLoading"></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
      <!-- <OrderDetailModal
      v-model="showOrderModal"
      :orderId="orderId"
    /> -->
    <!-- <Modal
        title="订单详情"
        :value="showOrderDetail"
        :footer-hide = "true"
        style="z-index:1001;"
        @on-cancel="setOrderDetailModal(false)">
        <OrderDetail  :orderData="orderData"/>
    </Modal> -->
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { updateItem, addressPrompt } from 'views/report/WeChatwinningRecord/model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatwinningRecordList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '中奖时间',
          key: 'wonTimeFromat',
          minWidth: 150
        },
        {
          title: '活动名称',
          key: 'activityName',
          minWidth: 130
        },
        {
          title: '用户名称',
          key: 'realname',
          minWidth: 100
        },
        {
          title: '用户ID',
          key: 'userId',
          minWidth: 120
        },
        {
          title: '奖品类型',
          key: 'prizeTypeFormat',
          minWidth: 120
        },
        {
          title: '奖品名称',
          key: 'prizeName',
          minWidth: 100
        },
        {
          title: '是否满七天',
          key: 'fullSevenDays',
          minWidth: 80
        },
        {
          title: '订单号',
          key: 'orderSn',
          minWidth: 160,
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
          title: '发放状态',
          key: 'statusFormat',
          minWidth: 90
        },
        {
          title: '兑奖信息',
          key: 'redemptionMsg',
          minWidth: 150
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            const action = [];
            // let status = params.row.status;
            const prizeType = params.row.prizeType;
            const cashingInformation = params.row.cashingInformation;
            action.push(h('RemarkBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.edit(params.row);
                }
              }
            }, '备注'));
            if (prizeType === 3 && !cashingInformation) {
              action.push(h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.send(params.row.winnerId);
                  }
                }
              }, '发送通知'));
            }
            return h('div', action);
          }
        }
      ],
      remakeEdit: ''
      // orderId: '',
      // showOrderModal: false
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    // showOrderDetail (row) {
    //   this.showOrderModal = true;
    //   this.orderId = row.orderId;
    // },
    edit (params) {
      this.remakeEdit = params.remark;
      this.$m_confirm({
        render: h => h('Input', {
          props: {
            value: this.remakeEdit,
            type: 'textarea',
            autofocus: true,
            maxlength: 50,
            rows: 4,
            placeholder: '不超过50个中文字符'
          },
          on: {
            input: (val) => {
              // console.log(val);
              this.remakeEdit = val;
            }
          }
        }),
        onOk: () => {
          updateItem({
            winner_id: params.winnerId,
            remark: this.remakeEdit
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('操作成功!');
              this.remakeEdit = '';
              this.reload();
            } else if (msg) {
              this.$error({
                content: msg
              });
            }
          });
        }
      });
    },
    send (id) {
      addressPrompt(id).then(({ success, msg }) => {
        if (success) {
          this.$success('提醒填写收货地址成功!');
        } else if (msg) {
          this.$error({
            content: msg
          });
        }
      });
    }
  }
};
</script>
