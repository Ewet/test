<template>
    <div class='invoiceErrEdit'>
      <Form class='content' :label-width="86" ref='contractForm' :model="contractForm"  :rules='ruleValidate'>
        <FormItem label='失败原因' prop='errorReason'>
         <Input :maxlength=225 placeholder="请输入失败原因" clearable v-model="contractForm.errorReason"></Input>
        </FormItem>
        <!-- <FormItem label='发票号码' prop='invoiceNum'>
          <Input placeholder="请输入发票号码" @keyup.enter.native="submit" clearable v-model="contractForm.invoiceNum"></Input>
          <i class='dd'>*</i>
        </FormItem> -->
      </Form>
      <Button style='float:right;margin:40px 0 10px' @click="cancel('contractForm')">关闭</Button>
      <Button style='float:right;margin:40px 10px 10px 0' @click="addOk('contractForm')">确定</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { errorfulTicketOpening } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'member',
  // mixins: [vuexMixins({
  //   moduleName: 'invoice',
  //   state: ['invoiceId'],
  //   mutation: ['setModalError']
  // })],
  data () {
    return {
      contractForm: {
        errorReason: '',
        invoiceNum: ''
      },
      ruleValidate: {
        invoiceNum: [
          // { required: true, message: '发票号码不能为空', trigger: 'blur' },
          { validator: this.validateMobile, trigger: 'blur' }
        ],
        errorReason: [
          { required: true, message: '失败原因不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.$g_on('clearInvoiceErrorForm', this.clearInvoiceErrorForm);
  },
  beforeDestroy () {
    this.$g_off('clearInvoiceErrorForm', this.clearInvoiceErrorForm);
  },
  methods: {
    submit () {
      this.addOk('contractForm');
    },
    addOk (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          errorfulTicketOpening({
            failed_reason: this.contractForm.errorReason,
            invoice_no: this.contractForm.invoiceNum,
            invoice_id: this.invoiceId
          }).then((res) => {
            if (res.msg === 'success') {
              this.$success('完成开票失败！');
              this.cancel('contractForm');
              this.pageChange(this.page);
            } else {
              this.$error('数据异常！');
            }
          });
        }
      });
    },
    cancel (name) {
      this.setModalError(false);
      this.$refs[name].resetFields();
    },
    clearInvoiceErrorForm () {
      this.$refs.contractForm.resetFields();
    },
    validateMobile: (rule, value, callback) => {
      if (!Number.isInteger(+value)) {
        callback(new Error('请输入数字值'));
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang='less'>
.invoiceErrEdit{
  clear: both;
  overflow: hidden;
  .content .ivu-form-item{
    margin-bottom: 12px;
  }
  label.ivu-form-item-label{
    height: 38px;
  }
  // .ivu-form-item-required .ivu-form-item-label::before{
  //   display: none;
  // }
  .ivu-input-wrapper{
      width: 88%;
  }
  .content i.dd{
    color: rgb(255, 87, 34);
    font-size: 24px;
    float: right;
    margin: 6px 25px 0 0;
  }
}

</style>
