<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="当前密码" prop="originPwd">
            <Input type="password" v-model="formCustom.originPwd" placeholder="请输入您的旧密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd" placeholder="6-10个字符"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="6-10个字符"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            <Button @click="close()" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
import { resetPassword } from 'model/user';
import { jumpLogin } from '@/utils/jump';

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('新密码不能为空!'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码不能为空!'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateOriginPwd = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('当前密码不能为空!'));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        originPwd: ''
      },
      ruleCustom: {
        passwd: [
          { required: true, message: '新密码不能为空!', trigger: 'blur' },
          {
            type: 'string', min: 6, max: 10, message: '请输入6~10位字符', trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, message: '确认新密码不能为空!', trigger: 'blur' },
          {
            type: 'string', min: 6, max: 10, message: '请输入6~10位字符', trigger: 'blur'
          },
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        originPwd: [
          { required: true, message: '当前密码不能为空!', trigger: 'blur' },
          {
            type: 'string', min: 6, message: '请输入6~10位字符', trigger: 'blur'
          },
          { validator: validateOriginPwd, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.$g_on('password_clear', this.handleReset);
  },
  beforeDestroy () {
    this.$g_off('password_clear', this.handleReset);
  },
  methods: {
    async handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const { success, msg } = await resetPassword({
            password: this.formCustom.originPwd,
            newPassword: this.formCustom.passwd
          });
          if (success) {
            this.$success('修改密码成功!');
            setTimeout(() => {
              jumpLogin();
            }, 2000);
          } else {
            this.$error(msg);
          }
        }
      });
    },
    handleReset () {
      this.$refs.formCustom.resetFields();
    },
    close () {
      this.$emit('closeModel');
    }
  }
};
</script>
