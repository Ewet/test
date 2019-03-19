<template>
    <div style="min-height:520px">
    <Table border :columns="columns" :data="items" :loading="loading"></Table>
    </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  name: 'DistributionRelationshipList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '上级',
          key: 'superior',
          minWidth: 80,
          render: (h, params) => h('div', [
            h('img', {
              attrs: {
                src: 'https://tse1-mm.cn.bing.net/th?id=OIP.9j7o71IyzF7R6d7aTa4iIgHaHa&w=99&h=108&c=8&rs=1&qlt=90&pid=3.1&rm=2'
              },
              style: {
                width: '30px',
                height: '30px',
                verticalAlign: 'middle'
              }
            }, params.row.name),
            h('br')
          ])
        },
        {
          title: '上级ID/上级名称',
          key: 'idName',
          minWidth: 100,
          render: (h, params) => h('div', [
            h('p', {}, params.row.userId),
            h('p', {}, params.row.superiorName)
          ])
        },
        {
          title: '粉丝',
          key: 'fans',
          minWidth: 80,
          render: (h, params) => h('div', [
            h('img', {
              attrs: {
                src: 'https://tse1-mm.cn.bing.net/th?id=OIP.9j7o71IyzF7R6d7aTa4iIgHaHa&w=99&h=108&c=8&rs=1&qlt=90&pid=3.1&rm=2'
              },
              style: {
                width: '30px',
                height: '30px',
                verticalAlign: 'middle'
              }
            }, params.row.name),
            h('br'),
            h('span', {}, params.row.fans)
          ])
        },
        {
          title: '累计佣金',
          key: 'cumulativeCommission',
          minWidth: 100
        },
        {
          title: '打款佣金',
          key: 'paymentCommission',
          minWidth: 100
        },
        {
          title: '注册时间',
          key: 'registrationTime',
          width: 100
        },
        {
          title: '审核时间',
          key: 'auditTime',
          width: 100
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100,
          render: (h, params) => h('div', [
            h('Tag', {
              props: {
                color: 'blue'
              }
            }, '已审核'),
            h('Tag', {
              props: {
                color: 'blue'
              }
            }, '正常')
          ])
        },
        {
          title: '关注',
          key: 'attention',
          minWidth: 100,
          render: (h, params) => h('div', [
            h('Tag', {
              props: {
                color: 'blue'
              }
            }, '已关注')
          ])
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          fixed: 'right',
          render: (h, params) => h('Dropdown', {
            props: {
              trigger: 'click'
            }
          }, [
            h('Button', {}, [
              h('span', {
                style: {
                  marginRight: '5px'
                }
              }, '操作'),
              h('Icon', {
                props: {
                  type: 'arrow-down-b'
                }
              })
            ]),
            h('DropdownMenu', {
              slot: 'list'
            }, [
              h('DropdownItem', '删除')
            ])
          ], '操作')
        }
      ]
    };
  },
  methods: {
    show (index) {
      this.$m_info({
        title: 'User Info',
        content: `Name：${this.items[index].name}<br>Age：${this.items[index].age}<br>Address：${this.items[index].address}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-dropdown-menu {
    min-width: 50px;
}
</style>
