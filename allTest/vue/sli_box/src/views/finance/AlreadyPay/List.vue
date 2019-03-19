<template>
    <div style="min-height:520px">
    <!-- <Table border :columns="columns" :data="items" :loading="loading"></Table> -->
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
  name: 'AlreadyPayList',
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
          title: '打款时间',
          key: 'grantTime',
          width: 150
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100
        }
      ]
    };
  },
  mounted () {
    this.setInternalFilter({
      status: '2'
    });
    this.pageChange(1);
  },
  watch: {

  },
  methods: {

  }
};
</script>
