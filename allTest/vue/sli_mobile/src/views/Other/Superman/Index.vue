<template>
    <div class="chaoren-wrap" style="height:100%;">
        <div id="screen1">
        <img :src="chaoren" alt="" class="chaoren">
        </div>
        <div class="particles"></div>
        <div class="particles"></div>
        <div class="particles"></div>
    </div>
</template>
<script>
import imgSvg from './man.svg';
export default {
  data () {
    return {chaoren: imgSvg};
  }
};
</script>
<style lang="less" scoped>
@import './bg.css';
.chaoren {
    width: 80%;
    height: auto;
    padding: 0;
    position: absolute;
    top: 50%;
}
.chaoren-wrap {
    background-color: #A669C2;
}
</style>
