<template>
    <div style="min-height:420px" class="minitor-list">
      <!-- <Table border :columns="columns" :data="items" ></Table> -->
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
import vuexMixins from 'mixins/module-map';
import { changeRead } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MinitorList',
  data () {
    return {
      containerHeight: 0,
      columns: [{
        title: '盒子编号',
        key: 'boxNo'
      },
      {
        title: '微信昵称',
        key: 'wecharName'
      },
      {
        title: '顾客电话',
        key: 'customerMobile'
      },
      {
        title: '货位是否变动',
        key: 'hasLocationChange',
        render: (h, params) => h('Button', {
          props: {
            type: 'text'
          },
          on: {
            click: () => {
              this.viewItem(params.row.id);
            }
          },
          domProps: {
            innerHTML: params.row.hasLocationChange === '是' ? `<span style="color:red">${params.row.hasLocationChange}</span>` : params.row.hasLocationChange
          }
        })
      },
      {
        title: '关联订单',
        key: 'associatedOrder',
        minWidth: 80,
        render: (h, params) => {
          if (params.row.associatedOrder) {
            const btns = params.row.associatedOrder.split(',').map(x => h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  // this.viewOrderItem(x);
                  this.$openOrderDetail({
                    orderSn: x
                  });
                }
              }
            }, x));
            return h('div', btns);
          }
          return h('div');
        }
      },
      {
        title: '进入时间',
        key: 'entryTime'
      },
      {
        title: '离开时间',
        key: 'departureTime'
      },
      {
        title: '停留时长（分钟）',
        key: 'residenceTime'
      },
      {
        title: '库存变动',
        key: 'inventoryChange',
        render: (h, params) => {
          const val = params.row.inventoryChange;
          if (val === 0) {
            return h('span', {
              style: {
                color: 'gray'
              }
            }, val);
          } if (val > 0) {
            return h('span', {
              style: {
                color: 'green'
              }
            }, `增加 ${val}`);
          } if (val < 0) {
            return h('span', {
              style: {
                color: 'red'
              }
            }, `减少 ${-val}`);
          }
          return h('span', val);
        }
      },
      {
        title: '已读',
        key: 'isReaded',
        render: (h, params) => h('div', {
          style: {
            position: 'relative'
          }
        }, [h('i-switch', {
          props: {
            size: 'large',
            'true-value': 1,
            'false-value': 0,
            value: params.row.isReaded
          }
        }, [
          h('span', {
            slot: 'open',
            domProps: {
              innerHTML: '是'
            }
          }),
          h('span', {
            slot: 'close',
            domProps: {
              innerHTML: '否'
            }
          })
        ]), h('div', {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60px',
            height: '24px'
          },
          on: {
            click: () => {
              this.readChange(params.row);
            }
          }
        })])
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => h('div', [
          h('ZBtn', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.viewItem(params.row.id);
              }
            }
          }, '查看详情')
        ])
      }],
      showDetail: false,
      isloading: false
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    async readChange (row) {
      const newState = Number(!row.isReaded);
      const { success, msg } = await changeRead({
        event_id: row.id,
        is_read: newState
      });
      if (success) {
        this.$success('修改成功!');
        this.reload();
      } else {
        this.$error(msg);
      }
    }
  }
};
</script>
<style lang="less">
  .minitor-list {
    .ivu-btn-text:hover {
      background-color: none;
    }
    .ivu-btn-text:focus {
      box-shadow: none;
    }
  }
</style>
