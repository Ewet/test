<template>
    <div class='invoiceEdit'>
      <Form class='content' :label-width="86" ref='successForm' :model='successForm' :rules='ruleValidate'>
        <!-- <i class='dd'>*</i> -->
        <FormItem label='上传发票' prop='invoiceFile'>
          <Upload
              :action="upLoadPDF"
              :format="['pdf']"
              :on-success="handleSuccess"
              ref="uploadBtn"
              :before-upload="handleBeforeUpload"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleExceededSize"
              name="file"
              :with-credentials="true"
              :max-size="10240"
              >
              <Button class='btn'>上传发票/pdf</Button>
          </Upload>
        </FormItem>
        <!-- <i class='dd'>*</i> -->
        <FormItem label='发票号码' prop='invoiceNum'>
          <Input :maxlength=50 @keyup.enter.native="submit" @keyup.native="noHome" placeholder="请输入发票号码" clearable v-model="successForm.invoiceNum"></Input>
        </FormItem>
      </Form>
      <Button style='float:right;margin:40px 0 10px' @click="cancel('successForm')">关闭</Button>
      <Button style='float:right;margin:40px 10px 10px 0' @click="addOk('successForm')">确定</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { UPLOADPDF_URL } from '@/const/url';
import { successfulTicketOpening } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'member',
  // mixins: [vuexMixins({
  //   moduleName: 'invoice',
  //   state: ['invoiceId'],
  //   mutation: ['setModalSuccess']
  // })],
  data () {
    return {
      upLoadPDF: UPLOADPDF_URL,
      fileId: '',
      successForm: {
        invoiceNum: '',
        invoiceFile: ''
      },
      ruleValidate: {
        invoiceNum: [
          { required: true, message: '发票号码不能为空', trigger: 'blur' },
          { validator: this.validateMobile, trigger: 'blur' },
          { type: 'number', message: '请输入数字格式', transform (value) { return Number(value); } }
        ],
        invoiceFile: [
          { validator: this.validateInvoiceFile }
        ]
      }
    };
  },
  created () {
    this.$g_on('clearInvoiceSuccessForm', this.clearInvoiceSuccessForm);
  },
  beforeDestroy () {
    this.$g_off('clearInvoiceSuccessForm', this.clearInvoiceSuccessForm);
  },
  methods: {
    noHome (e) {
      if (this.successForm.invoiceNum.trim() === '') {
        this.successForm.invoiceNum = '';
      }
    },
    submit () {
      this.addOk('successForm');
    },
    handleSuccess (res, file, fileList) {
      this.$refs.successForm.validateField('invoiceFile');
      if (res.success) {
        this.fileId = res.data.file_id;
      }
    },
    handleFormatError (res) {
      this.$warning('请上传pdf文件');
    },
    handleBeforeUpload (response) {
      const len = this.$refs.uploadBtn.fileList.length;
      const check = len < 1;
      if (!check) {
        this.$warning('只能选择一个文件');
      }
      return check;
    },
    handleExceededSize (file, fileList) {
      this.$warning('请上传10M大小之内的文件');
    },
    validateMobile (rule, value, callback) {
      if (!Number.isInteger(+value)) {
        callback(new Error('请输入数字值'));
      } else if (value === '') {
        callback(new Error('发票号码不能为空'));
      } else {
        callback();
      }
    },
    validateInvoiceFile (rule, value, callback) {
      const file = this.$refs.uploadBtn.fileList[0];
      if (file) {
        callback();
      } else {
        callback(new Error('请选择发票文件'));
      }
    },
    addOk (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // true
          // 请求接口
          successfulTicketOpening({
            file_id: this.fileId,
            invoice_no: this.successForm.invoiceNum.trim(),
            invoice_id: this.invoiceId
          }).then((res) => {
            if (res.msg === 'success') {
              this.$success('完成开票成功！');
              this.cancel('successForm');
              this.pageChange(this.page);
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    cancel (name) {
      this.setModalSuccess(false);
      this.$refs[name].resetFields();
      this.$refs.uploadBtn.clearFiles();
    },
    clearInvoiceSuccessForm () {
      this.$refs.successForm.resetFields();
      this.$refs.uploadBtn.clearFiles();
    }
  }

};
</script>
<style lang="less">
.invoiceEdit{
  clear: both;
  overflow: hidden;
  label.ivu-form-item-label{
    height: 38px;
  }
  .ivu-input-wrapper,.ivu-upload{
    width: 88%;
  }
  .ivu-upload{
    display: inline-block;
  }
  .ivu-upload-select,.btn{
    width: 100%;
  }
  // .ivu-form-item-required .ivu-form-item-label::before{
  //   display: none;
  // }
  .content i.dd{
    color: rgb(255, 87, 34);
    font-size: 24px;
    float: left;
    margin: 6px 25px 0 0;
  }
}

</style>
