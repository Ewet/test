<template>
    <div style="min-height:520px">
     <!-- <Table border :columns="columns" :data="items" :loading="isLoading"></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
       <Modal
        :value="showModal"
        :title="Object.keys(formData).length === 0 ? '新增' : '编辑'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)">
        <Edit/>
     </Modal>
    </div>
</template>
<script>
import Edit from './Edit';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Edit
  },
  name: 'MemberTypeList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '会员类型名称',
          key: 'name',
          minWidth: 180
        },
        {
          title: '价格',
          key: 'price',
          minWidth: 80
        },
        {
          title: '描述',
          key: 'desc',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
            }, '编辑')
          ])
        }
      ]
    };
  },
  methods: {
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
<style>
</style>
