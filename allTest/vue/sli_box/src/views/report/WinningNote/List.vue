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
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '奖励时间',
          key: 'awardTime'
        },
        {
          title: '活动名称',
          key: 'acvitityName'
        },
        {
          title: '用户名称',
          key: 'username'
        },
        {
          title: '用户ID',
          key: 'inviterUserId'
        },
        {
          title: '奖品名称',
          key: 'amountFormatted'
        }],
      isloading: true
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {

  }
};
</script>
