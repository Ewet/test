<template>
    <div style="min-height:420px">
      <ZBtn style="margin:0 0 10px 0" @click="add">添加主控板</ZBtn>
      <!-- <Table border :columns="columns" :data="items" height="490"></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :height="490"
          :loading="isLoading"
          :page="page"
          :total="total"
          :showPageBar="false"
          :pageChange="pageChange.bind(this)"
        />
      <Modal
        :value="showModal"
        :title="itemId? '主控板编辑' : '添加主控板'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        width="500"
        >
        <EditMasterControl/>
    </Modal>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem } from './model';
import EditMasterControl from './Edit';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      showModal2: true,
      containerHeight: 0,
      columns: [
        {
          title: 'IP地址',
          key: 'IPAddress'
        },
        {
          title: '硬件版本',
          key: 'version'
        },
        {
          title: '创建时间',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.id);
                }
              }
            }, '编辑'),
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.showCollectionEdition(params.row.id);
                }
              }
            }, '采集版'),
            h('DelBtn', {
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
    showCollectionEdition (params) {
      this.$store.dispatch('boxManagement/viewCollectionEditionList', params);
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
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    },
    add () {
      const len = this.items.length;
      if (len === 0) {
        this.addItem();
      } else {
        this.$error({
          content: '只能有一个主控板'
        });
      }
    }
  },
  components: {
    EditMasterControl
  }
};
</script>
