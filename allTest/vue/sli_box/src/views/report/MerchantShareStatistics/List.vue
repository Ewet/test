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
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantShareStatisticsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'merchantName',
          minWidth: 100
        },
        {
          title: '统计月份',
          key: 'statisticalMonth',
          minWidth: 100
        },
        {
          title: '起止日期',
          key: 'startAndStopDates',
          minWidth: 100
        },
        {
          title: '分成比例',
          key: 'proportion',
          minWidth: 80
        },
        {
          title: '实收金额',
          key: 'paidAmount',
          minWidth: 100
        },
        {
          title: '保底金额',
          key: 'guaranteedAmount',
          minWidth: 100
        },
        {
          title: '分成金额',
          key: 'shareAmount',
          minWidth: 80
        },

        {
          title: '结算银行',
          key: 'settlementBank',
          minWidth: 100
        },
        {
          title: '银行账号',
          key: 'bankAccount',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => h('div', [
            h('ViewDetailsBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.getMerchantShareDetails({
                    ruleId: params.row.id,
                    merchantId: params.row.merchantId
                  });
                }
              }
            }, '详情')
          ])
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
  }
};
</script>
