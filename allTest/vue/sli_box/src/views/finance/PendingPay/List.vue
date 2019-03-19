<template>
    <div style="min-height:520px">
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
    <!-- <Table border :columns="columns" :data="items" :loading="loading"></Table> -->
    </div>
</template>
<script>
import { remittanceItem } from 'views/finance/AlreadyPay/model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PendingPayList',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '会员账号(手机)',
          key: 'memberAccount',
          minWidth: 100
        },
        {
          title: '提现类型',
          key: 'withdrawType',
          minWidth: 100
        },
        {
          title: '申请提现金额(元)',
          key: 'withdrawalAmount',
          minWidth: 100
        },
        {
          title: '实际提现金额(元)',
          key: 'realAmount',
          minWidth: 100
        },
        {
          title: '到账账号',
          key: 'accountNumber',
          minWidth: 100
        },
        {
          title: '提现时间',
          key: 'createTime',
          width: 150
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          align: 'center',
          fixed: 'right',
          render: (h, params) => h('div', [
            h('OutgivingBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.remittance(params.row.id);
                }
              }
            }, '发放')
          ])
        }
      ]
    };
  },
  mounted () {
    this.setInternalFilter({
      status: '1'
    });
    this.pageChange(1);
  },
  watch: {

  },
  methods: {
    remittance (id) {
      remittanceItem(id).then(({ success, msg }) => {
        if (success) {
          this.$success('打款成功!');
          this.reload();
        } else if (msg) {
          this.$error({
            content: `打款失败${msg}`
          });
        }
      });
    }
  }
};
</script>
