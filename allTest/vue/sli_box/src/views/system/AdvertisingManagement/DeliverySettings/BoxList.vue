<template>
    <div>
      <Table border :columns="columns" :data="boxList" height='280'></Table>
    </div>
</template>
<script>
export default {
  name: 'DeliverySettingsBoxList',
  props: {
    boxList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      containerHeight: 0,
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
      ],
      isloading: false
    };
  },
  mounted () {
  },
  methods: {
    del (index) {
      this.$emit('remove', index);
    }
  },
  components: {
  }
};
</script>
