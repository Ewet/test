<i18n>
{
  "en": {
    "reward_center": "reward_center"
  },
  "zh-cn": {
    "reward_center": "奖励中心"
  },
  "zh-hk": {
    "reward_center": "獎勵中心"
  }
}
</i18n>
<template>
    <StructPage class="member-index">
       <div slot="content">
        <header>
          <div><icon name="huiyuan"/><p>{{memberLevel}}</p></div>
          <div @click="showCredit"><icon name="quxian"/><p>积分{{score}}</p></div>
          <p  @click="showQr">{{phone}}<icon name="qr"/></p>
          <img :src="src"  alt="logo" @click="imgClick">
       </header>
       <cell-group class="fixed-icon mt10">
            <cell
                v-show="isTrader"
                :title="$t('reward_center')"
                is-link
                icon="qiandai"
                @click="$go({name: 'DistributionCenterHome'})"
            />
            <cell
                title="我的订单"
                is-link
                icon="myorder"
                @click="$go({name: 'OrderList'})"
            />
            <cell
                title="退货/售后"
                is-link
                icon="refund"
                @click="$go({name: 'Refund'})"
            />
            <cell
                title="我的发票"
                is-link
                icon="myinvoice"
                @click="$go({name: 'Invoice'})"
            />
            <cell
                title="我的优惠劵"
                is-link
                icon="mycoupon"
                @click="$go({name: 'MyCoupon'})"
            />
            <!-- <cell
                title="附近的盒子"
                is-link
                icon="nearbybox"
                @click="$go({name: 'Refund'})"
            /> -->
        </cell-group>
        <cell-group  class="fixed-icon mt10"
            v-show="role && role.isReplenishman">
            <cell
                title="补货记录"
                is-link
                icon="buhuorecord"
                @click="$go({name: 'ReplenishmentRecord'})"
            />
            <cell
                title="货位状态"
                is-link
                icon="locationstatus"
                @click="$go({name: 'RealStatusTime'})"
            />
        </cell-group>
        <cell-group class="fixed-icon mt10"
            >
            <cell
                v-show="role && role.isPurchasingAgent"
                title="代购订单"
                is-link
                icon="purchasing"
                @click="$go({name: 'PurchaseOrder'})"
            />
            <cell
               v-show="!role || !role.isPurchasingAgent"
                title="代购申请"
                is-link
                icon="dingdan"
                @click="$go({name: 'PurchaseApplication'})"
            />
            <cell
                v-show="role && role.isPurchasingAgent"
                title="我的盒子"
                is-link
                icon="mybox"
                @click="$go({name: 'MyBox'})"
            />
        </cell-group>
        <cell-group class="fixed-icon mt10">
            <cell
                title="我的二维码"
                is-link
                icon="myqrcode"
                @click="goMyCode"
            />
            <!-- <cell
            title="消费记录"
            is-link
            icon="qiandai"
            @click="$go({name: 'ConsumptionRecordList'})"
            />
            <cell
            title="收货地址"
            is-link
            icon="dizhi"
            @click="$go({name: 'AddressList'})"
            /> -->
        </cell-group>
        <cell-group  class="fixed-icon mt10">
            <!-- <cell title="会员资料" is-link icon="gerenxinxi" @click="$go({name: 'MemberInfo'})"/> -->
            <!-- <cell title="密码设置" is-link icon="mima" @click="$go({name: 'PasswordSetting'})"/> -->
            <!-- <cell title="我的优惠劵" is-link icon="coupon" @click="$go({name: 'MyCoupon'})"/> -->
            <!-- <cell title="盒子实时状态" is-link icon="coupon" @click="$go({name: 'RealStatusTime'})"/> -->
        </cell-group>
       <MyQRCodeModal
       v-model="showMyQR"
       :inviteCode="inviteCode"/>
       </div>
    </StructPage>
</template>
<script>
import { Cell, CellGroup, Icon, Toast } from 'vant';
import { getProfile, getRole } from 'model/memberModel';
import avatar from './images/avatar.jpg';
import StructPage from 'components/StructPage';
import MyQRCodeModal from 'components/MyQRCodeModal';
export default {
  data () {
    return {
      name: '',
      memberLevel: '',
      phone: '',
      score: '',
      src: avatar,
      isTrader: false,
      inviteCode: '',
      showMyQR: false,
      role: null
    };
  },
  components: {
    Cell,
    CellGroup,
    Icon,
    StructPage,
    MyQRCodeModal
  },
  created () {
    this.loadRole();
  },
  methods: {
    async loadRole () {
      let { success, data, msg } = await getRole();
      if (success) {
        this.role = data;
      } else {
        this.$error(msg);
      }
    },
    imgClick () {
      this.$go({name: 'MemberInfo'});
    },
    loadData () {
      this.$showSpin();
      getProfile().then(result => {
        if (result.success) {
          let data = result.data;
          this.memberLevel = data.level.length > 0 ? data.level[0] : '普通会员';
          this.phone = data.mobile.replace(/(\d{3})(\d{5})(\d{3})/, '$1***$3');
          this.score = data.credit;
          this.isTrader = data.isTrader;
          if (data.avatar) {
            this.src = data.avatar;
          }
          this.inviteCode = data.inviteCode;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    },
    showCredit () {
      this.$go({name: 'MemberCredit'});
    },
    goMyCode () {
      let pathname = process.env.NODE_ENV === 'development' ? '' : '/mobile';
      location.href = pathname + `/share.html?invite_code=${this.inviteCode}`;
    },
    showQr () {
      this.showMyQR = true;
    }
  },
  mounted () {
    this.loadData();
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.member-index {
    height: 100%;
    // background-color: #f1f0f6;
    header {
        color:#DBC3E7;
        height: 4.86rem;
        background-color: @primaryColor;
        position: relative;
        text-align: center;
        .van-icon {
            display: block;
            font-size: 1rem;
        }
        .van-icon + p {
            font-size: .28rem;
            margin: .3rem 0 0;
        }
        div, div + p {
            position:absolute;
            bottom:0.6rem;
        }
        div:nth-child(1) {
            left: 0.68rem;
        }
        div:nth-child(2) {
            right: 0.81rem;
        }
        div + p {
            display: flex;
            align-items: center;
            font-size: 0.33rem;
            color:#fff;
            left:50%;
            transform: translateX(-50%);
            margin: 0;
            line-height: 1;
            .van-icon-qr{
                display: inline-block;
                font-size: 0.3rem;
                margin-left: 0.1rem;
            }
        }
        img {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            box-sizing: border-box;
            padding:0.15rem;
            background-clip: padding-box;
            background-color:#D3B4E1;
            border: 0.16rem solid transparent;
            box-shadow: 0 0 0.05rem #ffffff;
        }
    }
}
</style>
