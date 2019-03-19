<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" ></Table> -->
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
import vuexMixins from 'mixins/module-map';
import { delItem } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '新增时间',
          key: 'creatTime'
        },
        {
          title: '运营商名称',
          key: 'name'
        },
        {
          title: '运营商编号',
          key: 'operatorNo'
        },
        {
          title: '登陆账号',
          key: 'account'
        },
        {
          title: '盒子数量',
          key: 'boxNumber'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '管理员',
          key: 'administrator'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
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
                  this.landingSetting({
                    account: params.row.account,
                    operatorId: params.row.id
                  });
                }
              }
            }, '登录设置'),
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
                  this.editItem(params.row.id);
                }
              }
            }, '编辑'),
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
    }
  }
};
</script>
