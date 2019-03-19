<template>
    <div class="maintain-wrapper">
        <p>系统正在升级…</p>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    };
  }
};
</script>

<style lang="less">
@import '~@/assets/color.less';
html,body {
 height: 100%;
 background-color: @primaryColor;
}
.maintain-wrapper {
  text-align: center;
  background:url('images/bg.jpg');
  height: 100%;
  background-repeat: no-repeat;
  background-size: 3.8rem 2.89rem;
  background-position: 50% 2.55rem;
  p {
    font-size:.66rem;
    font-weight:normal;
    color:rgba(255,255,255,1);
    padding-top: 6.7rem;
  }
}

</style>
