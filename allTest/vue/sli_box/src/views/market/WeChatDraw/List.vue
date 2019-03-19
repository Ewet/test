<template>
   <div class="page">
    <ZTable
        style="margin-top: 5px;"
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
import {
  startItem, endingItem, delItem, getDetailItem
} from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatDrawList',
  data () {
    return {
      columns: [
        {
          title: '新建时间',
          key: 'createdTime',
          minWidth: 80
        },
        {
          title: '活动名称',
          key: 'activityName',
          minWidth: 80
        },
        {
          title: '活动时间',
          minWidth: 150,
          render: (h, params) => h('div', `${params.row.activityTimeStart} ~ ${params.row.activityTimeEnd}`)
        },
        {
          title: '活动状态',
          key: 'activeState',
          minWidth: 80
        },
        {
          title: '新建人',
          key: 'builtMan',
          minWidth: 80
        },
        {
          title: '活动剩余时间',
          key: 'remainingTime',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 240,
          render: (h, params) => {
            const action = [];
            const status = params.row.status;
            const id = params.row.id;
            action.push(h('ViewBtn', {
              style: {
                margin: '4px'
              },
              on: {
                click: () => {
                  this.getWeChatDrawDetail(id);
                }
              }
            }));
            if (status === 0) {
              action.push(h('BeginBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.startActivity(id);
                  }
                }
              }));
              action.push(h('EditBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.editItem(id);
                    this.setIsEdit('1');
                  }
                }
              }));
              action.push(h('DelBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.delActivity(id);
                  }
                }
              }));
              action.push(h('PrizeSetupBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.editAward({ id, status });
                  }
                }
              }, '奖项设置'));
            } else if (status === 10) {
              action.push(h('EndBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.endActivity(id);
                  }
                }
              }));
              action.push(h('EditBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.editItem(id);
                    this.setIsEdit('1');
                    this.setInHand('10');
                  }
                }
              }));
              action.push(h('PrizeSetupBtn', {
                style: {
                  margin: '4px'
                },
                on: {
                  click: () => {
                    this.editAward({ id, status });
                  }
                }
              }, '奖项设置'));
            }
            return h('div', action);
          }
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    startActivity (id) {
      this.$m_confirm({
        title: '确定要开始这个活动吗？',
        onOk: async () => {
          const { success, msg } = await startItem(id);
          if (success) {
            this.$success('活动开始成功！');
            this.pageChange(this.page);
          } else {
            this.$error(`活动开始失败！${msg}`);
          }
        }
      });
    },
    endActivity (id) {
      this.$m_confirm({
        title: '确定要结束这个活动吗？',
        onOk: async () => {
          const { success, msg } = await endingItem(id);
          if (success) {
            this.$success('活动结束成功！');
            this.pageChange(this.page);
          } else {
            this.$error(`活动结束失败！${msg}`);
          }
        }
      });
    },
    delActivity (id) {
      this.$m_confirm({
        title: '确定要删除这个活动吗？',
        onOk: async () => {
          const { success, msg } = await delItem(id);
          if (success) {
            this.$success('活动删除成功！');
            this.pageChange(this.page);
          } else {
            this.$error(`活动删除失败！${msg}`);
          }
        }
      });
    },
    editAward ({ id, status }) {
      this.awardEdit({ id, status });
    },
    async getWeChatDrawDetail (id) {
      const { success, data, msg } = await getDetailItem(id);
      if (success) {
        this.setDetailData(data);
        this.setWeChatDrawDetailModal(true);
      } else {
        this.$error(`详情获取失败！${msg}`);
      }
    }
  },
  watch: {
    showAwardModal (val) {
      if (!val) {
        this.setActivityId('');
        this.setStatus('');
      }
    }
  }
};

</script>

<style scoped>
</style>
