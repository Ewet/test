<template>
  <div class='invoice'>
    <ModuleHeader title="发票列表">
    </ModuleHeader>
    <Form inline style="text-align:left">
      <RefreshBtn @click="handleRefresh"/>
      <FormItem label='发票号码'>
        <Input type="text" v-model="filterObj.invoiceNum" clearable placeholder="请输入发票号码"></Input>
      </FormItem>
      <FormItem label='状态'>
          <Select v-model="filterObj.styleSelect" clearable placeholder="请选择">
                <Option v-for="item in styleList" :value="item.enum_id" :key="item.enum_id">{{item.enum_name}}</Option>
          </Select>
      </FormItem>
      <FormItem>
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="handleReset"/>
      </FormItem>
    </Form>
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
    />
    <Modal
        width="50%"
        :value="viewModal"
        title="发票详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setViewModal(false)">
        <Edit/>
    </Modal>
    <Modal
        width='460'
        :value="modalSuccess"
        title="开票成功操作"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="handleCancelSuccess">
        <Success></Success>
    </Modal>
    <Modal
        width='460'
        :value="modalError"
        title="开票失败操作"
        :footerHide= "true"
        :mask-closable= "false"
        :loading= "true"
        @on-cancel="handleCancelError">
        <Error></Error>
    </Modal>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Edit from './Edit';
import Success from './Success';
import Error from './Error';
import { getDictionary } from 'model/dictionary';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Invoice',
  components: {
    Edit,
    Success,
    Error
  },
  mounted () {
    this.pageChange(1);
    getDictionary({
      param_key: 'wd_invoice_status'
    }).then((res) => {
      this.styleList = res.data;
    });
  },
  methods: {
    handleCancelSuccess () {
      this.$g_emit('clearInvoiceSuccessForm');
      this.setModalSuccess(false);
    },
    handleCancelError () {
      this.$g_emit('clearInvoiceErrorForm');
      this.setModalError(false);
    },
    handleSubmit () {
      this.filterData({
        invoice_no: this.filterObj.invoiceNum.trim(),
        status: this.filterObj.styleSelect
      });
    },
    // 刷新
    handleRefresh () {
      this.reload();
    },
    handleReset () {
      this.filterObj = {
        invoiceNum: '',
        styleSelect: ''
      };
      this.clearFilter();
    }
  },
  data () {
    return {
      styleList: [],
      errLoading: true,
      filterObj: {
        invoiceNum: '',
        styleSelect: ''
      },
      columns: [
        {
          title: '发票抬头',
          key: 'invoiceTop'
        },
        {
          title: '税号',
          key: 'dutyParagraph'
        },
        {
          title: '发票号码',
          key: 'invoiceNum'
        },
        {
          title: '金额',
          key: 'money'
        },
        {
          title: '实收',
          key: 'realTotal'
        },
        {
          title: '状态',
          key: 'style'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(
              h('ViewDetailsBtn', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '10px',
                  marginTop: '3px'
                },
                on: {
                  click: () => {
                    this.viewItem(params.row.invoiceId);
                  }
                }
              }, '查看详情')
            );
            const status = params.row.status;
            if (status === 1) {
              action.push(
                h('InvoiceSuccessBtn', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  style: {
                    marginRight: '10px',
                    marginTop: '3px'
                  },
                  on: {
                    click: () => {
                      this.setModalSuccess(true);
                      this.setInvoiceId(params.row.invoiceId);
                    }
                  }
                }, '开票成功')
              );
              action.push(
                h('InvoicefailBtn', {
                  props: {
                    size: 'small',
                    type: 'error'
                  },
                  style: {
                    marginRight: '10px',
                    marginTop: '3px'
                  },
                  on: {
                    click: () => {
                      this.setModalError(true);
                      this.setInvoiceId(params.row.invoiceId);
                    }
                  }
                }, '开票失败')
              );
            }
            return h('div', action);
          }
        }
      ]
    };
  }
};
</script>
<style scoped>
.ivu-form-item{
  width: 240px;
}
.ivu-form-item-label{
  width: 30%;
}
.ivu-input-wrapper{
  width: 70%;
}
.ivu-select,.ivu-upload{
  width: 70%;
}
</style>
