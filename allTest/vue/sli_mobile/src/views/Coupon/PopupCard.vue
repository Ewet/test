<template>
     <popup class="popup" v-model="showModal" :overlay="true" >
            <div class="description" :class="[activeClass]">
                <div class="yjjx"></div>
                <div class="yj"></div>
                <div class="jx">
                    <span class="red">恭喜获得</span><br/>
                    <span class="money" v-if="formData.cardType===1">￥<span class="jine">{{formData.discount}}</span></span>
                    <span class="money" v-if="formData.cardType===2"><span class="jine">{{formData.discount}}</span>折</span>
                    <span class="yhq">{{formData.couponType}}券</span>
                </div>
            </div>
    </popup>
</template>
<script>
import { Popup } from 'vant';
export default {

  props: {
    value: false,
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showModal: false
    };
  },
  components: {
    Popup
  },
  computed: {
    activeClass () {
      if (this.formData.cardType === 2) {
        return 'blue';
      } else if (this.formData.cardType === 1) {
        return 'purple';
      }
    }
  },
  watch: {
    showModal (val) {
      this.$emit('input', val);
    },
    value (val) {
      this.showModal = val;
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';
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
            animation:myfirst 2s;//弹出动画
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
    .blue {
        .money {
            color:#6E95D0!important;
        }
        .yjjx,.yj{
            background-image: url("./images/yjjxblue@2x.png");
        }
        .yj{
            background-image: url("./images/yjblue@2x.png");
        }
    }
    .purple {
        .money {
            color:#A569C1!important;
        }
    }
}
</style>
