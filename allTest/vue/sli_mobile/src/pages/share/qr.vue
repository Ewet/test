<template>
<div class="memeber-qr">
    <TopNav
     title="我的二维码"
    />
 <MyQRCode :inviteCode="inviteCode"/>
</div>
</template>
<script>
import { NavBar, Toast, Icon } from 'vant';
import { getInviteCode } from '@/model/memberModel';
import TopNav from 'components/TopNav';
import wechat from '@/utils/wechat';
import device from '@/utils/device';
import MyQRCode from 'components/MyQRCode';
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
      isTrader: false,
      inviteCode: this.$route.query.invite_code
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
        if (!window.wxConfig) {
          wechat.getJSSDKAsync(url).then(() => {
            window.wxConfig = true;
            wechat.setWxShare(title, desc, url, imgSrc);
          });
        } else {
          wechat.setWxShare(title, desc, url, imgSrc);
        }
      } else {
        wechat.getJSSDKAsync(url).then(() => {
          wechat.setWxShare(title, desc, url, imgSrc);
        });
      }
    }
  },
  mounted () {
    this.loadData();
  },
  components: {NavBar, TopNav, Icon, MyQRCode}
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.memeber-qr {
    position: relative;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>
