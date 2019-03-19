<template>
    <div style="min-height:420px">
      <ModuleHeader title="通知中心">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
      <!-- <OrderDetailModal
      :orderSn="orderSn"
      v-model="showOrder">
    </OrderDetailModal> -->
    </div>
</template>
<script>
import { getItem, updateItem } from './model';
import vuexMixins from 'mixins/module-map';

import Toolbar from './Toolbar';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar
  },
  name: 'NotificationCenterIndex',
  data () {
    return {
    //   containerHeight: 0,
      columns: [
        {
          title: '日期',
          key: 'noticeDate',
          minWidth: 130
        },
        {
          title: '订单类型',
          key: 'orderTypeFormatted',
          minWidth: 80
        },
        {
          title: '通知类型',
          key: 'noticeTypeFormatted',
          minWidth: 80
        },
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 80
        },
        // {
        //   title: '通知内容',
        //   key: 'noticeContent',
        //   minWidth: 150
        // },
        {
          title: '通知内容',
          key: 'noticeContent',
          minWidth: 150,
          render: (h, params) => h('div', [
            h('a', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  this.viewOrderDetail(params.row.orderSn);
                }
              }
            }, params.row.noticeContent)
          ])
        },
        {
          title: '状态',
          key: 'isHandledFormatted',
          minWidth: 80
        },
        {
          title: '处理人',
          key: 'processingPerson',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            const action = [];
            const status = params.row.isHandled;
            // let id = params.row.id;
            if (status === 0) {
              action.push(h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.edit(params.row);
                  }
                }
              }, '备注'));
            } else {
              action.push(h('ViewBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.view(params.row);
                  }
                }
              }));
            }
            return h('div', action);
          }
        }
      ],
      remarkEdit: '',
      orderSn: '',
      showOrder: false
    };
  },
  mounted () {
    // this.pageChange(1);
  },
  methods: {
    viewOrderDetail (orderSn) {
      if (orderSn) {
        this.$openOrderDetail({
          orderSn
        });
        // this.showOrder = true;
        // this.orderSn = orderSn;
      } else {
        this.$error('没有可查看的订单详情');
      }
    },
    handleRefresh () {
      this.reload();
    },
    getRemark (messageId) {
      getItem(messageId).then(({ data, success, msg }) => {
        if (success) {
          // this.remarkEdit = data.remark;
          this.$Modal.confirm({
            title: '',
            content: `备注：${data.remark}`
          });
          // this.remarkEdit = '';
        } else if (msg) {
          this.$error({
            content: msg
          });
        }
      });
    },
    view (params) {
      this.getRemark(params.messageId);
    },
    edit (params) {
      // this.remarkEdit = params.remark;
      // this.getRemark(params.messageId);
      this.$m_confirm({
        render: h => h('div', [
          h('Input', {
            props: {
              value: this.remarkEdit,
              type: 'textarea',
              autofocus: true,
              maxlength: 50,
              rows: 4,
              placeholder: '不超过50个中文字符'
            },
            on: {
              input: (val) => {
                // console.log(val);
                this.remarkEdit = val;
              }
            }
          }),
          h('div', {
            style: {
              color: 'red',
              'line-height': '40px'
            }
          }, '只能保存一次，请谨慎填写')
        ]),
        onOk: () => {
          updateItem({
            message_id: params.messageId,
            remark: this.remarkEdit
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('操作成功!');
              this.remarkEdit = '';
              this.reload();
            } else if (msg) {
              this.$error({
                content: msg
              });
            }
          });
        }
      });
    }
  },
  watch: {
    showOrder (val) {
      if (!val) {
        this.orderSn = '';
      }
    }
  }

};
</script>
<style lang="less">
// .skyblue{
//   color:skyblue;
// }
</style>
