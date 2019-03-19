<template>
   <div class="verificationRecord">
      <ModuleHeader title="代购申请">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :pageSize="pageSize"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          height="500"
      />
      <Modal
        width="20%"
        :value="viewModal"
        title="审核信息"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setViewModal(false)">
        <Edit/>
    </Modal>
   </div>
</template>

<script>
import Toolbar from './Toolbar';

import Edit from './Edit';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'VerificationRecord',
  components: {
    Toolbar,
    Edit
  },
  data () {
    return {
      columns: [
        {
          title: '申请时间',
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
          width: 100
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
          title: '审核状态',
          key: 'auditStatus',
          width: 100
        },
        {
          title: '操作',
          key: 'actions',
          width: 120,
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('ReviewBtn', {
                on: {
                  click: () => {
                    this.viewItem(params.row.applyId);
                  }
                }
              });
            }
            return '';
          }
        }
      ]
    };
  }
};
</script>

<style scoped lang='less'>
</style>
