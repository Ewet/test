<template>
 <div class='winningResult'>
    <div class='cancelIcon' @click="handleClose">
      <img src="./images/cancel-icon.png" />
    </div>
    <div class='noAward' v-show="isNoAward">
      <div class='pigPic'>
        <img src="./images/pig.png"/>
      </div>
      <p class='world'>抱歉啦！没有中奖哦！</p>
      <div class='noAwardBtn'>
        <p @click="handleLottery">继续抽奖</p>
      </div>
    </div>
    <div class='have-award' v-show='!isNoAward'>
      <div v-if='isCoupon === 1' class='red-pack'>
        <p>{{redPackMoney}}<span style="font-size:0.35rem">元</span></p>
      </div>
      <div v-else-if='isCoupon === 2' class='coupon'>
        <p v-if="couponType === 1">{{couponMoney}}元</p>
        <p v-else>{{couponMoney}}折</p>
        <p v-if="couponType === 1">满减券</p>
        <p v-else>折扣券</p>
      </div>
      <div v-else class='present'>
        <img :src="imageFileUrl"/>
      </div>
      <div class='festival-type'>
        <p>{{festival}}</p>
        <div v-if='isCoupon === 3' class='prizeName'>
          <p>请填写邮寄资料以便我们尽快将礼品寄出</p>
          <p @click="handleViewPrize">点击这里填写邮寄资料>>></p>
        </div>
        <p v-else>{{festivalDes}}</p>
      </div>
      <div class='have-award-btn'>
        <div class='award-btn' @click="handleLottery">
          <p>继续抽奖</p>
        </div>
        <div class='award-btn'>
          <p class='pink' @click="handleViewPrize">查看奖品</p>
        </div>
      </div>
    </div>
 </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  props: {
    prizeData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Toast
  },
  data () {
    return {
      isNoAward: false, // 是否中奖
      isCoupon: 1, // 1-奖金，2-优惠券，3-实物
      redPackMoney: '0',
      couponMoney: '0',
      prizeId: '',
      imageFileUrl: '',
      imageFileId: '',
      festival: '2018摩萄狂欢节',
      festivalDes: '给你发来一张现金券',
      winnerId: '',
      awardType: '', // 1-奖金，2-优惠券，3-实物
      couponType: '',
      couponSn: ''
    };
  },
  mounted () {
    this.setData(this.prizeData);
  },
  methods: {
    setData (data) {
      // 获取当前年份
      let thisYear = new Date().getFullYear();
      this.winnerId = data.winner_id;
      let isPrize = data.winner_id;
      if (isPrize === null) {
        this.isNoAward = true;
      } else {
        this.isNoAward = false;
        this.prizeId = data.prize_id;
        this.awardType = data.prize_type;
        let awardType = data.prize_type;
        if (awardType === 1) {
          this.isCoupon = 1;
          this.redPackMoney = data.prize_data.amount;
          this.festival = thisYear + '摩萄狂欢节';
          this.festivalDes = '给你发来一个奖励金红包';
        } else if (awardType === 2) {
          this.isCoupon = 2;
          this.couponSn = data.prize_data.coupon_sn;
          this.couponType = data.prize_data.coupon_type;
          if (this.couponType === 2) {
            this.couponMoney = data.prize_data.amount * 10;
          } else {
            this.couponMoney = data.prize_data.amount;
          }
          this.festival = thisYear + '摩萄狂欢节';
          this.festivalDes = '给你发来一张现金券';
        } else if (awardType === 3) {
          this.isCoupon = 3;
          this.imageFileUrl = data.image_file_url;
          this.imageFileId = data.image_file_id;
          this.festival = data.prize_data.prize_name;
        }
      }
    },
    // 继续抽奖
    handleLottery () {
      this.$Bus.$emit('closeWinningResult');
    },
    // 查看奖品 1 奖励金 2 现金券 3 实物
    handleViewPrize () {
      // awardType
      if (this.awardType === 1) {
        this.$go({name: 'RewardGoldPool'});
      } else if (this.awardType === 2) {
        // this.$go({name: 'MyCoupon'});
        if (this.couponSn) {
          this.$go({ name: 'CouponDetail',
            query: {
              coupon_sn: this.couponSn
            }
          });
        } else {
          Toast('优惠券发送失败，请联系客服。');
        }
      } else {
        this.$go(
          {
            name: 'PrizeDetail',
            query: {
              winner_id: this.winnerId
            }
          });
      }
    },
    // 关闭
    handleClose () {
      this.$Bus.$emit('closeWinningResult');
    }
  },
  watch: {
    prizeData (val, old) {
      this.setData(val);
    }
  }
};
</script>
<style lang='less'>
.winningResult{
  position: relative;
  .cancelIcon{
    width: .6rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .noAward{
    width: 6.5rem;
    padding-top: 1.6rem;
    .pigPic{
      width:4.25rem;
      margin-bottom: .23rem;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
    p.world{
      font-size: .32rem;
      color: #fff;
    }
    .noAwardBtn{
      width: 2.9rem;
      height: .8rem;
      margin: 1.1rem auto 0;
      background: url(./images/small-button.png) no-repeat;
      background-size: 100% 100%;
      p{
        line-height: 0.8rem;
        font-size:.38rem;
        color:#804500;
      }
    }
  }
  .have-award{
    width: 7rem;
    height: 6.6rem;
    background: url(./images/have-award.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 3.2rem;
    .coupon{
      width:4.5rem;
      height:2.2rem;
      margin: 0.1rem auto 0;
      background: url(./images/lottery-tag.png) no-repeat;
      background-size: 100% 100%;
      padding-top: .1rem;
      p{
        font-size:1.02rem;
        font-weight:400;
        color:#fff;
        line-height: 1rem
      }
      p:nth-of-type(2){
        font-size:.8rem;
      }
    }
    .red-pack{
      width:2.78rem;
      height:2.50rem;
      margin: 0.1rem auto 0;
      background: url(./images/red-pack.png) no-repeat;
      background-size: 100% 100%;
      padding-top: .1rem;
      p{
        font-size:.53rem;
        color:#ED5854;
        line-height: 1rem;
        padding-left: 0.12rem;
        padding-top: 0.2rem;
        font-weight:bold;
      }
    }
    .present{
      width:3.64rem;
      height:2.46rem;
      margin: 0.1rem auto 0;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .festival-type{
      p{
        font-size:.34rem;
        color:#fff;
        margin-top: 0.22rem;
      }
      p:nth-of-type(2){
        margin-top: 0.1rem;
        font-size:.24rem;
      }
      .prizeName {
        p{
          font-size:.24rem;
          color:#fff;
          }
        p:nth-of-type(2){
          color: #D44B86;
        }
      }
    }
    .have-award-btn{
      margin-top: 1rem;
      .award-btn{
        display: inline-block;
        width: 2.9rem;
        height: .8rem;
        background: url(./images/small-button.png) no-repeat;
        background-size: 100% 100%;
        p{
          line-height: 0.8rem;
          font-size:.38rem;
          color:#804500;
        }
        p.pink{
          background: url(./images/small-pink-button.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
