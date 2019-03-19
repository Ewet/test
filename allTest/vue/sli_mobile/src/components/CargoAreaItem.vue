<template>
<!-- 我要理货|我要补货 -->
    <div class="item-box">
      <div class="item-box-top">
        <slot name="position"></slot>
        <slot name="operation"></slot>
      </div>
      <div class="item-box-bottom">
        <div class="item-box-img">
          <img :src="url" alt="">
        </div>
        <div class="item-box-main">
          <div class="item-box-main-top">
            <p class="item-box-main-title">{{name}}</p>
            <div class="item-box-main-price" v-show="price">￥{{price}}</div>
          </div>
          <div class="item-box-main-bottom">
            <ul class="item-box-main-data">
              <li>当前：{{current}}</li>
              <li>可放：{{canPut}} </li>
              <li>云端：{{cloud}} </li>
            </ul>
            <p class="item-box-main-state">{{state}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { NavBar, Checkbox } from 'vant';
export default {
  name: 'Item',
  props: {
    name: {
      type: [String],
      default: ''
    },
    url: {
      type: [String],
      default: ''
    },
    price: {
      type: [Number],
      default: null
    },
    cloud: {// 云端
      type: [Number],
      default: null
    },
    canPut: {// 可放
      type: [Number],
      default: null
    },
    current: {// 当前
      type: [Number],
      default: null
    },
    state: {
      type: [String],
      default: ''
    }
  },
  data () {
    return {

    };
  },
  mounted () {
  },
  methods: {
  },
  components: {
    NavBar,
    Checkbox
  }
};
</script>

<style lang="less" >
.item-box{
  padding:0 0.3rem 0.2rem 0.3rem;
  margin-top: 0.2rem;
  background:#fff;
  .van-checkbox__icon .van-icon{
    width: 15px;
    height: 15px;
    margin-top: 4px;
    font-size: 10px;
  }
  .van-checkbox__label{
    line-height: 0.46rem !important;
  }
  .van-checkbox__icon, .van-checkbox__label{
    line-height: 15px;
    font-size: 0.2rem;
    color: #7C7B7B;
  }
  .item-box-top{
    display: flex;
    height: 0.6rem;
    font-size: 0.24rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    h3{
      margin: 0;
      font-size: 0.2rem;
      font-weight: 400;
      color: #7C7B7B;
    }
    p{
      margin: 0;
      display: flex;
      align-items: center;
    }
  }
  .item-box-bottom{
    display: flex;
    justify-content: flex-start;
    padding-top: 0.2rem;
    .item-box-img{
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.2rem;
      background: #eee;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .item-box-main{
      width: 5.5rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .item-box-main-top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 0.28rem;
        .item-box-main-title{
          width: 60%;
          text-align:left;
          margin: 0;
          word-break:break-all;
        }
        .item-box-main-price{
          width: 35%;
          text-align: right;
          color: #616161;
          word-wrap:break-word;
        }
      }
      .item-box-main-bottom{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .item-box-main-data{
          width: 70%;
          display: flex;
          justify-content: space-between;
          li{
            font-size: 0.24rem;
            color: #808080;
            width: 33.333%;
            text-align: left;
          }
        }
        .item-box-main-state{
          width: 30%;
          margin: 0;
          font-size: 0.3rem;
          color: #A669C2;
          text-align: right;
          margin-top: -4px;
        }
        .item-box-main-number{
          width: 50%;
          margin: 2px 0 0 0;
          color: #3F3F3F;
          font-size: 0.24rem;
        }

      }
    }

  }
}
</style>
