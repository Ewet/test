<template>
    <section class="struct-page" :class="[bgImg]">
      <section class="struct-page-header">
        <slot name="header"></slot>
      </section>
      <section class="struct-page-content">
        <slot name="content"></slot>
      </section>
      <section
      class="struct-page-footer"
      v-if="this.$slots.footer !== undefined"
      >
        <slot name="footer"></slot>
      </section>
      <section class="struct-page-other">
         <slot name="other"></slot>
      </section>
    </section>
</template>
<script>
export default {
  props: {
    bgImg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.struct-page{
    display: flex;
    height: 100%;
    flex-direction: column;
    .struct-page-header {
      display: block;
    }
    .struct-page-content {
      flex:1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .struct-page-footer {
      display: block;
    }
}
.lottery-bg {
  background-image: url('~@/assets/lottery-bg.png');
  background-size: cover;
  background-position: 50% 50%;
  .van-hairline--bottom::after{
    border-bottom-color: red;
    border-bottom-width:0!important;
  }
}
.lottery-bg2 {
  background-image: url('~@/assets/lottery-bg2.png');
  background-size: cover;
  background-position: 50% 50%;
  .van-hairline--bottom::after{
    border-bottom-color: red;
    border-bottom-width:0!important;
  }
}
.purchase-application {
  background-image: url('~@/assets/purchase-application.jpg');
  background-size: cover;
  background-position: 50% 50%;
  .van-hairline--bottom::after{
    border-bottom-color: red;
    border-bottom-width:0!important;
  }
}
.purchase-application-no {
  background-image: url('~@/assets/purchase-application-no.jpg');
  background-size: cover;
  background-position: 50% 50%;
  .van-hairline--bottom::after{
    border-bottom-color: red;
    border-bottom-width:0!important;
  }
}
</style>
