<template>
 <Popup
    :close-on-click-overlay="false"
    :value="value"
    >
    <div class="lottery-rule">
    <icon name="iclose" @click="handleClose"/>
    <div class="rule">

      <span>抽奖规则</span>
      <div style="position:relative;">
      <div class="test" v-show="isShowTips">
        <!-- <span class="bot"></span> -->
        <span class="top"></span>
        滑动查看全部
      </div>
      <div class="rule-box" ref="rule" v-html="text.replace(/\n/g, '<br/>')">
      </div>
      </div>
      <button class="btn" @click="handleClose" ref="btn">关闭</button>
    </div>
  </div>
 </Popup>
</template>
<script>
import {Icon, Popup} from 'vant';
import { debounce } from 'lodash';
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: String
  },
  data () {
    return {
      isShowTips: false,
      hasBindEvent: false
    };
  },
  methods: {
    // 关闭
    handleClose () {
      this.$emit('input', false);
    },
    handleScroll () {
      // this.$nextTick(() => {
      //   // let scrollArea = this.$refs['rule'];// document.refgetElementById('rule');
      //   console.log(this.$refs);
      // });
      this.$nextTick(() => {
        let scrollArea = this.$refs.rule;
        var scrollHeight = scrollArea.scrollHeight;
        var clientHeight = scrollArea.clientHeight;
        if (scrollHeight > clientHeight) {
          this.isShowTips = true;
          let scrollFunc = () => {
            let scrollTop = scrollArea.scrollTop;
            this.isShowTips = (scrollTop <= 2);
          };
          scrollArea.addEventListener('scroll', debounce(scrollFunc, 300));
          this.hasBindEvent = true;
        }
        // let scrollFunc = () => {
        //   var scrollTop = scrollArea.scrollTop;
        //   // console.log(scrollTop);
        //   this.isShowTips = scrollTop <= 2;
        // };
        // scrollArea.addEventListener('scroll', debounce(scrollFunc, 500));
        // this.hasBindEvent = true;
      });
    }
  },
  mounted () {},
  components: {
    Icon,
    Popup
  },
  watch: {
    value (val, oldVal) {
      if (val && !oldVal && !this.hasBindEvent) {
        this.handleScroll();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';
.lottery-rule{
  // height: 5.82rem;
  height: 8rem;
  width: 5.82rem;
  position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    color: #fff;
    background: @primaryColor;
    border-radius: 0.2rem;
    .van-icon{
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      font-size: 0.59rem;
      opacity:0.43;
      color: #000;
    }

.rule{
  .test{
    width: 40%;
    padding: 0.05rem;
    background-color: rgba(0,0,0,.7);
    border-radius: 0.1rem;
    font-size: 0.26rem;
    border:0.01rem solid #beceeb;
    position:absolute;
    top:-0.5rem;
    left:0;
    right:0;
    margin:0 auto;
    // transform: translate(-50%, -50%, 0);
    // margin-bottom: 0.1rem;
    span{width:0; height:0; font-size:0; overflow:hidden; position:absolute;}
  }
// .bot{
//     border-width:0.1rem;
//     border-style:solid dashed dashed;
//     border-color:rgba(0,0,0,.7) transparent transparent;
//     // background-color: rgba(0,0,0,.7);
//     left:0.2rem;
//     bottom:-0.2rem;
// }
.top{
    border-width:0.13rem;
    border-style:solid dashed dashed;
    border-color:rgba(0,0,0,1) transparent transparent;
    // background-color: rgba(0,0,0,.7);
    left:0.17rem;
    bottom:-0.26rem;
}
  width: 100%;
  height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    span{
      font-size: 0.5rem;
    }
    .rule-box{
      margin:0;
      width: 4.8rem;
      // height: 1.6rem;
      // max-height: 2.5rem;
      max-height: 5rem;
      overflow: auto;
      font-size: 0.3rem;
      text-align: left;
      word-wrap: break-word;
      word-break: normal;
    }
    .btn{
        border: 0;
        width: 2.91rem;
        height: 0.8rem;

        background: url(./images/small-button.png);
        background-size: 100%;
        color: #804500;
        font-size: 0.38rem;
        font-weight:bold;
        // border: 0.02rem solid #4abe43;
        // border-radius: 50%;
    }
}
}
</style>
