<template>
    <div style="min-height:520px">
     <!-- <Table border :columns="columns" :data="items" :loading="isLoading"></Table>
     <div style="float: right;margin-top:10px">
      <Page :total="total" :current="page" @on-change="num => pageChange(num)"></Page>
    </div> -->
      <ZTable
        :columns="columns"
        :items="items"
        :loading="isLoading"
        :page="page"
        :total="total"
        :pageChange="pageChange.bind(this)"
      />
      <Modal
        :value="viewModal"
        title="佣金详情"
        :footerHide= "true"
        @on-cancel="setViewModal(false)">
        <CommissionDetail/>
     </Modal>
    </div>
</template>
<script>
import CommissionDetail from './CommissionDetail';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DistributionOrderTablePanel',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '单号',
          key: 'orderSn',
          minWidth: 100
        },
        {
          title: '奖励金额(元)',
          key: 'withdrawalAmount',
          minWidth: 100
        },
        {
          title: '实付(元)',
          key: 'realPay',
          minWidth: 100
        },
        {
          title: '会员号',
          key: 'mobile',
          minWidth: 100
        },
        {
          title: '物流状态',
          key: 'shipStatus',
          minWidth: 100
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 160
        },
        {
          title: '完成时间',
          key: 'finishTime',
          width: 160
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          align: 'center',
          fixed: 'right',
          render: (h, params) => h('div', [
            h('CommissionDetailsBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  // '订单未完成，没有佣金详情'
                  this.viewItem(params.row.id);
                }
              }
            }, '佣金详情')
          ])
        }
      ]
    };
  },
  components: {
    CommissionDetail
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
