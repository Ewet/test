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
        :value="viewModal"
        title="会员详情"
        :footerHide= "true"
        @on-cancel="setViewModal(false)"
        >
      </Modal>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ReleaseRecordList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '优惠劵名称',
          key: 'couponName'
        },
        {
          title: '会员昵称',
          key: 'memberName'
        },
        {
          title: '手机号码',
          key: 'memberMobile'
        },
        {
          title: '获得方式',
          key: 'getMethod'
        },
        {
          title: '获得时间',
          key: 'getTime'
        },
        {
          title: '使用时间',
          key: 'useTime'
        },
        {
          title: '使用单号',
          key: 'useOrderId'
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
