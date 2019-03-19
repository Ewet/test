<template>
    <div class="coupon-select">
        <h3>选择角色</h3>
        <!-- <header class="searhbar">
          <Input type="text" v-model="column_value" placeholder="搜索优惠劵"/>
          <Button @click="loadData">搜索</Button>
        </header> -->
         <Table :disabled-hover="true" :columns="columns" :data="items" :height="400"></Table>
    </div>
</template>
<script>
import { getList } from 'views/system/RoleManagement/model';

export default {
  name: 'EmployeeManagementSelect',
  data () {
    return {
      column_value: '',
      columns: [{
        title: '角色名称',
        key: 'roleName'
      },
      {
        title: '角色描述',
        key: 'roleDesc'
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => h('div', [
          h('Button', {
            props: {
              size: 'small'
            },
            on: {
              click: () => {
                this.$emit('itemSelect', params.row);
              }
            }
          }, '选择')
        ])
      }],
      items: []
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      getList({
        'pagination[page_size]': 1000,
        publish_status: 1,
        name: this.column_value
      }).then(({ success, data, msg }) => {
        if (success) {
          this.items = data.items;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.coupon-select {
    .searhbar {
        margin: 10px 0;
        display: flex;
        .ivu-btn{
          margin-left: 10px;
        }
    }
}

</style>
