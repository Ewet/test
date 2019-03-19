<template>
<div class="steps">
  <!-- <div class="line"></div> -->
  <template v-for="(item, index) in data" >
  <div class="firstStep" :key="index">
    <div class="text">
      <icon class="purple" name="checked" v-if="index === curIndex"/>
      <i class="circle" v-if="index > curIndex"></i>
      <i class="circle zi" v-if="index < curIndex"></i>

      <span>{{item.statusName}}</span>
    </div>
      <div class="data">{{item.statusTime}}</div>
  </div>
  <div class="line" :key="index+data.length" v-if="index!==data.length-1"></div>
  </template>

</div>
</template>

<script>
import { Icon } from 'vant';
export default {
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      // value: 2
    };
  },
  computed: {
    curIndex () {
      let index = 0;
      this.data.forEach((x, i) => {
        if (x.isTrue) {
          index = i;
        }
      });
      return index;
    }
  },
  components: {
    Icon
  }
};
</script>
<style lang="less">
@import "~@/assets/color.less";
.steps{
  .purple{
    color: @primaryColor;
  }
  height: 1.2rem;
  font-size: 0.24rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.3rem;
  .line{
    margin-top: -0.55rem;
    flex:1;
    height: 1px;
    background-color: #BFBFBF;
  }
  .firstStep{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  //   .line{
  //   // margin-top: -0.55rem;
  //   // flex:1;
  //   color: red;
  //   height: 1px;
  //   background-color: #BFBFBF;
  // }
    .text{
      padding: 0 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50%;
      .circle{
        display: block;
        width: 0.22rem;
        height: 0.22rem;
        background-color: #BFBFBF;
        border-radius: 50%;
        float: left;
        margin: 0.06rem 0.1rem 0 0;
      }
      .zi{
        background:@primaryColor;
      }
      .van-icon-checked{
        font-size: 0.42rem;
        margin-right: 0.1rem;
      }
    }

    .data{
      height: 50%;
      font-size: 0.18rem;
      color:#9D9D9D;
      line-height: 0.6rem;
    }
  }
}

</style>
