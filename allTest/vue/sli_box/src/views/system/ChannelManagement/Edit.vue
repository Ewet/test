<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="商家名称" prop="merchantName">
            <Input :maxlength="30" v-model="formValidate.merchantName" placeholder="请输入商家名称"></Input>
        </FormItem>
        <FormItem label="法人代表" prop="legalPerson">
            <Input :maxlength="10" v-model="formValidate.legalPerson" placeholder="请输入法人代表"></Input>
        </FormItem>
        <FormItem label="地址" prop="address">
            <Input :maxlength="50" v-model="formValidate.address" placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="供应品类" prop="goodsType">
          <Input :maxlength="20" v-model="formValidate.goodsType" placeholder="请输入供应品类"></Input>
        </FormItem>
        <FormItem label="联系人" prop="contact" >
          <Input :maxlength="10" v-model="formValidate.contact" placeholder="请输入联系人"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="mobile">
          <Input :maxlength="11" v-model="formValidate.mobile" placeholder="请输入联系电话"></Input>
        </FormItem>
        <FormItem label="系统账号" prop="systemAccount">
            <Input :maxlength="20" v-model="formValidate.systemAccount" placeholder="请输入系统账号"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newpassword"  v-if="formValidate.merchantId">
            <Input :maxlength="20" v-model="formValidate.newpassword" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="密码" prop="password" v-if="!formValidate.merchantId">
            <Input  :maxlength="20" v-model="formValidate.password" placeholder="请输入密码"></Input>
        </FormItem>

        <FormItem>
            <AddBtn @click="add('formValidate')" v-show="!formValidate.merchantId" />
            <SaveBtn @click="save('formValidate')" v-show="formValidate.merchantId" />
        </FormItem>
    </Form>
</template>
<script>
import { updateItem, addItem } from './model';

import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ChannelManagementEdit',
  data () {
    const validatenewpassword = (rule, value, callback) => {
      if (value !== '' && value.length < 6) {
        callback(new Error('新密码不能小于6位'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        merchantName: '',
        legalPerson: '',
        address: '',
        goodsType: '',
        contact: '',
        mobile: '',
        systemAccount: '',
        password: '',
        newpassword: '',
        merchantId: ''
      },
      ruleValidate: {
        merchantName: [
          {
            required: true, message: '商家名称不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        legalPerson: [
          {
            required: true, message: '法人代表不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        address: [
          {
            required: true, message: '地址不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        goodsType: [
          {
            required: true, message: '供应品类不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        contact: [
          {
            required: true, message: '联系人不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        mobile: [
          {
            required: true, message: '联系电话不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        systemAccount: [
          {
            required: true, message: '系统账号不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          }
        ],
        password: [
          {
            required: true, message: '密码不能为空', trigger: 'blur', transform (value) { return value.toString().trim(); }
          },
          {
            type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur'
          }
        ],
        newpassword: [
          { validator: validatenewpassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

    add (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addItem({
            merchant_name: this.formValidate.merchantName,
            legal_person: this.formValidate.legalPerson,
            address: this.formValidate.address,
            goods_type: this.formValidate.goodsType,
            name: this.formValidate.contact,
            mobile: this.formValidate.mobile,
            account_number: this.formValidate.systemAccount,
            password: this.formValidate.password,
            merchant_id: this.formValidate.merchantId
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('新增成功！');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    save (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateItem({
            merchant_name: this.formValidate.merchantName,
            legal_person: this.formValidate.legalPerson,
            address: this.formValidate.address,
            goods_type: this.formValidate.goodsType,
            name: this.formValidate.contact,
            mobile: this.formValidate.mobile,
            account_number: this.formValidate.systemAccount,
            // password: this.formValidate.password,
            password: this.formValidate.newpassword,
            merchant_id: this.formValidate.merchantId
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          this.$error('表单验证不正确');
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    }
  },
  watch: {
    formData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.merchantName = val.merchantName;
        this.formValidate.legalPerson = val.legalPerson;
        this.formValidate.address = val.address;
        this.formValidate.goodsType = val.goodsType;
        this.formValidate.contact = val.contact;
        this.formValidate.mobile = val.mobile;
        this.formValidate.systemAccount = val.systemAccount;
        // this.id = val.id || '';
        // this.formValidate.password = '';
        this.formValidate.newpassword = '';
        this.formValidate.merchantId = val.merchantId;
      } else {
        this.formValidate = {
          merchantName: '',
          legalPerson: '',
          address: '',
          goodsType: '',
          contact: '',
          mobile: '',
          systemAccount: '',
          password: '',
          newpassword: '',
          merchantId: ''
        };
        // this.id = '';
        // this.activeTimeText = '';
      }
    }
  }
};
</script>
