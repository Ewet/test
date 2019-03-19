<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" @on-selection-change="handleSelectChange"></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          @on-selection-change="handleSelectChange"
        />
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'EmployeeManagementList',
  data () {
    return {
      containerHeight: 0,
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: '员工姓名',
        key: 'employeeName'
      },
      {
        title: '部门',
        key: 'departmentName'
      },
      {
        title: '登录账号',
        key: 'loginAccount'
      },
      {
        title: '权限(角色，地区)',
        key: 'roleAuth',
        render: (h, params) => h('div', params.row.authList.map(w => h('Row', {
          style: {
            border: '1px dashed',
            margin: '5px auto',
            padding: '5px'
          }
        }, [
          h('Col', {
            props: {
              span: 12
            }
          }, w.roleName),
          h('Col', {
            props: {
              span: 12
            }
          }, w.areaList.map(x => h('p', x)))
        ])))
      },
      {
        title: '新增时间',
        key: 'createTime'
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
      isloading: false
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
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
    handleSelectChange (rows) {
      this.setSelectedItems(rows);
    },
    editAuth (id) {

    }
  }
};
</script>
