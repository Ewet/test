<template>
  <div class="couponcard">
      <div class="coupon-card"
      :class="classObject">

        <div class="discount-detail">
          <icon name="used" v-show="formData.used===true&&formData.expired===false"/>
          <div class="text1">
            {{formData.threshold}}<br/>
            <span class="dzq">{{formData.couponType}}</span><br/>
            {{formData.range}}
          </div>
          <div class="text2" v-if="formData.cardType===1">
            <span>{{formData.discount}}</span>
            <span class="zhe">折</span>
          </div>
          <div class="text2" v-if="formData.cardType===2">
            <span class="rmb">￥</span>
            <span>{{formData.discount}}</span>
          </div>
          <div class="text3">{{formData.directions}}</div>
        </div>
        <div class="discount-message pl">
          <div >有效期：{{formData.validityPeriod}}</div>
          <button class="discount-btn" @click="show=true" v-if="formData.ismine===false">立即领取</button>
          <button class="discount-btn"  v-else-if="notUse">立即使用</button>
          <span v-else-if="formData.disable===false">非指定盒子</span>
          <span v-else>限定盒子使用</span>
        </div>
      </div>
      <popup class="popup" v-model="show" :overlay="true" >
            <div class="description">
                <div class="yjjx"></div>
                <div class="yj"></div>
                <div class="jx">
                    <span class="red">恭喜获得</span><br/>
                    <span class="money">￥<span class="jine">10</span></span>
                    <span class="yhq">优惠券</span>

                </div>
            </div>
            <!-- <div class="close">
                <icon name="iclose" v-show="iconshow" @click="hide()" />
            </div> -->

    </popup>
</div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs, Icon } from 'vant';
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      show: false,
      iconshow: false,
      classObject: {
        'manjian': false,
        'discount': false,
        'used': false,
        'expired': false
      }
    };
  },
  mounted () {
    if (this.formData && Object.keys(this.formData).length) {
      // console.log(this.formData);
      if (this.formData.cardType === 2) {
        this.classObject.manjian = true;
      }
      if (this.formData.cardType === 1) {
        this.classObject.discount = true;
      }
      if (this.formData.disable === false) {
        this.classObject.used = true;
      }
      if (this.formData.used === true) {
        this.classObject.used = true;
      }
      if (this.formData.expired === true) {
        this.classObject.used = true;
      }
    }
  },
  methods: {
    hide () {
      this.iconshow = false;
      this.show = false;
    }
  },
  watch: {
    show: function () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.iconshow = true;
        }, 2000);
      });
    }
    // formData (val) {
    //   if (val && Object.keys(val).length) {
    //     console.log(val);
    //     if (val.cardType === 2) {
    //       this.classObject.manjian = true;
    //     }
    //     if (val.cardType === 1) {
    //       this.classObject.discount = true;
    //     }
    //     if (val.used === 1) {
    //       this.classObject.used = true;
    //     }
    //     if (val.expired === 1) {
    //       this.classObject.used = true;
    //     }
    //   }
    // }
  },
  computed: {
    notUse () {
      return this.formData.ismine === true && this.formData.used === false && this.formData.expired === false;
    }
    // noDisable () {
    //   return this.formData.ismine === true && this.formData.disable === false;
    // }
  },
  components: { NavBar, Button, Popup, Tab, Tabs, Icon }
};

</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.couponcard {
  .pl{
    padding:0 0.3rem;
  }
  .coupon-card {
      width:6.5rem;
      height:3rem;
      margin:0.31rem auto;
      background:#ffffff;
      border-radius: 0.2rem;
      .discount-detail{
        position: relative;
        height:2.24rem;
        width:6.5rem;
        background-size: 6.5rem 2.24rem;
        // background-image: url("./images/used@2x.png");
        background-repeat: no-repeat;
        font-size: 0.24rem;
        color: #ffffff;
    //已使用
        .van-icon{
          position: absolute;
          left: 1.7rem;
          top:-0.4rem;
          // line-height:2.24rem;
          font-size:2.4rem;
          color:#818181;
          z-index: 1;
        }
        .text1{
          position: absolute;
          top:0.5rem;
          left:0.6rem;
          .dzq{
            font-size: 0.4rem;
          }
        }
        .text2{
          position: absolute;
          right:1.4rem;
          top:0.53rem;
        //   font-size: 0.8rem;
          line-height: 1;
          span{
              font-size: 0.8rem;
          }
        }
        .text3{
          position: absolute;
          right:0.3rem;
          bottom:0.4rem;
        }
      }
      .discount-message{
        height:0.76rem;
        // width: 6.5rem;
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .discount-btn{
          border-radius: 1.7rem;
          color:#6E94D0;
          background: #ffffff;
          border:0.01rem solid #6E94D0;

        }
      }
    }
    .discount{
        .discount-detail{
            background-image: url("./images/discount@2x.png");
            background-repeat: no-repeat;
            .text2{
                .zhe{
                    font-size: 0.48rem;
                }
            }
        }
    }
    .manjian{
      .discount-detail{
        background-image: url("./images/manjian@2x.png");
        background-repeat: no-repeat;
        .text2{
            .rmb{
                font-size: 0.6rem;
            }
        }
      }
      .discount-message{
            .discount-btn{
                border-radius: 1.7rem;
                color:@primaryColor;
                background: #ffffff;
                border:0.01rem solid @primaryColor;
            }
        }
    }
    .used{
      .discount-detail{
        background-image: url("./images/used@2x.png");
        background-repeat: no-repeat;
      }
    }
  .van-popup{
          background: transparent;
          border-radius:.1rem;
        .close{
            position: absolute;
            text-align: center;
            left: 0;
            right: 0;
            // z-index: 1;
            .van-icon{
                font-size: 0.5rem;
                color:#ffffff;

            }
        }

        .description{
          position: relative;
            height:4.62rem;
            width:6.5rem;
            overflow: hidden;
            .yjjx,.yj{
                position: absolute;
                top:0;
                height: 0.73rem;
                background-image: url("./images/yjjx@2x.png");
                background-size: 6.5rem .73rem;
                background-repeat: no-repeat;
                width: 6.5rem;
                z-index: 1;
            }
            .yj{
                background-image: url("./images/yj@2x.png");
                z-index: 2;
            }
            .jx{
                position: absolute;
                // position: relative;
                background-image: url("./images/jx@2x.png");
                background-size: 5.79rem 4.39rem;
                background-repeat: no-repeat;
                // height: 4.39rem;
                right: 0.36rem;
                left:0.36rem;
                top:0.23rem;
                z-index: 1;
                animation:myfirst 2s;
                line-height: 1;
                text-align: center;
                padding-top: 0.65rem;
                padding-bottom: 1.2rem;
                .red{
                    color:#D90000;
                    font-size: 0.36rem;
                    line-height: 1rem;
                }
                .money{
                    color: @primaryColor;
                    font-size: 0.52rem;
                    font-weight: bold;
                    letter-spacing: -0.2rem;
                    .jine{
                        font-size: 1.5rem;
                    }
                }
                .yhq{
                    font-size: 0.36rem;
                }

            }

          }
          @keyframes myfirst
          {
            0% {top:-4.16rem;}
            100% {top:0.23rem;}
          }
    }
}
</style>
