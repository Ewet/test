<template>
   <div class="bonus-cash">
        <TopNav
         title="奖励金提现"
        >
            <span slot="right" class="detail" @click="$go({name: 'RewardGoldDetail'})">
            <em>奖励明细</em></span>
        </TopNav>
    <div class="content">
            <icon  name="jinbimore"/>
            <p>我的奖励金</p>
            <p>￥ {{activeCommission}}</p>
    <!-- <Button @click="$go({name: 'RewardGoldOperation'})">提现</Button> -->
    <Btn size="small" @increment="$go({name: 'RewardGoldOperation'})">提现</Btn>
    </div>
    <a href="" class="question" @click.prevent="$go({name: 'Faq'})">常见问题</a>
</div>
</template>
<script>
import { Icon, NavBar, Toast, Button } from 'vant';
import { getHome } from '@/model/distributionCenterModel';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
export default {
  data () {
    return {
      activeCommission: ''
    };
  },
  components: {
    Icon,
    NavBar,
    TopNav,
    Button,
    Btn
  },
  methods: {
    imgClick () {
      this.$go({name: 'PersonalInfo'});
    },
    loadData () {
      this.$showSpin();
      getHome().then(result => {
        if (result.success) {
          let data = result.data;
          this.activeCommission = data.activeCommission;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
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
.bonus-cash {
    position: relative;
    height: 100%;
   .detail{
        padding: 0.02rem 0.1rem;
        position: relative;
        &::after {
          .setLine(#fff);
          border-radius: 0.1rem;
        }
        em {
            font-size: 0.24rem;
            // box-sizing: border-box;
            font-style: normal;
            // line-height: 0.4rem;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1.6rem;
        .van-icon-jinbimore {
            font-size: 1.78rem;
            color:@primaryColor;
        }
        p {
            font-size: 0.28rem;
            margin-top: 0.6rem;
            &:nth-last-of-type(1){
                font-size: 0.36rem;
                color: @primaryColor;
                margin-top: 0;
                font-weight:bold;
            }
        }
        // .van-button {
        //     width: 2.2rem;
        //     line-height: 0.7rem;
        //     height: 0.7rem;
        //     // height: auto;
        //     color: #fff;
        //     background-color: @primaryColor;
        // }
    }
    .question {
      position: absolute;
      color: @primaryColor;
      font-size: 0.22rem;
      bottom:0.6rem;
      left: 50%;
      transform: translateX(-50%);
    }
}
</style>
