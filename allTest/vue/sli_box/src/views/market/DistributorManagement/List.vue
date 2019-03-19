<template>
    <div style="min-height:520px;margin-top: 5px;" class="dm-list">
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
        title="分销商详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        >
        <Edit/>
      </Modal>
      <Modal
        v-model="showVipModal"
        :title="typeData ? typeData.name : ''"
        :mask-closable="false"
        >
        <Form ref="formInline">
         <FormItem label="有效期">
             <InputNumber
              :max="9999999"
              :min="1"
              v-model="day"
              :precision="0"></InputNumber><span style="margin-left:1em">天</span>
        </FormItem>
        </Form>
        <div slot="footer">
            <CancelBtn size="large" @click="showVipModal=false"/>
            <Button type="primary" size="large"  :loading="setVipLoading" @click="setVip">确定</Button>
        </div>
      </Modal>
       <Modal
        v-model="showVipDetailModal"
        title="会员类型信息"
        :footerHide= "true"
        :width="750">
        <VipDetail v-if="showVipDetailModal" :items="members"/>
      </Modal>
    </div>
</template>
<script>
import { delItem, subordinateExport } from './model';
import Edit from './Edit';
import VipDetail from './VipDetail';
import vuexMixins from 'mixins/module-map';
import { createMember } from 'views/personnel/Member/model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DistributorManagementList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '盒子编号',
          key: 'boxNum',
          width: 90
        },
        {
          title: '微信头像',
          key: 'fans',
          width: 90,
          render: (h, params) => h('div', [
            h('img', {
              attrs: {
                src: params.row.avatar
              },
              style: {
                minWidth: '30px',
                height: '30px',
                verticalAlign: 'middle'
              }
            }, params.row.name)
          ])
        },
        {
          title: '姓名/手机',
          key: 'namePhone',
          minWidth: 100,
          render: (h, params) => h('div', [
            h('p', {}, params.row.name),
            h('p', {}, params.row.phone)
          ])
        },
        {
          title: '会员类型',
          key: 'auditTime',
          width: 100,
          render: (h, params) => h('div', [
            h('ViewBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.members = params.row.members;
                  this.showVipDetailModal = true;
                }
              }
            }, '查看')])
        },
        {
          title: '累计佣金(元)',
          key: 'cumulativeCommission',
          minWidth: 100
        },
        {
          title: '打款佣金(元)',
          key: 'paymentCommission',
          minWidth: 100
        },
        {
          title: '发展会员数量',
          key: 'totalSubordinate',
          minWidth: 80
        },
        {
          title: '注册时间',
          key: 'registrationTime',
          width: 150
        },
        {
          title: '审核时间',
          key: 'auditTime',
          width: 150
        },
        // {
        //   title: '状态',
        //   key: 'status',
        //   width: 100,
        //   render: (h, params) => {
        //     let tags = [];
        //     if (params.row.status) {
        //       tags.push(h('Tag', {
        //         props: {
        //           color: 'blue'
        //         }
        //       }, params.row.status));
        //     }
        //     return h('div', tags);
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          minWidth: 260,
          align: 'center',
          fixed: 'right',
          render: (h, params) => h('div', [
            h('EditBtn', {
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
            }, ''),
            h('DelBtn', {
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
            }, ''),
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.exportSubordinate(params.row.userId);
                }
              }
            }, '导出小伙伴'),
            h('Dropdown', {
              props: {
                trigger: 'click',
                transfer: true
              },
              on: {
                'on-click': this.moreOperation
              }
            }, [
              h('Button', {
                props: {
                  size: 'small'
                }
              }, [
                h('span', {
                  style: {
                    marginRight: '5px'
                  }
                }, '更多'),
                h('Icon', {
                  props: {
                    type: 'arrow-down-b'
                  }
                })
              ]),
              h('DropdownMenu', {
                slot: 'list'
              }, [
                params.row.operationList.map(x => h('DropdownItem', {
                  props: { name: JSON.stringify(Object.assign({}, x, { userId: params.row.userId })) }
                }, x.name))
              ])
            ], '操作')
          ])
        }
      ],
      day: null,
      showVipModal: false,
      showVipDetailModal: false,
      typeData: null,
      members: [],
      setVipLoading: false
    };
  },
  methods: {
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
    moreOperation (typeString) {
      const typeData = JSON.parse(typeString);
      this.typeData = typeData;
      this.showVipModal = true;
    },
    setVip () {
      if (!this.day) {
        this.$error('请输入有效期');
        return false;
      }
      this.setVipLoading = true;
      const { userId, key, from } = this.typeData;
      createMember({
        user_id: userId,
        type_key: key,
        duration: this.day,
        from_type: from
      }).then((result) => {
        this.$fetchCB(result, (data) => {
          this.$success('保存成功');
          this.showVipModal = false;
          this.reload();
        });
        this.setVipLoading = false;
      });
    },
    exportSubordinate (id) {
      subordinateExport({ user_id: id });
    }
  },
  components: {
    Edit,
    VipDetail
  },
  created () {
    this.$Bus.$on('distributeManageSaveSuccess', this.closeModal);
  },
  beforeDestroy () {
    this.$Bus.$off('distributeManageSaveSuccess', this.closeModal);
  },
  mounted () {
    this.pageChange(1);
  },
  watch: {
    showVipModal (val) {
      if (!val) {
        this.day = null;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.dm-list {
  .ivu-dropdown-menu {
      min-width: 50px;
  }
}
</style>
<style lang="less">
.dm-list {
  // .icon-supervip {
  //   line-height: 22px;
  //   background: url(./images/gudong.png) center / contain no-repeat;
  //   text-indent: -99999px;
  //   display: inline-block;
  //   width: 25px;
  //   vertical-align: middle;
  // }
  .ivu-tag {
    cursor: auto;
  }
  .ivu-tag:hover {
    opacity: 1;
  }
}
</style>
