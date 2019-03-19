<template>
   <div class="TimeLimitRule">
       <ZBtn @click="addLimitRule">添加规则</ZBtn>
       <Table
            border
            :columns="ruleColumns"
            :data="ruleData"
            style='margin-top: 6px;'
            :loading="listLoading"
        >
        </Table>
        <Modal
          :value="showBoxRangeModal"
          title="盒子范围"
          :footerHide="true"
          :mask-closable="false"
          @on-cancel="setBoxRangeModal(false)"
          >
          <BoxRange :boxRangeData='boxRangeList'/>
        </Modal>
        <Modal
          :value="showOperationRecordModal"
          title="操作记录"
          :footerHide="true"
          :mask-closable="false"
          @on-cancel="setOperationRecordModal(false)"
          >
          <OperationRecord/>
        </Modal>
        <Modal
          :value="showEditTimeLimitRuleModal"
          :title="isEdit ? '编辑' : '添加规则'"
          width="50%"
          :footer-hide="true"
          :mask-closable="false"
          @on-cancel="setEditTimeLimitRuleModal(false)"
          >
          <EditTimeLimitRule @reloadLimitRuleData="loadData"/>
        </Modal>
   </div>
</template>

<script>
import { getTimeLimitRule, toVoid, toConfirm } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';
import BoxRange from './BoxRange';
import OperationRecord from './OperationRecord';
import EditTimeLimitRule from './EditTimeLimitRule';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'TimeLimitRule',
  components: {
    BoxRange,
    OperationRecord,
    EditTimeLimitRule
  },
  data () {
    return {
      boxRangeList: '',
      listLoading: false,
      ruleColumns: [
        {
          title: '正在应用',
          key: 'beingApplied',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            if (params.row.beingApplied === 1) {
              return h('Icon', {
                props: {
                  type: 'md-checkmark',
                  size: '16px'
                },
                style: {
                  color: 'green'
                }
              });
            }
          }
        },
        {
          title: '规则名',
          key: 'ruleName',
          minWidth: 160
        },
        {
          title: '提成比例/%',
          key: 'commissionRatio',
          minWidth: 120
        },
        {
          title: '封顶金额/元',
          key: 'cappedAmount',
          minWidth: 120
        },
        {
          title: '开始时间',
          key: 'startTime',
          minWidth: 150
        },
        {
          title: '结束时间',
          key: 'endTime',
          minWidth: 150
        },
        {
          title: '状态',
          key: 'statusFormatted',
          minWidth: 80
        },
        {
          title: '盒子范围',
          key: 'boxRange',
          minWidth: 100,
          render: (h, params) => h('ZBtn', {
            props: {
              size: 'small'
            },
            on: {
              click: () => {
                this.boxRangeList = params.row.boxRange;
                this.setBoxRangeModal(true);
              }
            }
          }, '查看')
        },
        {
          title: '操作',
          key: 'goodsName',
          minWidth: 270,
          render: (h, params) => {
            let actions = [];
            // 0 未生效  // 1 生效 // 2 已生效 // 已应用之后就没有应用了 // 1 应用 // 0 未应用
            if (params.row.beingApplied === 0) {
              actions.push(
                h('ZBtn', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确定应用本条规则？',
                        onOk: () => {
                          toConfirm(params.row.limitRuleId)
                            .then(res => {
                              if (res.success) {
                                this.$success('规则应用成功！');
                                this.loadData();
                              } else {
                                this.$error(res.msg);
                              }
                            });
                        }
                      });
                    }
                  }
                }, '应用')
              );
            };
            if (params.row.status === 0) {
              actions.push(
                h('ZBtn', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.editLimitRulesAction(params.row.limitRuleId);
                    }
                  }
                }, '编辑'),
                h('ZBtn', {
                  props: {
                    size: 'small',
                    type: 'error'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确定作废？',
                        onOk: () => {
                          toVoid(params.row.limitRuleId)
                            .then(res => {
                              if (res.success) {
                                this.$success('规则作废成功！');
                                this.loadData();
                              } else {
                                this.$error(res.msg);
                              }
                            });
                        }
                      });
                    }
                  }
                }, '作废')
              );
            };
            if (params.row.status === 1) {
              actions.push(
                h('ZBtn', {
                  props: {
                    size: 'small',
                    type: 'error'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确定作废？',
                        onOk: () => {
                          toVoid(params.row.limitRuleId)
                            .then(res => {
                              if (res.success) {
                                this.$success('规则作废成功！');
                                this.loadData();
                              } else {
                                this.$error(res.msg);
                              }
                            });
                        }
                      });
                    }
                  }
                }, '作废')
              );
            };
            actions.push(
              h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.setOperationRecordModal(true);
                    this.setLimitRuleId(params.row.limitRuleId);
                  }
                }
              }, '操作记录')
            );
            return h('div', actions);
          }
        }
      ],
      ruleData: []
    };
  },
  methods: {
    async loadData () {
      this.listLoading = true;
      let { success, data, msg } = await getTimeLimitRule(this.bomCode);
      if (success) {
        this.ruleData = data.items;
      } else {
        this.$error(msg);
      }
      this.listLoading = false;
    },
    addLimitRule () {
      this.setEditTimeLimitRuleModal(true);
      this.setIsEdit(false);
    }
  },
  watch: {
    showTimeLimitRuleModal (val) {
      if (val) {
        this.loadData();
      } else {
        this.ruleData = [];
        this.reload();
      }
    }
  }
};
</script>

<style scoped lang='less'>
</style>
