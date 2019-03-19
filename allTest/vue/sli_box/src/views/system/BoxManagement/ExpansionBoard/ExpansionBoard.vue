<template>
   <div class="ExpansionBoard">
       <div class='content'>
          <ZBtn style="margin-bottom: 10px;" @click="addExpansionBoard">添加扩展板</ZBtn>
          <!-- <Table height='400' border :columns="columns" :data='expansionBoardData'></Table> -->
          <ZTable
          :columns="columns"
          :items="expansionBoardData"
          :height="400"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          :showPageBar="false"
        />
       </div>
       <CloseBtn style='float:right;margin:40px 0 10px' @click="setExpansionBoardModal(false)"/>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { delExponsionBoard } from './model';

import { STORE_NAME } from '../store';

export default {
  name: 'ExpansionBoard',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  computed: {
    ExpansionBoardModal () {
      return this.showExpansionBoardModal;
    }
  },
  watch: {
    ExpansionBoardModal (val) {
      if (val === true) {
        this.getExpansionBoardData(this.collectionBoardId);
      }
    }
  },
  methods: {
    addExpansionBoard () {
      this.setAddExpansionBoardModal(true);
    },
    async deleteExponsionBoard (expansionBoardId) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除该扩展板吗?</p>',
        onOk: async () => {
          const { success, msg } = await delExponsionBoard({
            extension_id: expansionBoardId
          });
          if (success) {
            this.$success('删除成功！');
            this.getExpansionBoardData(this.collectionBoardId);
          } else {
            this.$error(`删除失败！${msg}`);
          }
        }
      });
    }
  },
  data () {
    return {
      data: [],
      columns: [
        {
          title: '扩展板编号',
          key: 'expansionBoardNum'
        },
        {
          title: '遮挡电平',
          key: 'occlusionLevel',
          width: 120
        },
        {
          title: '通道数量',
          key: 'channelsNum',
          width: 120
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            const action = [];
            // action.push(h('Button', {
            //   props: {
            //     type: 'primary',
            //     size: 'small'
            //   },
            //   style: {
            //     marginRight: '5px'
            //   },
            //   on: {
            //     click: () => {
            //       this.viewChannelAction(params.row.expansionBoardId);
            //     }
            //   }
            // }, '查看通道'));
            action.push(h('DelBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.deleteExponsionBoard(params.row.expansionBoardId);
                }
              }
            }, '删除'));
            return h('div', action);
          }
        }
      ]
    };
  }
};
</script>

<style scoped lang='less'>
.ExpansionBoard{
    clear: both;
    overflow: hidden;
}
</style>
