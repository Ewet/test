<template>
    <div style="min-height:520px">
     <ZTable
          :columns="columns"
          :height="'500'"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
    </div>
</template>
<script>

import {
  switchBtn, retransmission, refunding, closeBtn
} from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'OrderCorrectionList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          minWidth: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'orderSn',
          minWidth: 180
        },
        {
          title: '盒子编码',
          key: 'boxNo',
          minWidth: 180
        },
        {
          title: '操作时间',
          key: 'operationTime',
          minWidth: 100
        },
        {
          title: '操作类型',
          key: 'operationType',
          minWidth: 80
        },
        {
          title: '金额',
          key: 'money',
          minWidth: 80
        },
        {
          title: '操作者',
          key: 'operator',
          minWidth: 80
        },
        {
          title: '操作状态',
          key: 'operationState',
          minWidth: 80
        },
        {
          title: '收/退款',
          key: 'switch',
          minWidth: 80,
          render: (h, params) => {
            const id = params.row.id;
            const switchState = params.row.switch;
            const operationStateBackstage = params.row.operationStateBackstage;
            return h('div', [
              h('ZSwitch', {
                props: {
                  value: params.row.switch,
                  'true-value': 1,
                  'false-value': 0,
                  fetch: () => {
                    if (switchState === 1) {
                      return this.switchFn({
                        correction_order_id: id,
                        is_enable: 0
                      });
                    } if (switchState === 0) {
                      return this.switchFn({
                        correction_order_id: id,
                        is_enable: 1
                      });
                    }
                    return Promise.resolve({
                      success: false,
                      msg: '数据异常'
                    });
                  }
                },
                style: {
                  margin: '5px',
                  display: operationStateBackstage === 0 ? 'inline-block' : operationStateBackstage === 3 ? 'inline-block' : 'none'
                },
                on: {
                  input: (val) => {
                    params.row.switch = val;
                    if (val === 0) {
                      this.$success('关闭成功!');
                    } else if (val === 1) {
                      this.$success('开启成功!');
                    }
                  }
                }
              }, [
                h('span', {
                  slot: 'open'
                }, '开启'),
                h('span', {
                  slot: 'close'
                }, '暂停')
              ])
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'left',
          fixed: 'right',
          render: (h, params) => {
            const switchState = params.row.switch;
            const operationStateBackstage = params.row.operationStateBackstage;
            return h('div', [
              h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editItem(params.row.id);
                    this.setOrderSn(params.row.orderSn);
                  }
                }
              }, '详情'),
              h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: switchState === 1 ? (operationStateBackstage === 3 ? 'inline-block' : 'none') : 'none'
                },
                on: {
                  click: () => {
                    if (switchState === 1 && operationStateBackstage === 3) {
                      this.retransmit({ correction_order_id: params.row.id });
                    }
                  }
                }
              }, '重发'),
              h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: operationStateBackstage === 2 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    if (operationStateBackstage === 2) {
                      this.refundingFn({ correction_order_id: params.row.id });
                    }
                  }
                }
              }, '重新退款'),
              h('ZBtn', {
                props: {
                  size: 'small',
                  type: 'error'
                },
                style: {
                  marginRight: '5px',
                  display: operationStateBackstage === 2 ? 'inline-block' : operationStateBackstage === 3 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    if (operationStateBackstage === 2 || operationStateBackstage === 3) {
                      this.closeBtnFn(params.row.id);
                    }
                  }
                }
              }, '关闭')
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // Switch 开启
    // async openFn (params) {
    //   let res = await open(params);
    //   if (res.success) {
    //     this.handleRefresh();
    //     return res;
    //   }
    // },
    // Switch 关闭
    // async closeFn (params) {
    //   let res = await close(params);
    //   if (res.success) {
    //     this.handleRefresh();
    //     return res;
    //   }
    // },

    // Switch
    async switchFn (params) {
      const res = await switchBtn(params);
      if (res.success) {
        // this.handleRefresh();
        return res;
      }
      return Promise.resolve({
        success: false,
        msg: res.msg
      });
    },

    // 关闭按钮
    async closeBtnFn (params) {
      this.$m_confirm({
        title: '确定要关闭吗？',
        onOk: () => {
          closeBtn(params).then(({ success, msg }) => {
            if (success) {
              this.$success('关闭成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `关闭失败${msg}`
              });
            }
          });
        }
      });
    },
    // 重新退款
    refundingFn (params) {
      this.$m_confirm({
        title: '确定要重新退款吗？',
        onOk: () => {
          refunding(params).then(({ success, msg }) => {
            if (success) {
              this.$success('重新退款发起成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `重新退款发起失败${msg}`
              });
            }
          });
        }
      });
    },

    // 重发
    retransmit (params) {
      this.$m_confirm({
        title: '确定要重发吗？',
        onOk: () => {
          retransmission(params).then(({ success, msg }) => {
            if (success) {
              this.$success('重发成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `重发失败${msg}`
              });
            }
          });
        }
      });
    },
    // 获取最近一周时间
    getTime () {
      const nowTime = new Date().setHours(0, 0, 0, 0);
      const tomorrowTime = nowTime + 24 * 60 * 60 * 1000;
      const lastTime = nowTime - 7 * 24 * 60 * 60 * 1000;
      return [this.$formatTime(lastTime), this.$formatTime(tomorrowTime)];
    },
    // 刷新
    handleRefresh () {
      this.reload();
    }
  },
  mounted () {
    const time = this.getTime();
    this.filterData({
      created_time_begin: time[0],
      created_time_end: time[1]
    });
  }
};
</script>
<style>
</style>
