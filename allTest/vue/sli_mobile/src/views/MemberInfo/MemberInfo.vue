<template>
<div class="person-info">
    <TopNav
     title="会员资料"
    />
<cell-group>
  <cell class="avatar" title="会员头像">
    <img v-lazy="avatar" alt="" class="img">
  </cell>
  <cell title="会员账号" :value="phone"/>
  <cell title="我的二维码" @click="showQr" v-if="isTrader" is-link>
     <icon  name="qrcode"/>
   </cell>
    <cell title="性别" :value="sex"/>
</cell-group>
<Button bottom-action @click="out" v-if="false">退出登陆</Button>
</div>
</template>
<script>
import { Cell, CellGroup, Popup, Toast, Button, Icon } from 'vant';
import { getProfile, logout } from '@/model/memberModel';
import { authLogin } from '@/utils/jump';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      success: '',
      avatar: '',
      phone: '',
      qrCode: '',
      sex: '',
      isTrader: false
    };
  },
  methods: {
    // back () {
    //   this.$router.back();
    // },
    loadData () {
      this.$showSpin();
      getProfile().then(({success, data, msg, code}) => {
        if (success) {
          this.avatar = data.avatar;
          this.phone = data.mobile;
          this.qrCode = data.qrcode;
          this.sex = data.gender;
          this.isTrader = data.isTrader;
          this.inviteCode = data.inviteCode;
        } else if (code !== 401) {
          Toast(msg);
        }
        this.$hideSpin();
      });
    },
    out () {
      logout().then(result => {
        if (!result.success) {
          Toast(result.msg);
        } else {
          localStorage.removeItem('motaoToken');
          authLogin();
        }
      });
    },
    showQr () {
      let pathname = process.env.NODE_ENV === 'development' ? '' : '/mobile';
      location.href = pathname + `/share.html?invite_code=${this.inviteCode}`;
    },
    show () {
      this.$go({
        name: 'MemberQR',
        query: {
          invite_code: this.inviteCode
        }
      });
    }
  },
  mounted () {
    this.loadData();
  },
  components: {Cell, CellGroup, Popup, TopNav, Button, Icon}
};
</script>
<style lang="less">
.person-info {
  .van-cell {
    align-items: center;
    .van-cell__title {
      color:#000;
    }
    .van-cell__value {
      color:#999;
    }
  }
}
</style>

<style  lang="less" scoped>
@import '~@/assets/color.less';
.person-info {
    .van-button--bottom-action {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @primaryColor;
    }
    .van-icon-qrcode{
        font-size: .5rem;
    }
    .img {
        width: 1rem;
        height: 1rem;
        overflow: hidden;
        border-radius: 50%;
        vertical-align: top;
        display: inline-block;
    }
}

</style>
