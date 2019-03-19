<template>
<div class="model">
 <Card :bordered="false"  style="width:500px">
    <p slot="title" style="text-align: center;font-size: 20px;">用户登录</p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名" size="large">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码" size="large">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button :disabled="submiting" style="width:100%" type="primary" @click.prevent="handleSubmit()" size="large">登录</Button>
        </FormItem>
    </Form>
     </Card></div>
</template>
<script>
import {
  Form, FormItem, Icon, Input, Button, Card
} from 'iview';
import { jumpIndex } from '@/utils/jump';
import { login, getCurrentLander } from 'model/user';
import { debounce } from 'lodash';
import tips from '@/utils/tips';

export default {
  components: {
    Form, FormItem, Icon, Input, Button, Card
  },
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            type: 'string', min: 6, message: '密码长度至少为6位', trigger: 'blur'
          }
        ]
      },
      submiting: false
    };
  },
  created () {
    document.addEventListener('keydown', this.kewdownSubmit.bind(this));
    this.handleSubmit = debounce(this.handleSubmit, 500);
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.kewdownSubmit.bind(this));
  },
  mounted () {
    getCurrentLander().then(({ success }) => {
      if (success) {
        jumpIndex();
      }
    });
  },
  methods: {
    handleSubmit () {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          this.submiting = true;
          login({
            name: this.formInline.user,
            password: this.formInline.password
          }).then((result) => {
            if (result.success) {
              tips.success('登录成功!');
              // let beforeJumpUrl = sessionStorage.getItem('beforeJumpUrl', '');
              // if (beforeJumpUrl) {
              //   sessionStorage.removeItem('beforeJumpUrl');
              //   location.replace(beforeJumpUrl);
              // } else {
              //   jumpIndex();
              // }
              jumpIndex();
            } else {
              tips.error(`登录失败!${result.msg}`);
            }
            this.submiting = false;
          });
        } else {
        }
      });
    },
    kewdownSubmit (event) {
      if (event.keyCode === 13) {
        this.handleSubmit();
      }
    }
  }
};
</script>
<style>
.model {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to top left, #ffffff 0%, #e7f4fc 100%);
}
.model .ivu-card {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
}
</style>
