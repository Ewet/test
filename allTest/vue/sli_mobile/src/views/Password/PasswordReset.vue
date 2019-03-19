<template>
<div class="person-info">
<nav-bar
  title="密码重置"
  left-arrow
  @click-left="back"
/>
<cell-group>
 <field
    type="number"
    v-model="phone"
    label="手机号"
  />
  </cell-group>
<cell-group>
  <field
    center
    v-model="sms"
    label="验证码"
    placeholder="请输入验证码"
    icon="clear"
    @click-icon="sms=''"
  >
  <div slot="button">
    <Button
        size="small"
        @click="sendCode"
        v-show="!showBtn" style="color:#fff">发送验证码</Button>
    <Button
        size="small"
        v-show="showBtn"
        disabled>重发({{countdown}}s)</Button>
    </div>
  </field>
</cell-group>
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
<Button bottom-action>确定</Button>
</div>
</template>
<script>
import { NavBar, Cell, CellGroup, SwitchCell, Button } from 'vant';
export default {
  data () {
    return {
      phone: '13800138000',
      isPwd: false,
      pwdType: '',
      confirmPwdType: '',
      pwd: '',
      confirmPwd: '',
      sms: '',
      showBtn: false,
      btnTxt: '发送验证码',
      countdown: 5,
      timer: null
    };
  },
  mounted () {
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
    },
    sendCode () {
      this.showBtn = true;
      this.btnTxt = '重发(' + this.countdown + 's)';
      console.log('123');
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.timer);
          this.showBtn = false;
        }
      }, 1000);
    }
  },
  components: {NavBar, Cell, CellGroup, SwitchCell, Button}
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
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
    .van-button--default {
        background-color:  @primaryColor;
        border: none;
        // color:#fff;
    }
}

</style>
