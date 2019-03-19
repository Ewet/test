<template>
    <Form
        ref="formCustomer"
        :model="formCustomer"
        :rules="ruleValidate"
        :label-width="120">
        <FormItem
            label="电话号码"
            prop="mobile">
            <Input type="text" v-model="formCustomer.mobile" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem
            style="width: 100%;"
            label="消息内容"
            prop="content">
            <Input type="textarea" v-model="formCustomer.content" placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem>
            <ZBtn
            @click="handleSubmit"
            :loading="pending"
            >{{pending ? '发送中...' : '发送消息'}}</ZBtn>
            <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { addItem } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageSendForm',
  methods: {
    handleSubmit () {
      this.$refs.formCustomer.validate(async (valid) => {
        if (valid) {
          this.pending = true;
          const { success, msg } = await addItem({
            mobile: this.formCustomer.mobile,
            message: this.formCustomer.content
          });
          if (success) {
            this.$success('发送成功');
            this.reload();
          } else {
            this.$error(msg);
          }
          this.pending = false;
        }
      });
    },
    handleReset () {
      this.formCustomer = {
        content: '',
        mobile: ''
      };
      this.$refs.formCustomer.resetFields();
    }
  },
  data () {
    return {
      formCustomer: {
        content: '',
        mobile: ''
      },
      ruleValidate: {
        content: [
          {
            required: true, message: '消息内容不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ],
        mobile: [
          {
            required: true, message: '电话号码不能为空', trigger: 'blur', transform: value => value.toString().trim()
          }
        ]
      },
      pending: false
    };
  }
};
</script>

<style scoped>
</style>
