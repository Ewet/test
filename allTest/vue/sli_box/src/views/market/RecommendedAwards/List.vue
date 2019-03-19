<template>
    <div style="min-height:420px">
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

import { delItem, startActivity, endActivity } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '新建时间',
          key: 'createdTime'
        },
        {
          title: '活动名称',
          key: 'activityName'
        },
        {
          title: '活动时间',
          key: 'activityTime',
          type: 'html'
        },
        {
          title: '活动状态',
          key: 'activeState'
        },
        {
          title: '新建人',
          key: 'builtMan'
        },
        {
          title: '活动剩余时间',
          key: 'remainingTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          align: 'left',
          render: (h, params) => {
            const status = params.row.activeStateBackstage;
            let statusName = params.row.activeState;
            const id = params.row.id;
            if (status === 0) {
              statusName = '开始';
            }
            if (status === 10 || status === 20) {
              statusName = '结束';
            }
            return h('div', [
              h(status === 0 ? 'BeginBtn' : status === 10 ? 'EndBtn' : status === 20 ? 'EndBtn' : '', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: status === 20
                },
                style: {
                  margin: '5px',
                  display: status === 0 ? 'inline-block' : status === 10 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    if (status === 0) {
                      this.confirmModal('确定要开始这个活动吗？', () => {
                        startActivity(id).then(({ success, msg }) => {
                          if (success) {
                            this.reload();
                            this.$success('已开始活动!');
                          } else if (msg) {
                            this.$error(msg);
                          }
                        });
                      });
                    }
                    if (status === 10) {
                      this.confirmModal('确定要结束这个活动吗？', () => {
                        endActivity(id).then(({ success, msg }) => {
                          if (success) {
                            this.reload();
                            this.$success('已结束活动!');
                          } else if (msg) {
                            this.$error(msg);
                          }
                        });
                      });
                    }
                  }
                }
              }, statusName),
              h('EditBtn', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  margin: '5px',
                  display: status === 0 || status === 10 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    if (status === 0 || status === 10) {
                      // if (status === 10) {
                      //   this.setReadonly(true);
                      // }
                      this.editItem(params.row.id);
                    }
                  }
                }
              }, '编辑'),
              h('ViewBtn', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.showRowInfo({ id: params.row.id, activityName: params.row.activityName });
                  }
                }
              }, '查看'),
              h('DelBtn', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  margin: '5px',
                  display: status === 0 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    if (status === 0) {
                      this.del(params.row.id);
                    }
                  }
                }
              }, '删除')
            ]);
          }
        }],
      isloading: true
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    async showRowInfo (params) {
      const msg = await this.showInfo(params);
      if (msg) {
        this.$error(msg);
      }
    },
    del (id) {
      this.$m_confirm({
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
    // 确认框
    confirmModal (content, cb) {
      this.$m_confirm({
        title: content,
        onOk: async () => {
          if (cb) {
            cb();
          }
        }
      });
    }

  }
};
</script>
