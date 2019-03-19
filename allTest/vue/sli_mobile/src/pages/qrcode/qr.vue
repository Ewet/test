<template>
    <div class="qr-content">
        <div class="qrcode">
            <img :src="qrCodeSrc" alt="" class="qr" @click.prevent>
            <img :src="avatarImg" alt="">
        </div>
        <p>扫一扫上面的二维码，让我们成为小伙伴吧 <br>注意：二维码刷新周期为30天</p>
    </div>
</template>
<script>
import { NavBar, Toast, Icon } from 'vant';
import { getInviteCode } from '@/model/memberModel';
import TopNav from 'components/TopNav';
import wechat from '@/utils/wechat';
import device from '@/utils/device';
export default {
  data () {
    return {
      success: '',
      showQr: false,
      avatarImg: '',
      nickname: '',
      gender: '',
      address: '',
      qrCodeSrc: '',
      isTrader: false
    };
  },
  methods: {
    loadData () {
      this.loadQr();
    },
    loadQr () {
      this.$showSpin();
      getInviteCode({
        invite_code: this.$route.query.invite_code
      }).then(({success, data, msg}) => {
        if (success) {
          this.qrCodeSrc = data.url;
          this.avatarImg = data.avatar;
          this.nickname = data.nickname;
          this.gender = data.genderVal;
          this.address = data.address;
          this.qrCode = data.qrcode;
          this.isTrader = data.isTrader;
        } else if (msg) {
          Toast(msg);
        }
        this.$hideSpin();
        this.shareIt();
      });
    },
    shareIt () {
      let url = location.href;
      let imgSrc = this.avatarImg;
      let title = `${this.nickname}邀请您一起来玩摩萄盒子`;
      let desc = '摩萄盒子好好玩。';
      if (device.isIOS) {
        console.group('IOS设备');
        if (!window.wxConfig) {
          console.log('首次配置微信');
          wechat.getJSSDKAsync(url).then(() => {
            window.wxConfig = true;
            console.log('配置成功');
            console.log('初始化菜单配置');
            wechat.setWxShare(title, desc, url, imgSrc);
            console.groupEnd();
          });
        } else {
          console.log('已经配置过微信');
          console.log('初始化菜单配置');
          wechat.setWxShare(title, desc, url, imgSrc);
          console.groupEnd();
        }
      } else {
        console.group('安卓设备');
        console.log('配置微信');
        wechat.getJSSDKAsync(url).then(() => {
          console.log('初始化菜单配置');
          wechat.setWxShare(title, desc, url, imgSrc);
          console.groupEnd();
        });
      }
    }
  },
  mounted () {
    this.loadData();
  },
  components: {NavBar, TopNav, Icon}
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
p {
        margin: 0;
}
.qr-content {
    // width: 6.6rem;
    // box-shadow: 0 0 10px #999;
    // transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    padding: 0.4rem 0 .5rem;
    height: 100%;
    box-sizing: border-box;
    // animation: dropdown 800ms ease-out forwards;
    figure {
        margin: 0 0 0 0.4rem;
        height: 1.2rem;
        text-align: left;
        figcaption {
            font-size: 0.28rem;
            color:#000;
        }
        img {
            width:1.2rem;
            height: 1.2rem;
            float: left;
            margin-right: .25rem;
        }
        p:first-of-type{
            color: #000;
        }
        p {
            line-height: 0.5rem;
            font-size: 0.24rem;
            color: #999;
        }
    }
    .qrcode {
        position: relative;
        .qr {
            width: 60%;
            height: 60%;
            margin: 0.58rem auto;
            display: block;
            background: #eee;
        }
        img:last-child {
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            width: 1rem;
            height: 1rem;
        }
    }
    > p {
        color: #999;
        font-size: 0.24rem;
    }
}
@keyframes dropdown {
    0%{
         transform:translate3d(0,-100%,0);
    }
    100%{
        transform:translate3d(0,0,0);
    }
}

</style>
