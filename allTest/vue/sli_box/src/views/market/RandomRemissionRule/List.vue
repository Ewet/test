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

import { delItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Edit
  },
  name: 'RandomRemissionRuleList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '立减区间',
          key: 'reductionInterval',
          minWidth: 180
        },
        {
          title: '机率（%）',
          key: 'probability',
          minWidth: 80
        },
        {
          title: '创建时间',
          key: 'creatTime',
          minWidth: 80
        },
        {
          title: '修改时间',
          key: 'updateTime',
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
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.id);
                }
              }
            }, '编辑'),
            h('DelBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.id);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  methods: {
    del (id) {
      this.$m_confirm({
        title: '确定删除当前记录吗？',
        onOk: () => {
          delItem(id).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    }
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
<style>
</style>
