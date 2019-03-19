<template>
  <div class="coupon-card"
  :class="[activeClass]">
    <div class="discount-detail" @click="godetail">
      <slot></slot>
      <div class="detail-left" @click.stop="$emit('selectClick')">
        <!-- 显示多少折 -->
        <div class="discount-text" v-if="formData.cardType===2">
          <span class="big">{{formData.discount}}</span>
          <span class="small">折</span>
        </div>
        <!-- 显示满减多少 -->
        <div class="reduce-text" v-if="formData.cardType===1">
          <span class="small">￥</span>
          <span class="big">{{formData.discount}}</span>
        </div>
        <div class="limit-text">{{formData.range}}</div>
        <slot name="btn-use"></slot>
        <!-- <Button
          class="selectItem"
          :class="[formData.cardType === 1 ? 'purplecolor' : 'bluecolor']"
          >确认使用</Button> -->
      </div>
      <div class="detail-right">
        <div class="btn-wrap"><button class="discount-btn" @click.stop="receiveCoupon" v-if="opertionType === 1">立即领取</button></div>
        <!-- <button class="discount-btn" @click.stop="useCoupon"  v-if="opertionType === 2">立即使用</button> -->
        <span class="card-type">{{formData.couponType}}券<span v-if="formData.superposable==='1'" class="isshow">(可叠加)</span></span>
        <div class="desc">{{formData.descriptions}}</div>
        <div class="time">{{formData.validityPeriod}}</div>
        <div class="showdetail" @click.stop="showDetail=!showDetail">详细信息
          <icon name="arrow" :class="{rotate:showDetail}"/>
          <!-- <icon class="rotate" name="arrow" v-show="showDetail"/> -->
        </div>
      </div>
    </div>
    <div class="limitbox" v-show="showDetail">
      <div class="limit-content" >
        <p>限定盒子：{{formData.rangebox}}</p>
        <p>限定商品：{{formData.rangegoods}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs, Icon, Toast, Dialog } from 'vant';
import { receiveItem } from '@/model/coupon';
import { getWrapperClass } from './utils';
export default {
  name: 'CardItem',
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    opertionType: 0,
    cardStatus: 0
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
      },
      activeClass: '',
      showDetail: false
    };
  },
  mounted () {
    if (this.formData && Object.keys(this.formData).length) {
      // console.log(this.formData.couponId);
      this.activeClass = getWrapperClass({...this.formData, cardStatus: this.cardStatus});
    }
  },
  methods: {
    hide () {
      this.iconshow = false;
      this.show = false;
    },
    // 详情
    godetail () {
      this.$go({ path: '/coupon-detail',
        query: {
          coupon_sn: this.formData.couponSn,
          coupon_id: this.formData.couponId
        }
      });
    },
    receiveCoupon () {
      receiveItem(this.formData.couponId).then(({success, msg}) => {
        if (success) {
          this.$emit('receiveCoupon', this.formData);
        } else {
          Toast(msg);
        }
      }).catch(() => {
        // on cancel
      });
    },
    useCoupon () {
      // this.$emit('useCoupon', this.formData);

      Toast({
        message: '功能暂未开放',
        duration: 1000
      });
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
  },
  computed: {
    notUse () {
      return this.formData.ismine === true && this.formData.used === false && this.formData.expired === false;
    }
  },
  components: { NavBar, Button, Popup, Tab, Tabs, Icon, Dialog }
};

</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
  .pl{
    padding:0 0.3rem;
  }
  .purplecolor{
    color: @primaryColor;
  }
  .bluecolor{
    color: #6E94D0;
  }
  .coupon-card {
    // width:6.7rem;
    margin-top:0.2rem;
    margin-bottom:0.2rem;
    .discount-detail{
        height: 2.5rem;
        display: flex;
        position: relative;
        background-size: 100% 100%;
        // background-position: center;
        // margin-bottom: 0.1rem;
        .detail-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color:#fff;
          width: 36%;
          font-size: 0;
          .limit-text {
            font-size: 0.2rem;
            // padding-left: 0.15rem;
          }
          .van-button--normal{
            padding: 0 0.18rem;
          }
          .selectItem{
            // width: 1.45rem;
            height: 0.46rem;
            line-height: 0.46rem;
            font-size: 0.26rem;
            // border: 1px solid #6E94D0;
            margin: 0.1rem 0;
          }
          .small {
            font-size: 0.38rem;
          }
          .big {
            font-size: 0.7rem;
          }
        }
        .detail-right{
          flex: 1;
          padding:0.25rem 0.4rem 0;
          color: #aaa;
          font-size: 0.2rem;
          .card-type {
            font-size: 0.4rem;
            color: @primaryColor;
          }
          .isshow{
            // display:none;
            font-size: 0.28rem;
            color:#999999;
          }
          .desc {
            font-size: 0.28rem;
            color: #000;
            margin-top: 0.15rem;

          }
          .time {
            font-size:0.2rem;
            border-bottom: 1px dashed;
            line-height: 1;
            padding:0.13rem 0;
          }
          .btn-wrap {
            position: absolute;
            right: 0;
            top:-0.1rem;
            padding:0.3rem;
            .discount-btn {
              border-radius: 0.08rem;
              background: #ffffff;
            }
          }
          .showdetail{
            padding-top: 0.1rem;
            .van-icon{
              position: absolute;
              right:0.5rem;
              transform:rotate(90deg);
              transition:transform 500ms;
            }
            .rotate{
              transform:rotate(270deg);
            }
          }

        }
    }
    .limitbox{
      margin: 0;
      .limit-content{
        color: #999;
        font-size: 0.24rem;
        background: #fff;
        padding: 0.2rem;
        margin-top: 0.1rem;
        p {
         margin: 0;
        }
        p+p {
          margin-top: 0.2rem;
        }
      }
    }

  }
    // 蓝色
    .blue{
        .discount-detail{
            background-image: url("./images/card-bg-blue@2x.png");
            background-repeat: no-repeat;
            .text2{
                .zhe{
                    font-size: 0.48rem;
                }
            }
            .detail-right{
              .card-type {

                color: #6E94D0;
              }
              .discount-btn{
                color:#6E94D0;
                border:0.01rem solid #6E94D0;

              }
            }
        }
    }
    //紫色
    .purple{
      .discount-detail{
        background-image: url("./images/card-bg-purple@2x.png");
        background-repeat: no-repeat;
        .text2{
            .rmb{
                font-size: 0.6rem;
            }
        }

        .detail-right{
            .discount-btn{
                color:@primaryColor;
                border:0.01rem solid @primaryColor;
            }
        }
      }
    }
    //灰色
    .gray{
      .discount-detail{
        background-image: url("./images/card-bg-gray@2x.png");
        background-repeat: no-repeat;
        .detail-right{
              .card-type {

                color: #999999;
              }
        }
      }
    }

    //已使用印章
    .used-seal {
        .discount-detail{
        background-image: url("./images/card-bg-used@2x.png");
        background-repeat: no-repeat;
        .detail-right{
              .card-type {

                color: #999999;
              }
        }
      }
    }

</style>
