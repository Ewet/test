
<template>
    <StructPage class="register-wrap">
        <Header
            slot="header"
            title="注册"
        />
        <div slot="content" class="registered">
            <img :src="require('assets/motao.png')" alt="">
            <cell-group
                    :border="false"
                    class="van-hairline--bottom"
                >
                <field
                    v-model="typeFormat"
                    label="国家/地区"
                    readonly
                    icon="arrow"
                    class="invoice-header"
                    @click="showPicker=true"
                    @click-icon="showPicker=true"
                />
            </cell-group>
            <cell-group
                :border="false"
                class="van-hairline--bottom"
            >
                <field
                    label-align='center'
                    v-model="phone"
                    placeholder="请输入手机"
                    :maxlength="11"
                    class="van-hairline--bottom"
                >
                <icon name="phone" slot="label"  style="font-size: 0.4rem;"/>
                </field>
            </cell-group>
            <cell-group
                :border="false"
                class="van-hairline--bottom"
            >
                <field
                    label-align='center'
                    v-model="sms"
                    placeholder="请输入验证码"
                    @click-icon="sms = ''"
                >
                    <icon name="bag" slot="label" style="font-size: 0.4rem;"/>
                    <Button
                    v-show="count<=0"
                    slot="button"
                    size="small"
                    type="primary"
                    class="code"
                    @click="sendSms"
                    >获取验证码</Button>
                    <Button
                    v-show="count>0"
                    disabled
                    slot="button"
                    size="small"
                    type="primary"
                    class="code"
                    @click="sendSms"
                    >{{count}}秒</Button>
                </field>
            </cell-group>
            <div class="tips"><Checkbox v-model="agree"><span class="gray9">我已阅读并同意</span><span class="text" @click.stop="showProtocol=true">《摩萄盒子用户服务条款》</span></Checkbox></div>
            <Protocol v-model="showProtocol"/>
             <Btn
            :disabled="!agree"
            class="btn"
            size="large"
            @click="registered"
            :loading="loading"
            >注册</Btn>
        </div>
        <div slot="footer" style="text-align:center;padding:0.2rem 0">
            <popup  v-model="showPicker" position="bottom" :overlay="true" :close-on-click-overlay="false">
                <picker
                    show-toolbar
                    :columns="columns"
                    :visible-item-count="3"
                    title="请选择地区"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </popup>
        </div>
    </StructPage>
</template>

<script>
import { CellGroup, Field, Popup, Picker, Toast, Button, Icon, Checkbox } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import Btn from 'components/Btn';
import { authLogin, jumpIndex } from '@/utils/jump';
import { registerPhone, sendCode } from 'model/wechatLogin';
import { setToken, setSessionId } from 'model/memberModel';
import Protocol from './Protocol';
export default {
  data () {
    return {
      showPicker: false,
      columns: [{
        text: '+86(中国内地)',
        value: '86'
      }, {
        text: '+00852(中国香港)',
        value: '00852'
      }],
      type: '86',
      typeFormat: '+86(中国内地)',
      phone: '',
      pwd: '',
      sms: '',
      count: 0,
      timer: null,
      agree: true,
      loading: false,
      showProtocol: false
    };
  },
  methods: {
    async registered () {
      if (!this.phone.trim()) {
        Toast('手机号码不能为空');
        return false;
      }
      if (!this.sms.trim()) {
        Toast('验证码不能为空');
        return false;
      }
      this.loading = true;
      let { success, msg, data, code } = await registerPhone({
        'idd_code': this.type,
        'mobile': this.phone,
        'code': this.sms
      });
      if (success) {
        Toast('注册成功!');
        // 设置令牌
        setToken(data.token);
        // 清空sessionId
        setSessionId(null);
        jumpIndex();
      } else {
        Toast(msg);
        // 用户信息缓存已过期，需重走登录流程进行获取
        if (code === 601) {
          this.$replace({
            name: 'UserLogin'
          });
        }
      }
      this.loading = false;
    },
    async sendSms () {
      console.log('>>', this.phone);
      if (!this.phone.trim()) {
        Toast('手机号码不能为空');
        return false;
      }
      let { success, msg } = await sendCode({
        'idd_code': this.type,
        'mobile': this.phone
      });
      if (success) {
        Toast('验证码发送成功!');
        this.countdown();
      } else {
        Toast(msg);
        this.countdown();
      }
    },
    countdown () {
      this.count = 120;
      this.timer = setInterval(() => {
        this.count--;
        if (this.count <= 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    pagelogin () {
      let callbackURL = `${location.origin}${this.$router.options.base}callback`;
      console.log('callbackURL', callbackURL);
      authLogin(callbackURL);
      // login({
      //   username: this.phone,
      //   pwd: this.pwd,
      //   sms: this.sms
      // }).then(result => {
      //   if (!result.success) {
      //     Toast(result.msg);
      //   } else {
      //     localStorage.setItem('motaoToken', result.data.motaoToken);
      //     jumpIndex();
      //   }
      // });
    },
    onConfirm (value, index) {
      this.typeFormat = value.text;
      this.type = value.value;
      this.showPicker = false;
    },
    onCancel () {
      this.showPicker = false;
    }
  },
  components: {
    StructPage,
    Header,
    Btn,
    Button,
    Field,
    Icon,
    CellGroup,
    Popup,
    Picker,
    Toast,
    Checkbox,
    Protocol
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.register-wrap{
    background-color: #fff;
    .van-cell{
        padding:0.2rem 0;
        font-size: .28rem;
    }
    .van-picker__toolbar {
        background: #fff;
    }
    .van-picker__columns{
        background: #D3D3D9;
    }
    .van-picker__title,.van-picker__cancel,.van-picker__confirm {
        color: @primaryColor;
        font-size: 0.3rem;
    }
    .van-picker-column__item {
        color: #a79898;
        font-size: 0.28rem;
        opacity: 0.5;
    }
    .van-picker-column__item--selected {
        opacity: 1;
    }
    .van-cell--required::before {
        color: @primaryColor;
    }
}
</style>
<style lang="less" scoped>
@import '~@/assets/color.less';
.registered {
    height: 100%;
    background: #fff;
    font-size: 0.28rem;
    padding: 1.6rem 0.7rem 0;
    box-sizing: border-box;
    text-align: center;
    img {
        display: block;
        width: 2.38rem;
        height: 1.82rem;
        margin:0 auto 1.2rem;
    }
    .code {
        background-color: @primaryColor;
        border: 1px solid @primaryColor;
    }
    .van-field__control{
            padding: 0 0.2rem;
            color: #BBBBBB;
            border: 1px solid #D3D3D9;
            border-radius:0.1rem;
        }
    .tips{
        .text {
            color: @primaryColor;
        }
        font-size:0.24rem;
        padding-top:0.36rem;
        .van-icon{
            font-size:0.3rem;
        }
        .gray9{
            color:#999999;
        }
    }
    .btn {
        margin-top:1rem;
    }
}

</style>
