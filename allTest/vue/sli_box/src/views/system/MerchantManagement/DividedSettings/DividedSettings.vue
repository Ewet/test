<template>
<div style="min-height:420px">
  <ModuleHeader title="分成设置">
       <ZBtn style="margin-right:20px;" slot="right" @click="addItem">添加规则</ZBtn>
    </ModuleHeader>
  <!-- <ZBtn @click="dividedRuleEdit('')">新增投放</ZBtn> -->
      <Toolbar></Toolbar>
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :showPageBar="false"
          :height="500"
        >
        </ZTable>
        <Modal
        :value="showModal"
        :title="itemId? '分成规则编辑' : '分成规则新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        :width="600"
        >
        <DividedRuleEdit />
      </Modal>
      <Modal
        :value="showOperationRecordModal"
        title="操作记录"
        :footerHide= "true"
        @on-cancel="setOperationRecordModal(false)"
        :width="800"
        >
        <OperationRecord />
      </Modal>
    </div>
</template>
<script>
import Toolbar from './Toolbar';
import { delItem, startItem, endItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';
import DividedRuleEdit from './Edit';
import OperationRecord from './OperationRecord';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DividedSettingsIndex',
  props: {
    mId: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // title: '',
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '添加日期',
          key: 'createTimeFormatted',
          minWidth: 120
        },
        {
          title: '分成日期',
          key: 'dividedTimeFormatted',
          minWidth: 180
        },
        {
          title: '分成比例',
          key: 'dividedProportion',
          minWidth: 90
        },
        {
          title: '保底金额',
          key: 'lowestAmount',
          minWidth: 90
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 180
        },
        {
          title: '状态',
          key: 'statusFormatted',
          minWidth: 80
        },
        {
          title: '添加者',
          key: 'adder',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'left',
          fixed: 'right',
          render: (h, params) => {
            const action = [];
            const status = params.row.status;
            if (status === 0 || status === 1) {
              action.push(h('EditBtn', {
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.myEditItem({
                      merchant_id: this.merchantId,
                      rule_id: params.row.ruleId
                    });
                  }
                }
              }, '编辑'));
            }
            if (status === 0) {
              action.push(h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.start(params.row.ruleId);
                  }
                }
              }, '启用'));
            }
            if (status === 0 || status === 1) {
              action.push(h('DelBtn', {
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.del(params.row.ruleId);
                  }
                }
              }, '删除'));
            }
            if (status === 2) {
              action.push(h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.end(params.row.ruleId);
                  }
                }
              }, '终止'));
            }
            if ([2, 3, 4].includes(status)) {
              action.push(h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.viewOperationRecord({
                      merchant_id: this.merchantId,
                      rule_id: params.row.ruleId
                    });
                  }
                }
              }, '操作记录'));
            }
            return h('div', action);
          }
        }
      ]
    };
  },
  methods: {
    loadData () {
      // this.spinShow = true;
      // getList({ merchant_id: this.merchantId }).then((result) => {
      //   if (result.success) {
      //     this.dividedRulesItems = result.data;
      //   } else if (result.msg) {
      //     this.$error({
      //       content: `获取数据失败${result.msg}`
      //     });
      //   }
      //   this.spinShow = false;
      // });
    },
    del (ruleId) {
      this.$m_confirm({
        title: '确定删除当前规则吗？',
        onOk: async () => {
          const { success, msg } = await delItem({
            merchant_id: this.merchantId,
            rule_id: ruleId
          });
          if (success) {
            this.$success('规则删除成功！');
            // this.loadData();
            this.reload();
          } else {
            this.$error(`规则删除失败！${msg}`);
          }
        }
      });
    },
    start (ruleId) {
      this.$m_confirm({
        title: '确定启用当前规则吗？',
        onOk: async () => {
          const { success, msg } = await startItem({
            merchant_id: this.merchantId,
            rule_id: ruleId
          });
          if (success) {
            this.$success('规则启用成功！');
            // this.loadData();
            this.reload();
          } else {
            this.$error(`规则启用失败！${msg}`);
          }
        }
      });
    },
    end (ruleId) {
      this.$m_confirm({
        title: '确定终止当前规则吗？',
        onOk: async () => {
          const { success, msg } = await endItem({
            merchant_id: this.merchantId,
            rule_id: ruleId
          });
          if (success) {
            this.$success('规则终止成功！');
            // this.loadData();
            this.reload();
          } else {
            this.$error(`规则终止失败！${msg}`);
          }
        }
      });
    }
  },
  components: {
    Toolbar,
    DividedRuleEdit,
    OperationRecord
  },
  watch: {
    show (val) {
      this.setDividedModal(val);
      this.setMerchantId(this.mId);
    }

  }
};
</script>
<style scoped lang="less">
.order-list {
  header {
    position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    button {
      position: absolute;
      right: 0;
      top:0;
    }
  }
}
</style>
