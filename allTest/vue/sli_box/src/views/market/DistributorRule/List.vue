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
  name: 'DistributorRuleList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '等级名称',
          key: 'levelName',
          minWidth: 180
        },
        {
          title: '等级',
          key: 'level',
          minWidth: 80
        },
        {
          title: '分成比例(%)',
          key: 'proportion',
          minWidth: 80
        },
        {
          title: '发放佣金上限(元)',
          key: 'toplimit',
          minWidth: 80
        },
        {
          title: '默认规则',
          key: 'isdefaultformatted',
          minWidth: 80
        },
        {
          title: '生效时间',
          key: 'activeTime',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 80,
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
