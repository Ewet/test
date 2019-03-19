<template>
    <div style="min-height:600px">
      <ZBtn style="margin:0 0 10px 0" @click="addItem">添加采集板</ZBtn>
      <!-- <Table border :columns="columns" :data="items" height="550"></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :height="550"
          :loading="isLoading"
          :page="page"
          :total="total"
          :showPageBar="false"
          :pageChange="pageChange.bind(this)"
        />
      <Modal
        :value="showModal"
        :title="itemId? '采集板编辑' : '添加采集板'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        width="500"
        >
        <Edit/>
    </Modal>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem } from './model';
import Edit from './Edit';

import { STORE_NAME } from './store';

export default {
  name: 'ListCollectionEdition',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      showModal2: true,
      containerHeight: 0,
      columns: [
        {
          title: '采集板编号',
          key: 'collectionNumber'
        },
        {
          title: '采集板版本',
          key: 'edition'
        },
        {
          title: '创建时间',
          key: 'buildTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.showExpansionBoard({ bool: true, id: params.row.id });
                }
              }
            }, '扩展板'),
            h('DelBtn', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.id);
                }
              }
            }, '删除')
          ])
        }],
      isloading: true
    };
  },
  mounted () {
  },
  methods: {
    showExpansionBoard (params) {
      this.$store.commit('boxManagement/setExpansionBoardModal', params.bool);
      this.$store.commit('boxManagement/setCollectionBoardId', params.id);
    },
    del (id) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        onOk: () => {
          delItem(id).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: msg
              });
            }
          });
        }
      });
    }
  },
  components: {
    Edit
  }
};
</script>
