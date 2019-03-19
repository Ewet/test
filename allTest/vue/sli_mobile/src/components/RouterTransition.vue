<template>
    <div class="router-transition">
    <img :src="imgSrc" alt="">
    <p>页面切换中，请稍后...</p>
  </div>
</template>
<script>
import transitionImg from '@/assets/transition.gif';
export default {
  data () {
    return {imgSrc: transitionImg};
  }
};
</script>
<style lang="less" scoped>
.router-transition {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  z-index: 10;
  margin: auto;
    img {
      width:100%;
      height: 100%;
    }
    p {
        position: absolute;
        top: 52%;
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
        width: 100%;
    }
}
</style>
