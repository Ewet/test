<template>
<div style="height:100%;overflow:hidden;position:absolute;width:100%">
  <img :src="imgSrc" alt="" width="100%">
  <p>{{txt}}</p>
</div>
</template>
<script>

import {
  signin
} from 'model/wechatLogin';
import { Toast } from 'vant';
import { jumpIndex } from 'utils/jump';
import getLink from 'utils/link';
import cup from '../Other/images/cup.gif';
import { setToken, setSessionId } from 'model/memberModel';
export default {
  data () {
    return {
      code: this.$route.query.code,
      txt: '登录中...',
      imgSrc: cup
    };
  },
  mounted () {
    this.authLogin();
  },
  methods: {
    async authLogin () {
      let { success, data, msg, code } = await signin({
        callback: getLink('user-login'),
        code: this.code
      });
      console.log(success, data, msg, code);
      if (success) {
        if (data.token) {
          // 设置缓存token
          setToken(data.token);
          // 清理session_id
          setSessionId(null);
        }
        // 跳到登录前的页面
        jumpIndex();
      } else {
        // 需要进行url跳转
        if (code === 300) {
          location.replace(data.url);
        } else if (code === 402) {
          setSessionId(data.session_id);
          //   跳转到手机注册页
          this.$replace({
            name: 'UserRegister'
          });
        } else {
          this.txt = msg;
          Toast(msg);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
p {
    position: absolute;
    top: 8rem;
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 0.8);
    width: 101%;
}
</style>
