<template>
<div>
  <ModuleHeader title="渠道商管理列表">
    <ZBtn slot="right" @click="addItem">添加</ZBtn>
  </ModuleHeader>
  <Form inline class="toolBarForm">
      <!-- <FormItem> -->
          <!-- <Button type="primary" @click="handleRefresh">刷新</Button> -->
          <RefreshBtn @click="handleRefresh"/>
      <!-- </FormItem> -->
    </Form>
  <!-- <Table border :columns="columns" :data="items" :loading = isLoading ></Table> -->
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :showPageBar="false"
          :pageChange="pageChange.bind(this)"
        />
  <Modal
        :value="showModal"
        :title="Object.keys(formData).length === 0 ? '新增' : '编辑'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)">
        <Edit/>
  </Modal>
  <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
  </div>
</div>
</template>
<script>
import { delItem } from './model';
import Edit from './Edit';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Edit
  },
  name: 'ChannelManagement',
  data () {
    return {
      //   containerHeight: 0,
      columns: [
        {
          title: '商家名称',
          key: 'merchantName',
          minWidth: 80
        },
        {
          title: '法人代表',
          key: 'legalPerson',
          minWidth: 80
        },
        {
          title: '地址',
          key: 'address',
          minWidth: 80
        },
        {
          title: '供应品类',
          key: 'goodsType',
          minWidth: 80
        },
        {
          title: '联系人',
          key: 'contact',
          minWidth: 80
        },
        {
          title: '联系电话',
          key: 'mobile',
          minWidth: 80
        },
        {
          title: '系统账号',
          key: 'systemAccount',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.merchantId);
                }
              }
            }, '编辑'),
            h('DelBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.merchantId);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    handleRefresh () {
      this.reload();
    },

    del (merchantId) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        content: '',
        onOk: () => {
          delItem(merchantId).then(({ success, msg }) => {
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
