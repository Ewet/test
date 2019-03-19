<template>
    <Form ref="formCustomer" :model="formCustomer" :rules="ruleValidate" :label-width="120">
        <FormItem label="商户名称" prop="merchantName">
            <Input :maxlength="50" v-model="formCustomer.merchantName" placeholder="请输入商户名称"></Input>
        </FormItem>
         <FormItem label="法人代表" prop="legalRepresentative">
            <Input :maxlength="50" v-model="formCustomer.legalRepresentative" placeholder="请输入法人代表"></Input>
        </FormItem>
        <FormItem label="商户地址" prop="merchantAddress">
            <Input :maxlength="50" v-model="formCustomer.merchantAddress" placeholder="请输入商户地址"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="mobile">
            <Input :maxlength="15" v-model="formCustomer.mobile" placeholder="请输入联系电话"></Input>
        </FormItem>
        <FormItem label="结算银行" prop="bankName">
            <Input :maxlength="50" v-model="formCustomer.bankName" placeholder="请输入结算银行"></Input>
        </FormItem>
        <FormItem label="银行账号" prop="bankAccount">
            <Input :maxlength="50" v-model="formCustomer.bankAccount" placeholder="请输入银行账号"></Input>
        </FormItem>
         <FormItem label="加盟时间" prop="joiningTime">
            <DatePicker type="datetime" placeholder="请选择时间" style="width: 100%" v-model="formCustomer.joiningTime"></DatePicker>
        </FormItem>
        <FormItem label="商户登录名" prop="merchantUsername" v-show="!id" >
            <Input :maxlength="50" v-model="formCustomer.merchantUsername" placeholder="请输入商户登录名"></Input>
        </FormItem>
        <FormItem label="商户登录密码" prop="merchantPwd" v-show="!id" >
            <Input
            ref="pwd"
            type="password" :maxlength="50" v-model="formCustomer.merchantPwd" placeholder="请输入商户登录密码"></Input>
        </FormItem>
        <FormItem>
            <ZBtn
              :loading="loading"
              :disabled="loading"
              @click="add('formCustomer')"
              v-show="!id">
                <span v-if="!loading">新增</span>
                <span v-else>保存中...</span>
            </ZBtn>
            <ZBtn
              :loading="loading"
              :disabled="loading"
              @click="save('formCustomer')"
              v-show="id">
                <span v-if="!loading">保存</span>
                <span v-else>保存中...</span>
            </ZBtn>
             </FormItem>
          </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantManagementEdit',
  data () {
    const mobilePass = (rule, value, callback) => {
      if (!value || !value.trim()) {
        callback(new Error('联系电话不能为空'));
      }
      callback();
    };
    const merchantUsernamePass = (rule, value, callback) => {
      if (!value && !this.id) {
        callback(new Error('商户登录名不能为空'));
      }
      callback();
    };
    const merchantPwdPass = (rule, value, callback) => {
      if (!value && !this.id) {
        callback(new Error('商户登录密码不能为空'));
      }
      callback();
    };
    return {
      formCustomer: {
        merchantName: '',
        legalRepresentative: '',
        merchantAddress: '',
        mobile: '',
        bankName: '',
        bankAccount: '',
        joiningTime: null,
        merchantUsername: '',
        merchantPwd: ''
      },
      ruleValidate: {
        merchantName: [
          { required: true, message: '商户名称不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: mobilePass, trigger: 'blur' }
        ],
        merchantUsername: [
          { required: true, validator: merchantUsernamePass, trigger: 'blur' }
        ],
        merchantPwd: [
          { required: true, validator: merchantPwdPass, trigger: 'blur' }
        ]
      },
      id: '',
      loading: false
    };
  },
  methods: {
    add (name) {
      this.$refs.formCustomer.validate((valid) => {
        if (valid) {
          this.loading = true;
          let time = this.formCustomer.joiningTime;
          if (time) {
            time = this.$formatTime(this.formCustomer.joiningTime, 'ymd-hms');
          } else {
            time = '';
          }
          addItem({
            name: this.formCustomer.merchantName,
            legal_person: this.formCustomer.legalRepresentative,
            address: this.formCustomer.merchantAddress,
            mobile: this.formCustomer.mobile,
            bank_name: this.formCustomer.bankName,
            bank_account: this.formCustomer.bankAccount,
            join_time: time,
            username: this.formCustomer.merchantUsername,
            password: this.formCustomer.merchantPwd
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
            this.loading = false;
          });
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    save (name) {
      this.$refs.formCustomer.validate((valid) => {
        if (valid) {
          this.loading = true;
          let time = this.formCustomer.joiningTime;
          if (time) {
            time = this.$formatTime(this.formCustomer.joiningTime, 'ymd-hms');
          } else {
            time = '';
          }
          updateItem({
            merchant_id: this.id,
            name: this.formCustomer.merchantName,
            legal_person: this.formCustomer.legalRepresentative,
            address: this.formCustomer.merchantAddress,
            mobile: this.formCustomer.mobile,
            bank_name: this.formCustomer.bankName,
            bank_account: this.formCustomer.bankAccount,
            join_time: time
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
              this.formCustomer.joiningTime = null;
            } else {
              this.$error(msg);
            }
            this.loading = false;
          });
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    handleReset (name) {
      this.$refs.formCustomer.resetFields();
    }
  },
  watch: {
    formData (val) {
      this.$refs.formCustomer.resetFields();
      if (Object.keys(val).length > 0) {
        this.formCustomer.merchantName = val.merchantName;
        this.formCustomer.legalRepresentative = val.legalRepresentative;
        this.formCustomer.merchantAddress = val.merchantAddress;
        this.formCustomer.mobile = val.mobile;
        this.formCustomer.bankName = val.bankName;
        this.formCustomer.bankAccount = val.bankAccount;
        this.formCustomer.joiningTime = val.joiningTime;
        this.id = val.id || '';
      } else {
        this.formCustomer = {
          merchantName: '',
          legalRepresentative: '',
          merchantAddress: '',
          mobile: '',
          bankName: '',
          bankAccount: '',
          joiningTime: null,
          merchantUsername: '',
          merchantPwd: ''
        };
        this.id = '';
      }
    }
  }
};
</script>
