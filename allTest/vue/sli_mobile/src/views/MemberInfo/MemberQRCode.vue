<template>
<div class="memeber-qr">
    <TopNav
     title="我的二维码"
    />
<div class="qr-content">
    <figure>
        <img :src="avatarImg" alt="">
        <p>{{nickname}}
            <icon name="man" v-if="gender==='1'"></icon>
            <icon name="women" v-if="gender==='2'"></icon>
        </p>
        <p>{{address}}</p>
    </figure>
    <div class="qrcode">
        <img :src="qrCodeSrc" alt="" class="qr" @click.prevent>
        <img :src="avatarImg" alt="">
    </div>
    <p>扫一扫上面的二维码，让我们成为小伙伴吧 <br>注意：二维码刷新周期为30天</p>
</div>
</div>
</template>
<script>
import { NavBar, Toast, Icon } from 'vant';
import { getInviteCode } from '@/model/memberModel';
import avatar from './images/avatar.jpg';
import TopNav from 'components/TopNav';
import { share } from '@/utils/wx';
import link from '@/utils/link';
import Vue from 'vue';
export default {
  data () {
    return {
      success: '',
      showQr: false,
      avatarImg: avatar,
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
      let url = `https://${location.host}/mobile${this.$route.fullPath}`;
      if (Vue.device.isIOS) {
        url = link('member-qr', {'invite_code': this.$route.query.invite_code});
      }
      share({
        error: () => {
          Toast('分享失败');
        },
        title: `${this.nickname}邀请您一起来玩摩萄盒子`,
        desc: '摩萄盒子好好玩。',
        img: this.avatarImg,
        url: url
      });
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
.memeber-qr {
    position: relative;
    height: 100%;
    p {
        margin: 0;
    }
    .qr-content {
        position: absolute;
        top:0%;
        left:50%;
        width: 6.6rem;
        box-shadow: 0 0 10px #999;
        transform: translate(-50%,-50%);
        background-color: #fff;
        text-align: center;
        padding: 0.4rem 0 .5rem;
        animation: dropdown 800ms ease-in-out forwards;
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
                width: 4.5rem;
                height: 4.5rem;
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
                width: 0.8rem;
                height: 0.8rem;
            }
        }
        > p {
            color: #999;
            font-size: 0.24rem;
        }
    }
}
@keyframes dropdown {
    0%{
         top:0%;
    }
    100%{
         top:50%;
    }
}

</style>
