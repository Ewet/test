<i18n>
{
  "en": {
    "reward_center": "Reward Center",
    "setting": "Setting"
  },
  "zh-cn": {
    "reward_center": "奖励中心",
    "setting": "设置"
  },
  "zh-hk": {
    "reward_center": "獎勵中心",
    "setting": "設置"
  }
}
</i18n>
<template>
   <div class="dchome">
        <!-- <nav-bar
            title="奖励中心"
            left-arrow
            @click-left="$go({name : 'MemberCenter'})"
            :zIndex="9"
            > -->
            <TopNav
                :title="$t('reward_center')"
                :back="back"
            >
            <span slot="right" v-if="false">
            <icon name="setting" />{{$t('setting')}}</span>
        </TopNav>
    <div class="avatar" >
        <div class="border" @click="imgClick"><img  :src="avatar" alt=""></div>
        <div>
            <p>{{username}}
            </p>
            <div class="level">
                <div v-if="level.length===0"
                @click="handleUpgrade"
                >
                    <span >普通会员&nbsp;</span>
                    <!-- <span class="upgrade">去升级<icon name="upgrade"/></span> -->
                </div>
                <span v-else>{{level.join(' / ')}}&nbsp;<icon name="crown"/></span>
            </div>
        </div>
    </div>
    <cell-group class="mt20 mr25">
        <cell>
            <div slot="title" class="money-item fixed-icon">
                  <icon  name="dollar"/>
                  <p><span>￥{{withdrawCommission}}</span><br/>已提奖励金</p>
            </div>
        </cell>
    </cell-group>
    <cell-group>
        <cell>
            <div slot="title" class="money-item fixed-icon mr25">
                  <icon  name="jinbimore"/>
                  <p><span>￥{{activeCommission}}</span><br/>可提现奖励金</p>
            </div>
            <Button
            slot="right-icon"
            class="right-btn"
            @click="$go({name : 'RewardGoldWithdraw'})"
            tag="a"
            >提取奖励金</Button>
        </cell>
    </cell-group>
     <cell-group class="mt20 fixed-icon mr25">
        <cell class="center">
            <ul class="quick-entry">
                <li @click="$go({name : 'RewardGoldPool'})">
                     <icon  name="appjinbi"/>
                     <p>奖励金详情<br/><span>￥{{totalCommission}}</span>
                     </p>
                </li>
                <li @click="$go({name : 'RewardGoldDetail'})">
                     <icon  name="dollar2"/>
                     <p>奖励金明细<br/><span>{{commissionCount}}笔</span>
                     </p>
                </li>
                <li @click="$go({name : 'WithdrawDetail'})">
                     <icon  name="zhifubao"/>
                     <p>提现明细<br/><span>{{withdrawCount}}笔</span>
                     </p>
                </li>
                <li @click="$go({name : 'MyPartner'})">
                     <icon  name="renshu"/>
                     <p>我的小伙伴<br/><span>{{subordinateCount}}</span>
                     </p>
                </li>
            </ul>
        </cell>
    </cell-group>
    <div class="mt20">
        <!-- <cell-group >
            <cell title="我的额度" is-link @click="$go({name : 'MyQuota'})"/>
        </cell-group> -->
        <cell-group  v-if="isTrader">
            <cell title="我的二维码" @click="showQR" is-link>
            <icon  name="qrcode" style="font-size:0.5rem;color:#aaa"/>
            </cell>
        </cell-group>
    </div>
    <popup v-model="showQr" position="right" :overlay="true">
</popup>
</div>
</template>
<script>
import { Cell, CellGroup, Icon, NavBar, Toast, Popup, Button } from 'vant';
import { getHome } from '@/model/distributionCenterModel';
import { getProfile } from '@/model/memberModel';
import avatarImg from '@/assets/avatar.jpg';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      showQr: false,
      username: '',
      level: [],
      phone: '',
      avatar: avatarImg,
      withdrawCommission: '0',
      activeCommission: '0',
      totalCommission: '0',
      withdrawCount: '0',
      commissionCount: '0',
      subordinateCount: '0',
      isTrader: false
    };
  },
  components: {
    Cell,
    CellGroup,
    Icon,
    NavBar,
    TopNav,
    Popup,
    Button
  },
  methods: {
    showQR () {
      let pathname = process.env.NODE_ENV === 'development' ? '' : '/mobile';
      location.href = pathname + `/share.html?invite_code=${this.inviteCode}`;
    },
    imgClick () {
      this.$go({
        name: 'MemberInfo'
      });
    },
    back () {
      this.$back();
    },
    loadData () {
      this.$showSpin();
      getHome().then(result => {
        if (result.success) {
          let data = result.data;
          this.withdrawCommission = data.withdrawCommission;
          this.activeCommission = data.activeCommission;
          this.totalCommission = data.totalCommission;
          this.withdrawCount = data.withdrawCount;
          this.commissionCount = data.commissionCount;
          this.subordinateCount = data.subordinateCount;
        //   this.level = data.level;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      });
      getProfile().then(result => {
        if (result.success) {
          let data = result.data;
          this.avatar = data.avatar;
          this.level = data.level;
          this.username = data.nickname;
          this.phone = data.mobile.replace(/(\d{3})(\d{5})(\d{3})/, '$1***$3');
          this.isTrader = data.isTrader;
          this.inviteCode = data.inviteCode;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    },
    handleUpgrade () {
    //   this.$go({name: 'MemberPurchase'});
    }
  },
  mounted () {
    this.loadData();
  }
};
</script>
<style lang="less">
.dchome{
    .mr25{
        .van-icon{
            margin-right: 0.25rem;
        }
    }
}
</style>

<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.dchome{
    .van-nav-bar .van-icon {
        margin-right: 0.1rem;
    }
    .van-hairline--bottom::after {
            border-bottom: none;
            border-width: 0;
        }
    .avatar{
        display: flex;
        color:#fff;
        height: 2.0rem;
        background-color: @primaryColor;
        p {
            // margin-top: 0.4rem;
        }
        .border{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          margin: 0.1rem 0.2rem 0 0.25rem;
          background-color: @primaryColor;
          box-shadow: 0 0 0.1rem rgb(109, 97, 97);
          img {
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 50%;
          }
        }

       p:nth-of-type(1) {
            font-size:0.28rem;
            line-height: 0.4rem;
            // height: 0.4rem;
            // span {
            //     display: inline-block;
            //     // width: 0.9rem;
            //     border-radius: 0.1rem;
            //     text-align: center;
            //     -webkit-text-size-adjust:none;
            //     font-size: 0.2rem;
            //     background: rgba(0,0,0,.5);
            //     margin-right: 0.25rem;
            //     padding:0 0.1rem;
            // }
        }
        .level {
                span {
                display: inline-block;
                // width: 0.9rem;
                border-radius: 0.2rem;
                text-align: center;
                -webkit-text-size-adjust:none;
                font-size: 0.28rem;
                background: #E7A352;
                margin-right: 0.25rem;
                padding:0 0.2rem;
            }
            .upgrade{
                font-size: 0.24rem;
                background: rgba(0,0,0,0.5);
            }

            // margin-top:-0.1rem;
            font-size: 0.28rem;
        }
    }

    .van-cell__right-icon:nth-child(1){
        position: absolute;
        right: .62rem;
        font-size: .44rem;
        line-height: .44rem;
    }
    .arrow{
        position: absolute;
        right:0.3rem;
        transform: translateY(-25%);
    }
    .van-icon-dollar, .van-icon-jinbimore {
        color: @primaryColor;
        font-size: 0.7rem;
        line-height:1.2rem;
    }
    .money-item {
        display: flex;
        height: 0.8rem;
        overflow: hidden;
        justify-content: left;
        align-items:center;
        p {
            // margin-top: -0rem;
            margin-left: 0.1rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            span {
                color: @primaryColor;
            }
        }
    }
    .right-btn {
        border-radius: 0.5rem;
        // border:none;
        background-color: @primaryColor;
        color: #fff;
        font-size: 0.28rem;
        line-height: 0.55rem;
        height: 0.55rem;
        // margin-top: 0.15rem;
        margin:auto 0;
    }
    .quick-entry {
        display: flex;
        flex-wrap:wrap;
        li {
            width: 50%;
            display: flex;
            p {
                margin: 0;
                font-size: 0.28rem;
                line-height: 0.4rem;
                span {
                    color: #999;
                }
            }
            .van-icon {
                width: 0.67rem;
                height: 0.75rem;
                font-size: 0.67rem;
            }
            .van-icon-appjinbi,  .van-icon-dollar2 {
                color: #ECB849;
            }
            .van-icon-zhifubao, .van-icon-renshu {
                color: #496FEC;
            }
            &:nth-child(1), &:nth-child(2){
                margin-bottom: 0.4rem;
            }
        }
    }
    .mt20{
        .van-cell-group{
            .van-cell {
                align-items: center;
                height:1rem;
            }
        }
    }
}
</style>
