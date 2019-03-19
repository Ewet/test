<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" :loading="isLoading"></Table> -->
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
import { changeRead } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '留言内容',
          key: 'content'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '已读',
          key: 'isReaded',
          render: (h, params) => h('ZSwitch', {
            on: {
              input: (val) => {
                params.row.isReaded = val;
                this.$success('修改成功!');
                // this.reload();
              }
            },
            props: {
              value: params.row.isReaded,
              'true-value': 1,
              'false-value': 0,
              fetch: () => this.readChange2(params.row)

            }
          }, [
            h('span', {
              slot: 'open'
            }, '已读'),
            h('span', {
              slot: 'close'
            }, '未读')
          ])
        }
      ]
    };
  },
  created () {
    this.$Bus.$on('purchasingRulesSaveSuccess', this.purchasingRulesSaveSuccess);
  },
  beforeDestroy () {
    this.$Bus.$off('purchasingRulesSaveSuccess', this.purchasingRulesSaveSuccess);
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    async readChange (row) {
      const newState = Number(!row.isReaded);
      const { success, msg } = await changeRead({
        website_message_board_id: row.id,
        is_read: newState
      });
      if (success) {
        this.$success('修改成功!');
        this.reload();
      } else {
        this.$error(msg);
      }
    },
    async readChange2 (row) {
      const newState = Number(!row.isReaded);
      return changeRead({
        website_message_board_id: row.id,
        is_read: newState
      });
    }
  }
};
</script>
