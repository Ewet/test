<template>
    <div style="min-height:420px">
      <Toolbar></Toolbar>
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :pageChange="pageChange.bind(this)"
          @on-selection-change="setDeleteList"
        >
        <ZBtn slot="footer" @click="deletePlan" style="margin-left:10px;">批量删除</ZBtn>
        </ZTable>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Toolbar from './DeliveryToolbar';

import { delItem, delList } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DeliverySettingsIndex',
  props: {
    adId: {
      type: [String],
      default: ''
    },
    isShow: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    Toolbar
  },
  data () {
    return {
      containerHeight: 0,
      cargoAreaItems: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '投放计划名称',
          key: 'deliveryPlanName',
          minWidth: 120
        },
        {
          title: '投放日期',
          key: 'deliveryDate',
          minWidth: 180
        },
        {
          title: '投放时段',
          key: 'deliveryTime',
          minWidth: 150
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.editItem({
                    advert_id: this.adId,
                    advert_plan_id: params.row.planId
                  });
                }
              }
            }, '编辑'),
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.planId);
                }
              }
            }, '删除')
          ])
        }],
      isloading: false,
      deletePlanList: [] // 选中删除项列表
    };
  },
  mounted () {
  },
  created () {
    this.deletePlan = this.$debounce(this.deletePlan);
  },
  methods: {
    // 返回多选多选的以选中项
    setDeleteList (val) {
      this.deletePlanList = val;
    },
    // 选中删除项数组转化->1,2,3,4
    setIds () {
      return this.deletePlanList.map(x => x.planId).join();
    },
    deletePlan () {
      // 批量删除
      if (this.deletePlanList.length) {
        this.$Modal.confirm({
          title: '确定删除当前所选计划吗？',
          onOk: () => {
            delList({
              advert_id: this.advertisingId,
              ids: this.setIds()
            }).then(({ success, msg }) => {
              if (success) {
                this.$success('删除成功!');
                this.reload();
              } else if (msg) {
                this.$error({
                  content: `删除计划失败${msg}`
                });
              }
            });
          }
        });
      } else {
        this.$warning('请先选择需要删除的计划');
      }
    },
    del (planId) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        onOk: () => {
          delItem({
            advert_id: this.advertisingId,
            advert_plan_id: planId
          }).then(({ success, msg }) => {
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
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        this.setAdId(this.adId);// 此页面弹出时给广告ID（advertisingId）赋值，提供加载此页面数据的时机
      } else {
        this.setAdId('');// 此页面关闭时清空广告ID（advertisingId）
      }
    }
  }
};
</script>
