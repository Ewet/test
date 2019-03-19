<template>
    <div style="min-height:420px">
      <ZTable
          :height="'500'"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { pushOn, closePush } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageSettingsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '部门',
          key: 'department',
          minWidth: 100
        },
        {
          title: '员工姓名',
          key: 'name',
          minWidth: 100
        },
        {
          title: '登陆账号',
          key: 'account',
          minWidth: 100
        },
        {
          title: '手机号',
          key: 'phone',
          minWidth: 100
        },
        {
          title: '推送时间',
          key: 'pushTime',
          minWidth: 100
        },
        {
          title: '推送日期',
          key: 'pushDate',
          minWidth: 100
        },
        {
          title: '操作',
          key: 'pushStatus',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
            const id = params.row.id;
            const pushStatus = params.row.pushStatus;
            return h('div', [
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
              }, '设置'),
              h('ZSwitch', {
                props: {
                  value: params.row.pushStatus,
                  'true-value': 1,
                  'false-value': 0,
                  fetch: () => {
                    if (pushStatus === 0) {
                      return pushOn(id);
                    } if (pushStatus === 1) {
                      return closePush(id);
                    }
                    return Promise.resolve({
                      success: false,
                      msg: '数据异常'
                    });
                  }
                },
                style: {
                  margin: '5px'
                },
                on: {
                  input: (val) => {
                    params.row.pushStatus = val;
                    if (val === 0) {
                      this.$success('已关闭推送!');
                    } else if (val === 1) {
                      this.$success('已开启推送!');
                    }
                  }
                }
              }, [
                h('span', {
                  slot: 'open'
                }, '开启'),
                h('span', {
                  slot: 'close'
                }, '关闭')
              ])

            ]);
          }
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
  }
};
</script>

<style lang="less">

</style>
