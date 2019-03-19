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
      <Modal
        :value="showModal"
        :title="itemId? '代购员管理编辑' : '代购员管理新增'"
        :footerHide= "true"
        with="800"
        @on-cancel="setModal(false)"
        >
        <Edit/>
      </Modal>
    </div>
</template>
<script>
import Edit from './Edit';
import { delItem, enableItem } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingManagementList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '新增时间',
          key: 'createdTime'
        },
        {
          title: '所属商户',
          key: 'merchant'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '手机号码',
          key: 'mobile'
        },
        {
          title: '微信昵称',
          key: 'nickname'
        },
        {
          title: '微信ID',
          key: 'wxuserId'
        },
        {
          title: '审核人',
          key: 'reviewer'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'left',
          fixed: 'right',
          render: (h, params) => {
            const status = params.row.status;
            return h('div', [
              h('EditBtn', {
                style: {
                  marginRight: '5px',
                  display: status === 1 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.editItem(params.row.id);
                  }
                }
              }, '编辑'),
              h('DelBtn', {
                style: {
                  marginRight: '5px',
                  display: status === 1 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
                  }
                }
              }, '删除'),
              h('ZBtn', {
                style: {
                  marginRight: '5px',
                  display: status === 2 ? 'inline-block' : 'none'
                },
                props: {
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.enableFn(params.row.id);
                  }
                }
              }, '启用')
            ]);
          }
        }
      ]
    };
  },
  mounted () {
    this.filterData({});
  },
  methods: {
    // 最近一周时间
    getRecentTime () {
      const nowTime = new Date().setHours(0, 0, 0, 0);
      const tomorrowTime = nowTime + 24 * 60 * 60 * 1000;
      const lastTime = nowTime - 7 * 24 * 60 * 60 * 1000;
      return [this.$formatTime(lastTime), this.$formatTime(tomorrowTime)];
    },
    addPurchasingRule () {
      this.addItem();
    },
    del (id) {
      this.$m_confirm({
        title: '确定删除当前记录吗？',
        content: '',
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
    // 启用
    enableFn (id) {
      this.$m_confirm({
        title: '确定启用吗？',
        content: '',
        onOk: () => {
          enableItem(id).then(({ success, msg }) => {
            if (success) {
              this.$success('启用成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `启用失败${msg}`
              });
            }
          });
        }
      });
    }
  },
  components: {
    Edit
  }
};
</script>
