<template>
   <div class="mc">
       <header>
          <div><icon name="huiyuan"/><p>{{memberLevel}}</p></div>
          <div @click="showCredit"><icon name="quxian"/><p>积分{{score}}</p></div>
          <p>{{phone}}</p>
          <img :src="src"  alt="logo" @click="imgClick">
       </header>
        <cell-group class="fixed-icon mt40">
            <cell
                title="我的订单"
                is-link
                icon="dingdan"
                @click="$go({name: 'OrderList'})"
            >
            </cell>
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
            <cell
                v-show="isTrader"
                title="奖励中心"
                is-link
                icon="fenxiao"
                @click="$go({name: 'DistributionCenterHome'})"
            />
        </cell-group>
        <cell-group  class="fixed-icon mt40">
            <cell title="会员资料" is-link icon="gerenxinxi" @click="$go({name: 'MemberInfo'})"/>
            <!-- <cell title="密码设置" is-link icon="mima" @click="$go({name: 'PasswordSetting'})"/> -->
            <cell title="我的优惠劵" is-link icon="coupon" @click="$go({name: 'MyCoupon'})"/>
        </cell-group>
   </div>
</template>
<script>
import { Cell, CellGroup, Icon, Toast } from 'vant';
import { getProfile } from '@/model/memberModel';
import avatar from './images/avatar.jpg';
export default {
  data () {
    return {
      name: '',
      memberLevel: '',
      phone: '',
      score: '',
      src: avatar,
      isTrader: false
    };
  },
  components: {
    Cell,
    CellGroup,
    Icon
  },
  methods: {
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
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    },
    showCredit () {
      this.$go({name: 'MemberCredit'});
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
.mc {
    height: 100%;
    background-color: #f1f0f6;
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
            font-size: 0.33rem;
            color:#fff;
            left:50%;
            transform: translateX(-50%);
            margin: 0;
            line-height: 1;
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
