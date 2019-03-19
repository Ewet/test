<template>
   <div class="verificationRecord">
      <ModuleHeader title="审核记录">
      </ModuleHeader>
      <Toolbar />
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
import Toolbar from './Toolbar';

import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'VerificationRecord',
  components: {
    Toolbar
  },
  data () {
    return {
      columns: [
        {
          title: '审核时间',
          key: 'auditTime',
          minWidth: 160
        },
        {
          title: '所属商户',
          key: 'affiliatedMerchant',
          minWidth: 100
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 100
        },
        {
          title: '手机号码',
          key: 'phone',
          minWidth: 120
        },
        {
          title: '微信昵称',
          key: 'wechat',
          minWidth: 100
        },
        {
          title: '微信ID',
          key: 'wechatId',
          minWidth: 120
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 140
        },
        {
          title: '审核结果',
          key: 'auditResult',
          minWidth: 100
        },
        {
          title: '审核人',
          key: 'auditer',
          minWidth: 100
        }
      ]
    };
  }
};
</script>

<style scoped lang='less'>
</style>
