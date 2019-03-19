<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="120">
        <FormItem label="登录账号" prop="loginAccount" >
            <Input :maxlength="50"
            v-model="formCustom.loginAccount"
            placeholder="请输入登录账号"
            :disabled="id!==''"></Input>
        </FormItem>
        <FormItem label="员工姓名" prop="employeeName">
            <Input :maxlength="50" v-model="formCustom.employeeName" placeholder="请输入员工姓名"></Input>
        </FormItem>
        <FormItem label="联系手机" prop="phone">
            <Input :maxlength="50" v-model="formCustom.phone" placeholder="请输入联系手机"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
            <Input type="password" :maxlength="50" v-model="formCustom.passwd" placeholder="请输入密码"></Input>
        </FormItem>
         <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" :maxlength="50" v-model="formCustom.passwdCheck" placeholder="请再次输入密码"></Input>
        </FormItem>
        <FormItem>
            <AddBtn @click="add('formCustom')" v-show="!id"/>
            <SaveBtn @click="save('formCustom')" v-show="id"/></FormItem>
        </Form>
</template>
<script>
import { updateItem, addItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'EmployeeManagementEdit',
  data () {
    const validatePass = (rule, value, callback) => {
      if (!this.formCustom.passwd && !this.formCustom.passwdCheck && this.id) {
        callback();
        return false;
      }
      if (value === '') {
        callback(new Error('登录密码不能为空'));
      } else if (value.length < 6) {
        callback(new Error('登录密码至少6位'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (!this.formCustom.passwd && !this.formCustom.passwdCheck && this.id) {
        callback();
        return false;
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value.length < 6) {
        callback(new Error('登录密码至少6位'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        loginAccount: '',
        employeeName: '',
        phone: '',
        passwd: '',
        passwdCheck: ''
      },
      ruleValidate: {
        loginAccount: [
          {
            required: true, message: '登录账号不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        employeeName: [
          {
            required: true, message: '员工姓名不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        phone: [
          {
            required: true, message: '联系电话不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      id: ''
    };
  },
  methods: {
    add (name) {
      this.$refs.formCustom.validate((valid) => {
        if (valid) {
          addItem({
            work_name: this.formCustom.employeeName,
            mobile: this.formCustom.phone,
            name: this.formCustom.loginAccount,
            password: this.formCustom.passwd
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
      this.$refs.formCustom.validate((valid) => {
        if (valid) {
          const params = {
            id: this.id,
            work_name: this.formCustom.employeeName,
            mobile: this.formCustom.phone
          };
          const _pwd = this.formCustom.passwd;
          if (_pwd) {
            params.password = _pwd;
          }
          updateItem(params).then(({ success, msg }) => {
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
      this.$refs.formCustom.resetFields();
    }
  },
  watch: {
    formData (val) {
      this.$refs.formCustom.resetFields();
      if (Object.keys(val).length > 0) {
        this.formCustom.loginAccount = val.loginAccount;
        this.formCustom.employeeName = val.employeeName;
        this.formCustom.phone = val.phone;
        this.id = val.id || '';
      } else {
        this.formCustom = {
          loginAccount: '',
          employeeName: '',
          phone: '',
          passwd: '',
          passwdCheck: ''
        };
        this.id = '';
      }
    }
  }
};
</script>
