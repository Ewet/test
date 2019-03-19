<!-- 已丢弃 -->
<template>
  <div class="coupon">
    <nav-bar
    title="优惠券领取中心"
    />
  <tabs v-model="active" >
    <tab :key="index" v-for="(item, index) in catetorys" :title="item.name">
      <div class="discount">
        <div class="discount-detail">
          <div class="text1">
            无金额门槛<br/>
            <span class="dzq">打折券</span><br/>
            仅限三乡店使用
          </div>
          <div class="text2">
            <span>8.5</span>
            <span class="zhe">折</span>
          </div>
          <div class="text3">消费任意金额打8.5折</div>
        </div>
        <div class="discount-message pl">
          <div >有效期：永久有效</div>
          <button class="discount-btn">立即领取</button>
        </div>
      </div>
      <!-- <div class="manjian"> -->
      <!-- 满减 -->
      <div class="manjian">
        <div class="discount-detail">
          <div class="text1">
            满100元可用<br/>
            <span class="dzq">满减券</span><br/>
            仅限三乡店使用
          </div>
          <div class="text2">
            <span class="rmb">￥</span>
            <span >10</span>
          </div>
          <div class="text3">消费满100立减10元</div>
        </div>
        <div class="discount-message pl">
          <div >有效期：2018.6.1-2018.6.30</div>
          <button class="discount-btn">立即领取</button>
        </div>
      </div>
    </tab>
  </tabs>
    <popup class="popup" v-model="show" :overlay="true">
            <div class="description">
                <img class="yjjx" src="./images/yjjx@2x.png" alt="">
                <img class="yj" src="./images/yj@2x.png" alt="">
                <img class="jx" src="./images/jx@2x.png" alt="">
            </div>
    </popup>
</div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs } from 'vant';
export default {
  data () {
    return {
      active: 0,
      show: true,
      catetorys: [
        {
          name: '全部优惠券',
          value: '',
          list: [
          ]
        },
        {
          name: '满减券',
          value: 11,
          list: [
          ]
        },
        {
          name: '打折券',
          value: 11,
          list: [
          ]
        }
      ]
    };
  },
  mounted () {},
  methods: {
  },
  components: { NavBar, Button, Popup, Tab, Tabs }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.coupon {
  .pl{
    padding:0 0.3rem;
  }
    .discount{
      // position: relative;
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
        background-image: url("./images/discount@2x.png");
        font-size: 0.24rem;
        color: #ffffff;
        .text1{
          position: absolute;
          // margin: 0.5rem 1.26rem 0.7rem 0.6rem;
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
          font-size: 0.8rem;
          line-height: 1;
          .zhe{
            font-size: 0.48rem;
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
    .manjian{
      margin:0.31rem auto;
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
        background-image: url("./images/manjian@2x.png");
        font-size: 0.24rem;
        color: #ffffff;
        .text1{
          position: absolute;
          // margin: 0.5rem 1.26rem 0.7rem 0.6rem;
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
          font-size: 0.8rem;
          line-height: 1;
          .rmb{
            font-size: 0.6rem;
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
          color:#A669C2;
          background: #ffffff;
          border:0.01rem solid #A669C2;

        }
      }
    }
    .popup{
          background: transparent;
        border-radius:.1rem;
        .description{
          position: relative;
            height:4.62rem;
            width:6.5rem;
            overflow: hidden;
            // font-size: 0.28rem;
            // background:transparent;
            // background-color: rgba(0,0,0,.7);
            .yjjx{
                position: absolute;
                top:0;
                // height: 0.73rem;
                width: 6.5rem;
                z-index: 1;
            }
            .yj{
                position: absolute;
                top:0;
                // height: 0.73rem;
                width: 6.5rem;
                z-index: 2;
            }
            .jx{
                position: absolute;
                // position: relative;
                height: 4.39rem;
                width: 5.79rem;
                left:0.36rem;
                top:0.23rem;
                z-index: 1;
                animation:myfirst 2s;
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
