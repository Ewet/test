<template>
    <div>
      <Table border :columns="columns" :data="boxList" height='200'></Table>
    </div>
</template>
<script>
export default {
  name: 'TimeLimitRuleBoxList',
  props: {
    boxList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'merchantName',
          minWidth: 200
        },
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, { index }) => h('div', [
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(index);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  methods: {
    del (index) {
      this.$emit('remove', index);
    }
  }
};
</script>
