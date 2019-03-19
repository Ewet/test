<template>
   <div class="golddetail">
       <TopNav
        title="奖励金明细"
       >
       <span slot="right" @click="$go({name : 'WithdrawDetail'})"><em>提现明细</em></span>
       </TopNav>
    <p class="header">
        <span>￥{{totalCommission}}</span><br>
        累计奖励金(元)
    </p>
    <cell-group class="mt20">
        <cell  :value="activeCommission">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>可提现奖励金
            </div>
        </cell>
        <cell :value="unsettleCommission">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>未结算奖励金
            </div>
        </cell>
         <!-- <cell :value="applyCommission">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>已申请奖励金
            </div>
        </cell>
         <cell :value="waitGrantCommission">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>待打款奖励金
            </div>
        </cell>
         <cell value="0">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>无效奖励金
            </div>
        </cell> -->
    </cell-group>
    <!-- <cell-group class="mt20">
         <cell :value="withdrawCommission">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>成功提现奖励金
            </div>
        </cell>
    </cell-group>
     <cell-group class="mt20">
         <cell value="0">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>待收货奖励金
            </div>
        </cell>
        <cell :value="unsettleCommission">
            <div slot="title" class="money-item">
                  <icon  :name="lefticon"/>未结算奖励金
            </div>
        </cell> -->
    </cell-group>
    <p class="attention">注意：可用奖励金满<span>{{withdrawSill}}</span>元才可提现</p>
</div>
</template>
<script>
import { Cell, CellGroup, Icon, NavBar, Toast } from 'vant';
import { getCommissionHome } from '@/model/commissionModel';
import { getHome } from '@/model/distributionCenterModel';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      lefticon: 'jinbi3',
      totalCommission: '0',
      activeCommission: '0',
      applyCommission: '0',
      waitGrantCommission: '0',
      unsettleCommission: '0',
      withdrawCommission: '0',
      withdrawSill: ''
    };
  },
  components: {
    Cell,
    CellGroup,
    Icon,
    NavBar,
    TopNav
  },
  methods: {
    imgClick () {
      this.$go({name: 'PersonalInfo'});
    },
    loadData () {
      this.$showSpin();
      getCommissionHome().then(result => {
        if (result.success) {
          let data = result.data;
          this.totalCommission = data.totalCommission;
          this.activeCommission = data.activeCommission;
          this.applyCommission = data.applyCommission;
          this.waitGrantCommission = data.waitgrantCommission;
          this.unsettleCommission = data.unsettleCommission;
          this.withdrawCommission = data.withdrawCommission;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
      getHome().then(result => {
        let {success, data} = result;
        if (success) {
          this.withdrawSill = data.withdrawSill;
        }
      });
    }
  },
  mounted () {
    this.loadData();
  }
};
</script>
<style>

</style>

<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.golddetail {
    .van-nav-bar__right span{
        position: relative;
        padding: 0.02rem 0.1rem;
        &::after {
          .setLine(#fff);
          border-radius: 0.1rem;
        }
        em {
            font-size: 0.24rem;
            font-style: normal;
        }
    }
    .van-hairline--bottom::after {
            border-bottom: none;
        }
    .header {
        height: 1.6rem;
        color:#fff;
        text-align: center;
        background-color:@primaryColor;
        margin: 0;
        padding-top: .5rem;
        line-height: .5rem;
        font-size: .26rem;
        span {
            font-size: .76rem;
            font-weight: bold;
        }
    }

    .van-cell__right-icon:nth-child(1){
        right: .7rem;
        font-size: .38rem;
        line-height: .38rem;
    }
    .van-icon-jinbi3 {
        color: @primaryColor;
        font-size: 0.4rem;
    }
    .money-item {
        display: flex;
        i {
            margin-right: 0.25rem;
        }
    }
    .right-btn {
        border-radius: 0.5rem;
        border:none;
        background-color: @primaryColor;
        color: #fff;
        font-size: 0.28rem;
        line-height: 0.48rem;
    }
    .attention {
        position: fixed;
        bottom: 0;
        color: #000;
        font-size: 0.26rem;
        left: 0;
        right: 0;
        text-align: center;
        span {
            color: @primaryColor;
        }
    }
}
</style>
