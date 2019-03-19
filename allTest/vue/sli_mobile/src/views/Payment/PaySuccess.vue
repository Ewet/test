<template>
  <div class="paysuccess">
    <nav-bar
    title="支付结果"
    :back="back"
    />
    <div class="center-page"></div>
    <div class="lottery-modal" v-show="showLotteryBtn"  @click="showLotteryBtn=false">
      <a class="lottery-btn" @click.prevent.stop="goLottery" >前往抽奖</a>
    </div>
  </div>
</template>
<script>
import { NavBar, Button, Popup } from 'vant';
import { getCurrentActivity } from '@/model/lotteryActivity';

export default {
  data () {
    return {
      showLotteryBtn: false,
      activityId: ''
    };
  },
  mounted () {
    this.checkActivity();
  },
  methods: {
    back () {
      this.$replace({
        name: 'CheckoutCounter',
        query: {
          order_id: this.$route.query.order_id
        }
      });
    },
    checkActivity () {
      getCurrentActivity({
        order_id: this.$route.query.order_id
      }).then(({
        success, data
      }) => {
        console.log(success, data);
        if (success && data.opportunities) {
          this.showLotteryBtn = true;
          this.activityId = data.activityId;
        }
      });
    },
    goLottery () {
      this.$go({
        name: 'Lottery',
        query: {
          user_type: '1',
          activity_id: this.activityId
        }
      });
    }
  },
  components: { NavBar, Button, Popup }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.paysuccess {
  .center-page{
      width: 4.63rem;
      height:5.2rem;
      background-size:4.63rem 5.2rem;
      background-image: url("./images/success@2x.png");
      margin:1.17rem auto;
  }
  .van-button{
    width: 3.3rem;
    height: auto;
    line-height: 0.7rem;
    margin-top: 0.83rem;
    font-size: 0.28rem;
    background: @primaryColor;
    color: #ffffff;
    display: block;
    margin: 0 auto;

  }
  .lottery-btn {
    display: block;
    width: 5.46rem;
    height: 6.48rem;
    text-indent: -9999px;
    margin: 0 auto;
    background:transparent url('./images/lottery-btn-bg.png') 0 0/cover no-repeat;
    animation: fly 1.2s infinite;
    animation-timing-function: ease-in-out;
    transform: translate3d(0,0,0);
  }
  @keyframes fly {
    0% {
      background-image:url('./images/lottery-btn-bg.png');
      transform: translate3d(0,0,0);
    }
    50% {
     transform: translate3d(0,1rem,0);
     background-image:url('./images/lottery-btn-bg2.png');
    }
    100% {
     transform: translate3d(0,0,0);
     background-image:url('./images/lottery-btn-bg.png');
    }
  }
  .lottery-modal {
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
