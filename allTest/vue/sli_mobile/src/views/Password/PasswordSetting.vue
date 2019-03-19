<template>
<div class="person-info">
<nav-bar
  title="密码设置"
  left-arrow
  @click-left="back"
/>
<cell-group>
  <switch-cell v-model="isPwd" title="密码登陆"/>
</cell-group>
<p class="tips">开启使用密码登录账号，微信端开启无效</p>
<field
    v-show="pwdType"
    type="text"
    v-model="pwd"
    label="输入密码"
    @click-icon="changePwdType"
  >
  <template slot="button" class="close">
    <icon  name="eye"  @click="changePwdType"/>
  </template>
   </field>
  <field
    v-show="!pwdType"
    type="password"
    v-model="pwd"
    label="输入密码"
    @click-icon="changePwdType"
  >
  <template slot="button" >
    <icon  name="eye"  @click="changePwdType" style="color:#999;"/>
  </template>
  </field>
<cell-group>
<field
    v-show="confirmPwdType"
    type="text"
    v-model="confirmPwd"
    label="确认密码"
  >
   <icon  name="eye" slot="button" @click="changeConfirmPwdType"/>
  </field>
  <field
    v-show="!confirmPwdType"
    type="password"
    v-model="confirmPwd"
    label="确认密码">
  <icon  name="eye" slot="button" @click="changeConfirmPwdType" style="color:#999;"/>
 </field>
</cell-group>
<a href="#" class="reset-pwd" @click.prevent="$go({name: 'PasswordReset'})">重置密码</a>
<Button bottom-action>确定</Button>
</div>
</template>
<script>
import { NavBar, Cell, CellGroup, SwitchCell, Button } from 'vant';
export default {
  data () {
    return {
      isPwd: false,
      pwdType: '',
      confirmPwdType: '',
      pwd: '',
      confirmPwd: ''
    };
  },
  mounted () {
    document.querySelector('.van-switch').style['font-size'] = 'inherit';
  },
  methods: {
    changePwdType () {
      this.pwdType = !this.pwdType ? 'txt' : '';
    },
    changeConfirmPwdType () {
      this.confirmPwdType = !this.confirmPwdType ? 'txt' : '';
    },
    back () {
      history.go(-1);
    }
  },
  components: {NavBar, Cell, CellGroup, SwitchCell, Button}
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
@font-face {
  font-family: 'wap-icon';  /* project id 497252 */
  src: url('//at.alicdn.com/t/font_497252_5fuueul8xbpousor.eot');
  src: url('//at.alicdn.com/t/font_497252_5fuueul8xbpousor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_497252_5fuueul8xbpousor.woff') format('woff'),
  url('//at.alicdn.com/t/font_497252_5fuueul8xbpousor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_497252_5fuueul8xbpousor.svg#iconfont') format('svg');
}
.van-icon {
  font-family: 'vant-icon', 'wap-icon' !important;
}
.van-icon-eye {
    font-size: 0.5rem;
    color: @primaryColor;
}
.van-icon-eye:before {
  content: '\e669';
}

.person-info {
    .tips {
        font-size:.24rem;
        color: #999;
        text-indent: .4rem;
    }
    .van-nav-bar {
        color:#FFFFFF;
        background-color: @primaryColor;
        .van-icon {
            color:#FFFFFF!important;
        }
    }
    .van-switch--on {
        background-color: @primaryColor;
    }
    .reset-pwd {
        font-size: 0.24rem;
        color: @primaryColor;
        float: right;
        margin-top: 0.16rem;
        margin-right: 0.4rem;
    }
    .van-button--bottom-action {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @primaryColor;
    }
}

</style>
