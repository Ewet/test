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
        title="优惠劵详情"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        :width="'80%'"
        >
        <CouponEdit/>
      </Modal>
      <Modal
        :value="viewModal"
        title="优惠劵详情"
        :footerHide= "true"
        @on-cancel="setViewModal(false)"
        :width="'50%'"
        >
        <CouponView/>
      </Modal>
    </div>
</template>
<script>
import CouponEdit from '../CouponEdit';
import CouponView from '../CouponView';
import { delItem, publishItem, stopPublishItem } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CouponList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '排序',
          key: 'sort'
        },
        {
          title: '优惠劵名称',
          key: 'couponName'
        },
        {
          title: '使用条件',
          key: 'condition'
        },
        {
          title: '优惠',
          key: 'discount'
        },
        {
          title: '剩余数量',
          key: 'remainingAmount'
        },
        {
          title: '领取中心',
          key: 'collectionCenter'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '有效时间',
          key: 'effectiveTime'
        },
        {
          title: '状态',
          key: 'publishStatusText'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            const action = [];
            if (params.row.publishStatus === '0') {
              action.push(h('EditBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editItem(params.row.id);
                  }
                }
              }, '编辑'));
              action.push(h('ReleaseBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.publish(params.row.id);
                  }
                }
              }, '发布'));
            }
            if (params.row.publishStatus !== '1') {
              action.push(h('DelBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
                  }
                }
              }, '删除'));
            }
            if (params.row.publishStatus === '1') {
              action.push(h('StopReleaseBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.stopPublish(params.row.id);
                  }
                }
              }, '停发'));
            }
            if (params.row.publishStatus !== '0') {
              action.push(h('ViewBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.viewItem(params.row.id);
                  }
                }
              }, '查看'));
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
    addPurchasingRule () {
      this.addItem();
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
    publish (id) {
      publishItem(id).then(({ success, msg }) => {
        if (success) {
          this.$success('发布成功!');
          this.reload();
        } else if (msg) {
          this.$error({
            content: `发布失败${msg}`
          });
        }
      });
    },
    stopPublish (id) {
      stopPublishItem(id).then(({ success, msg }) => {
        if (success) {
          this.$success('停发成功!');
          this.reload();
        } else if (msg) {
          this.$error({
            content: `停发失败${msg}`
          });
        }
      });
    }
  },
  components: {
    CouponEdit,
    CouponView
  }
};
</script>
