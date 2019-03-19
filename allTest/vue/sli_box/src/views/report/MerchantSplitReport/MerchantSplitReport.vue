<template>
    <div style="min-height:420px">
      <ModuleHeader title="商户分成报表">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          :pageSize='pageSize'
      />
    </div>
</template>
<script>
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  name: 'MerchantSplitReport',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar
  },
  data () {
    return {
      columns: [
        {
          title: '商户',
          key: 'merchant',
          minWidth: 180
        },
        {
          title: '盒子编号',
          key: 'boxNum',
          minWidth: 100
        },
        {
          title: '单号',
          key: 'orderNum',
          minWidth: 180
        },
        {
          title: '金额/元',
          key: 'maney',
          minWidth: 80
        },
        {
          title: '实收/元',
          key: 'netReceipts',
          minWidth: 80
        },
        {
          title: '下单日期',
          key: 'orderDate',
          minWidth: 180
        },
        {
          title: '发放时间',
          key: 'paymentTime',
          minWidth: 180
        },
        {
          title: '发出佣金/元',
          key: 'issueCommission',
          minWidth: 120,
          render: (h, params) => {
            let world = params.row.issueCommission;
            if (world === 0) {
              world = '-';
            }
            return h('p', {}, world);
          }
        },
        {
          title: '佣金占比',
          key: 'commissionRatio',
          minWidth: 120
          // render: (h, params) => {
          //   let world = params.row.commissionRatio;
          //   if (world === 0) {
          //     world = '-';
          //   }
          //   return h('p', {}, world);
          // }
        },
        {
          title: '会员佣金/元',
          key: 'memberCommissions',
          minWidth: 110,
          render: (h, params) => {
            let world = params.row.memberCommissions;
            if (world === 0) {
              world = '-';
            }
            return h('p', {}, world);
          }
        },
        {
          title: '代购佣金/元',
          key: 'buyingCommission',
          minWidth: 110,
          render: (h, params) => {
            let world = params.row.buyingCommission;
            if (world === 0) {
              world = '-';
            }
            return h('p', {}, world);
          }
        },
        {
          title: '股东佣金/元',
          key: 'shareholderCommission',
          minWidth: 110,
          render: (h, params) => {
            let world = params.row.shareholderCommission;
            if (world === 0) {
              world = '-';
            }
            return h('p', {}, world);
          }
        },
        {
          title: '活动奖励/元',
          key: 'activityAward',
          minWidth: 110,
          render: (h, params) => {
            let world = params.row.activityAward;
            if (world === 0) {
              world = '-';
            }
            return h('p', {}, world);
          }
        }
      ]
    };
  },
  mounted () {
  }
};
</script>
<style lang="less">

</style>
