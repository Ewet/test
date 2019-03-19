<template>
    <div style="min-height:420px">
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
      <Modal
        :value="showTimeLimitRuleModal"
        title="限时规则"
        :footer-hide="true"
        :mask-closable="false"
        width=85%
        @on-cancel="setTimeLimitRuleModal(false)"
        >
        <TimeLimitRule/>
      </Modal>
    </div>
</template>
<script>
import { delItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';
import TimeLimitRule from './TimeLimitRule/TimeLimitRule';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingRulesList',
  components: {
    TimeLimitRule
  },
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '商品名称',
          key: 'goodsName',
          minWidth: 120
        },
        {
          title: '商品BOM码',
          key: 'goodsBOMCode',
          minWidth: 120
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
          title: '商户分成比例/%',
          key: 'proportion',
          minWidth: 120
        },
        {
          title: '应用规则',
          key: 'applicationRules',
          minWidth: 150
        },
        {
          title: '开始时间',
          key: 'startTime',
          minWidth: 140
        },
        {
          title: '结束时间',
          key: 'endTime',
          minWidth: 140
        },
        {
          title: '剩余时间',
          key: 'remainingTime',
          minWidth: 140
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'center',
          fixed: 'right',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.id);
                }
              }
            }, '编辑'),
            h('DelBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.id);
                }
              }
            }, '删除'),
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.setTimeLimitRuleModal(true);
                  this.setBomCode(params.row.goodsBOMCode);
                }
              }
            }, '限时规则')
          ])
        }
      ]
    };
  },
  created () {
    this.$Bus.$on('purchasingRulesSaveSuccess', this.purchasingRulesSaveSuccess);
  },
  beforeDestroy () {
    this.$Bus.$off('purchasingRulesSaveSuccess', this.purchasingRulesSaveSuccess);
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    addPurchasingRule () {
      this.addItem();
    },
    del (id) {
      this.$m_confirm({
        title: '确定删除当前记录吗？',
        content: '',
        onOk: () => {
          delItem(id).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    }
  }
};
</script>
