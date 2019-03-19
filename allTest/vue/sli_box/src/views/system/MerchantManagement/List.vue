<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" ></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
        <Modal
        :value="showDividedModal"
        title=""
        :footerHide= "true"
        @on-cancel="closeDividedModal"
        width="80%"
      >
        <DividedSettings
        :mId="itemId"
        :show="showDividedModal"
        />
      </Modal>
      <Modal
        :value="showModal"
        :title="itemId? '商户编辑' : '商户新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        >
        <MerchantManagementEdit/>
      </Modal>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem } from './model';
import { STORE_NAME } from './store';
import MerchantManagementEdit from './Edit';
import DividedSettings from './DividedSettings';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantManagementList',
  components: {
    MerchantManagementEdit,
    DividedSettings
  },
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '添加日期',
          key: 'createTimeFormatted',
          minWidth: 120
        },
        {
          title: '商户名称',
          key: 'merchantName',
          minWidth: 100
        },
        {
          title: '商户用户名',
          key: 'merchantUsername',
          minWidth: 80
        },
        {
          title: '法人代表',
          key: 'legalRepresentative',
          minWidth: 80
        },
        {
          title: '商户地址',
          key: 'merchantAddress',
          minWidth: 120
        },
        {
          title: '加盟时间',
          key: 'joiningTime',
          minWidth: 120
        },
        {
          title: '添加人',
          key: 'adder',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'center',
          render: (h, params) => {
            const btns = [
              h('ZBtn', {
                props: {
                  size: 'small'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.viewDividedEdit(params.row.id);
                  }
                }
              }, '分成设置'),
              h('EditBtn', {
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.editItem(params.row.id);
                  }
                }
              }, '编辑'),
              h('DelBtn', {
                style: {
                  margin: '5px'
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
                  }
                }
              }, '删除')
            ];
            return h('div', btns);
          }
        }],
      isloading: false
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    closeDividedModal () {
      this.setItemId('');
      this.setDividedModal(false);
    },
    del (id) {
      this.$Modal.confirm({
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
    }
  }
};
</script>
