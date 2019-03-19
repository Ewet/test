<template>
  <div class="coupondetail">
    <TopNav
    title="详情"
    />
    <div class="cdetail" :class="{'manjianzi': formData.cardType === 1, 'discountblue': formData.cardType === 2}">
        <div class="cmessage">
          <div class="coutext">
            <span class="ttext"><span class="t">{{formData.couponName}}</span></span>
            <!-- <span class="ctext">￥10</span> -->
            <div class="ctext" v-if="formData.cardType===2">
            <span>{{formData.discount}}</span>
            <span class="zhe">折</span>
          </div>
          <div class="ctext" v-if="formData.cardType===1">
            <span class="rmb">￥</span>
            <span>{{formData.discount}}</span>
          </div>
            <span class="btext">{{formData.threshold}}<br/><span class="t">有效期：{{formData.validityPeriod}}</span></span>

          </div>
        </div>
        <div class="pl30">
          <div class="useinfo">
            <div class="usetitle">使用说明：</div>
            <div class="van-hairline--top">领取限制<br/><span class="dian">每人限领{{formData.maxCount}}张</span></div>
            <div class="van-hairline--top">有效期限<br/><span class="dian">{{formData.validityPeriod}}</span></div>
            <div class="van-hairline--top">使用限制<br/>
              <span class="dian">限定盒子：{{formData.rangebox}}</span><br/>
              <span class="dian">限定商品：{{formData.rangegoods}}</span>
            </div>
            <div class="instructions" v-html="formData.instructions"></div>
          </div>
        </div>
    </div>
    <div class="bbtn" v-show="!couponSn"><Btn size="large" @increment="receiveCoupon">立即领取</Btn></div>
    <PopupCard v-model="showCard" :formData="formData"/>
</div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs, Toast } from 'vant';
import { getPersonItem, getItemCommon, receiveItem } from '@/model/coupon';
import CouponCard from 'views/Coupon/CouponCard';
import PopupCard from 'views/Coupon/PopupCard';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
export default {
  data () {
    return {
      showCard: false,
      couponSn: this.$route.query.coupon_sn,
      couponId: this.$route.query.coupon_id,
      formData: {
        threshold: '',
        couponType: '',
        // range: '仅限三乡店',
        rangebox: '',
        rangegoods: '',
        discount: 0,
        descriptions: '',
        validityPeriod: '',
        cardType: 1,
        maxCount: 0,
        instructions: ''
      }
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    receiveCoupon () {
      receiveItem(this.couponId).then(({success, msg}) => {
        if (success) {
          this.$emit('receiveCoupon', this.formData);
          this.showCard = true;
        } else {
          Toast(msg);
        }
      }).catch(() => {
        // on cancel
      });
    },
    loadData () {
      if (this.couponSn) {
        this.$showSpin();
        getPersonItem(this.couponSn).then(result => {
          // console.log(result.data);
          if (result.success) {
            let data = result.data;
            this.formData.rangebox = data.rangebox;
            this.formData.rangegoods = data.rangegoods;
            this.formData.threshold = data.threshold; // 使用门槛
            this.formData.couponType = data.couponType; // 券类型
            this.formData.cardType = data.cardType;
            this.formData.discount = data.discount; // 劵面价值0
            this.formData.descriptions = data.descriptions; // 使用说明
            this.formData.validityPeriod = data.validityPeriod; // 0
            this.formData.couponId = data.couponId;
            this.formData.maxCount = data.maxCount;
            this.formData.instructions = data.instructions;
            this.formData.couponName = data.couponName.substring(0, 10);
          // disable= true
          } else if (result.code !== 401) {
            Toast(result.msg);
          }
          this.$hideSpin();
        });
      } else {
        this.$showSpin();
        getItemCommon(this.couponId).then(result => {
          // console.log(result.data);
          if (result.success) {
            let data = result.data;
            this.formData.rangebox = data.rangebox;
            this.formData.rangegoods = data.rangegoods;
            this.formData.threshold = data.threshold; // 使用门槛
            this.formData.couponType = data.couponType; // 券类型
            this.formData.cardType = data.cardType;
            this.formData.discount = data.discount; // 劵面价值0
            this.formData.descriptions = data.descriptions; // 使用说明
            this.formData.validityPeriod = data.validityPeriod; // 0
            this.formData.couponId = data.couponId;
            this.formData.maxCount = data.maxCount;
            this.formData.instructions = data.instructions;
            this.formData.couponName = data.couponName.substring(0, 10);
          // disable= true
          } else if (result.code !== 401) {
            Toast(result.msg);
          }
          this.$hideSpin();
        });
      }
    }
  },
  components: { NavBar, Button, Popup, Tab, Tabs, CouponCard, TopNav, PopupCard, Btn }
};
</script>
<style  lang="less" >
.coupondetail {
  .pl30{
      .useinfo{
          .instructions{
            word-break:break-all;//超过换行，仅对英文有效
            // width:100%;
              p img{
                  width: 100%;
              }
          }
      }
  }
  }
</style>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.coupondetail {
    padding: 0.3rem;
    .cdetail{
        // margin:0.3rem auto;
        background: #ffffff;
        // background:red;
        border-radius:0.2rem;
        margin-bottom:1.1rem;
        .cmessage{
            // width:6.9rem;
            height:2.69rem;
            background:url("./images/detailbg@2x.png");
            background-size: 100%;
            background-repeat: no-repeat;
            // background-color:red;
            color: #ffffff;
            padding:0.5rem 0.5rem 0 0.5rem;
            // display: flex;

            .coutext{
              position: relative;
              // width: 5.9rem;
              height: 2rem;
              border:0.02rem solid #ffffff;
              text-align: center;
              // display: flex;
              // justify-content: center;
              // align-items:center;
              .ttext{
                position: absolute;
                font-size: 0.28rem;
                top:-0.2rem;
                // transform: translateY(-50%);
                // background:@primaryColor;
                // top:-0.15rem;
                left:0;
                right:0;
                .t{
                  padding:0 0.1rem;
                  background:@primaryColor;
                }
              }
              .ctext{
                // position: absolute;
                // font-size: 0.8rem;
                // top:0.44rem;
                // left:0;
                // right:0;
                position: absolute;
                // right:1.4rem;
                left:0;
                right:0;
                top:0.44rem;
                font-size: 0.8rem;
                line-height: 1;
                span{
                    font-size: 0.8rem;
                }
                .zhe{
                    font-size: 0.48rem;
                }
                .rmb{
                font-size: 0.6rem;
                }

              }
              .btext{
                text-align: center;
                position: absolute;
                left:0;
                right:0;
                font-size: 0.24rem;
                bottom:-0.15rem;
                // background:@primaryColor;
                // padding:0 0.1rem;
                .t{
                  padding:0 0.1rem;
                  background:@primaryColor;
                }
              }

            }
        }
      .pl30{
        padding: 0 0.3rem;
        background: #ffffff;
        border-radius:0 0 0.2rem 0.2rem;
        .useinfo{

          font-size: 0.24rem;
          color:#999999;
          .usetitle{
            font-size: 0.28rem;
          }
          div{
            padding:0.3rem 0;
          }
          div:nth-child(1){
            padding-top: 0.2rem;
          }
          // div+div{
          //   border-top:0.01rem dashed #cccccc;
          // }
          .van-hairline--top:after{
            border-style: dashed;
            border-color: #cccccc;
          }
          .dian{
            position: relative;
            color:#000000;
          }
          .dian:before{
            position: absolute;
            left:-0.2rem;
            top:50%;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            margin-top:-2.5px;
            // background-color: @primaryColor;
            content:"";
          }
        }
      }

    }
    .manjianzi{
      .cmessage{
        background-image:url("./images/detailbg@2x.png");
        // background-size: 6.9rem 3.19rem;
        // background-repeat: no-repeat;
      }
      .useinfo{
        .dian:before{
            background-color: @primaryColor;

        }
      }
    }
    .discountblue{

      .cmessage{
        background-image:url("./images/discountblue@2x.png");
        .coutext{
              .ttext{
                .t{
                  background:#6E94D0;
                }

              }
              .btext{
                .t{
                  background:#6E94D0;
                }

              }

          }
        }
        .useinfo{
          .dian:before{
            background-color: #6E94D0;

          }
        }
    }
    .bbtn{
      position: fixed;
      bottom: 0rem;
      left: 0;
      height:1.3rem;
      width: 100%;
      text-align:center;
      background:#F1F1F1;
      display: flex;
      align-items:center;
      justify-content: center;
      .cdbtn{
        // width: 4.8rem;
        padding: 0 1.84rem;
        font-size: 0.28rem;
        background: @primaryColor;
        color: #ffffff;
        // position: absolute;
        line-height: 0.7rem;
        height: 0.7rem;
        // left: 0;
        // right: 0;
        // margin-top: 0.2rem;

      }
    }

}

</style>
