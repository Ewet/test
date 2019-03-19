<template>
  <div class="MyWorkOrderIndex">
    <ModuleHeader title="工单列表">
      <Button @click="setModal(true)" type="primary" slot="right">新增工单</Button>
    </ModuleHeader>
    <Toolbar />
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize='pageSize'
          :total="total"
          height=480
          :pageChange="pageChange.bind(this)"
        />
    <Modal
        class="myWorkOrderEditMdal"
        :value="showModal"
        :title="Object.keys(formData).length > 0?'编辑工单':'新增工单'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        width="800"
        >
        <Edit/>
    </Modal>
    <Modal
        class="myWorkOrderAssignMdal"
        :value="communicateInfoModal"
        :title="'处理工单'"
        :footerHide= "true"
        @on-cancel="setCommunicateInfoModal(false)"
        width="800"
        >
        <Assign/>
    </Modal>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import Edit from './Edit';
import Assign from './Assign';

import { STORE_NAME } from './store';

export default {
  name: 'myWorkOrder',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar,
    Edit,
    Assign
  },
  mounted () {
    // this.pageChange(1);
  },
  data () {
    return {
      showModal2: true,
      columns: [
        {
          title: '工单编号',
          key: 'orderNumber',
          minWidth: 90
        },
        {
          title: '工单内容',
          type: 'html',
          key: 'orderContent',
          minWidth: 120,
          className: 'orderContentColumn'
        },
        {
          title: '工单部门',
          key: 'orderDepartment',
          minWidth: 86
        },
        // {
        //   title: '工单类型',
        //   key: 'orderType',
        //   minWidth: 120
        // },
        {
          title: '提交人',
          key: 'submitter',
          minWidth: 100
        },
        {
          title: '指派给',
          key: 'Assignor',
          minWidth: 100
        },
        {
          title: '提交时间',
          key: 'assignTime',
          minWidth: 150
        },
        {
          title: '更新时间',
          key: 'updateTime',
          minWidth: 150
        },
        {
          title: '截止时间',
          key: 'closingTime',
          minWidth: 150
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 80,
          render: (h, params) => {
            const action = [];
            action.push(h('ZBtn', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  this.getCommunicateInfoData(params.row.id);
                }
              }
            }, '查看'));
            return h('div', action);
          }
        }
      ]
    };
  }
};
</script>

<style lang="less">
.MyWorkOrderIndex .ivu-table-tbody .orderContentColumn {
  p{
    margin: 0;
    padding: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  img{
    display: none;
  }
}
.myWorkOrderAssignMdal{
  .ivu-modal-body{
    background: #f5f7f9 !important;
  }
}
</style>
