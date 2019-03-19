<template>
    <div style="min-height:420px">
      <ZTable
          :columns="columns"
          :items="prizeItems"
          :loading="isLoading"
          :showPageBar="false"
          :height="400"
      />
      </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getList, delPrizeItem } from './model';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatprizeSettingsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '奖品类型',
          key: 'prizeTypeformatted',
          minWidth: 120
        },
        {
          title: '奖品名称',
          key: 'prizeName',
          minWidth: 120
        },
        {
          title: '奖品图片',
          key: 'prizeImgUrl',
          minWidth: 80,
          render: (h, params) => h('div', [
            h('img', {
              attrs: {
                src: params.row.prizeImgUrl
              },
              style: {
                minWidth: '50px',
                height: '50px',
                margin: '5px 0',
                verticalAlign: 'middle'
              }
            }, params.row.prizeId)
          ])
        },
        {
          title: '奖品数量',
          key: 'prizeQuantity',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            const action = [];

            action.push(h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editPrize(params.row.prizeId);
                }
              }
            }, '编辑奖品'));
            if (this.status !== 10) {
              action.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.del(params.row.prizeId);
                  }
                }
              }, '删除'));
            }
            return h('div', action);
          }
        }
      ],
      prizeItems: []
    };
  },
  mounted () {
  },
  methods: {
    loadData () {
      this.spinShow = true;
      getList({ activity_id: this.activityId }).then((result) => {
        if (result.success) {
          this.prizeItems = result.data;
        } else if (result.msg) {
          this.$error({
            content: `获取数据失败${result.msg}`
          });
        }
        this.spinShow = false;
      });
    },
    del (prizeId) {
      this.$m_confirm({
        title: '确定删除当前奖品吗？',
        onOk: async () => {
          const { success, msg } = await delPrizeItem(prizeId);
          if (success) {
            this.$success('奖品删除成功！');
            this.loadData();
          } else {
            this.$error(`奖品删除失败！${msg}`);
          }
        }
      });
    },
    editPrize (id) {
      this.prizeEdit(id);
    }
  },
  watch: {
    showAwardModal (val) {
      if (val) {
        this.loadData();
      }
    },
    showPrizeEditModal (val) {
      if (!val) {
        this.loadData();
      }
    }
  }
};
</script>
