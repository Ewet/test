<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="登陆账号" prop="account" >
            <Input
            :maxlength="50"
            v-model="formValidate.account"
            placeholder="请输入登陆账号"></Input>
        </FormItem>
        <FormItem label="密码" prop="password" >
            <Input
            type="password"
            :maxlength="50"
            v-model="formValidate.password"
            placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPassword" >
            <Input
            type="password"
            :maxlength="50"
            v-model="formValidate.confirmPassword"
            placeholder="请确认密码"></Input>
        </FormItem>
        <FormItem class="formBtn">
            <DetermineBtn @click="confirm()" />
            <CancelBtn @click="setSettingModal(false)" />
        </FormItem>
    </Form>
</template>
<script>
import { updateSignInInfo } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    const confirmPasswordCheck = (rule, value, callback) => {
      const password = this.formValidate.password;
      if (this.trim(value) === '' || value === null) {
        callback(new Error('请确认密码'));
      } else if (password !== value) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        account: '',
        password: '',
        confirmPassword: '',
        id: ''
      },
      ruleValidate: {
        account: [
          { required: true, message: '登陆账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: confirmPasswordCheck, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },

    // 确认登陆设置
    confirm () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          updateSignInInfo({
            username: this.formValidate.account,
            password: this.formValidate.password,
            operator_id: this.formValidate.id
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setSettingModal(false);
              this.reload();
              this.$refs.formValidate.resetFields();
              this.formValidate = {};
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    }

  },
  watch: {
    signInData (val) {
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        this.formValidate.account = this.signInData.account;
        this.formValidate.password = this.signInData.password;
        this.formValidate.confirmPassword = this.signInData.password;
        this.formValidate.id = this.signInData.businessmanId;
      } else {
        this.formValidate = {
          account: '',
          password: '',
          confirmPassword: '',
          id: ''
        };
      }
    }
  },
  components: {

  },
  computed: {

  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.formBtn{
  text-align:right;
}
.wxImgRow{

}
.wxImg{
  width: 100px;
  height: 100px;
  margin:0 auto;
}
.wxImg>img{
  display: block;
  width:100%;
  height: 100%;
  margin-left: -50px;
  border-radius:50%;
}

</style>
