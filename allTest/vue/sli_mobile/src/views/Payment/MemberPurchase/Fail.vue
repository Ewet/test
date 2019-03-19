<template>
  <div class="payfail">
    <nav-bar
    title="支付结果"
    :back="back"
    />
    <div class="center-page">

    </div>
    <!-- <Button @click="back">重新支付</Button> -->
    <div class="submit"><Btn @increment="back">重新支付</Btn></div>
  </div>
</template>
<script>
import { NavBar, Button } from 'vant';
import Btn from 'components/Btn';
export default {
  data () {
    return {
    };
  },
  mounted () {},
  methods: {
    back () {
      this.$replace({
        name: 'MemberPurchase',
        query: {
          order_id: this.$route.query.order_id
        }
      });
    }
  },
  components: { NavBar, Button, Btn }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.payfail {
  .center-page{
      width: 4.63rem;
      height:5.2rem;
      background-size:4.63rem 5.2rem;
      background-image: url("../images/fail@2x.png");
      margin:1.17rem auto 0;
  }
  .submit{
    font-size: 0;
    margin-top: 1.5rem;
    text-align:center;
  // .van-button{
  //   width: 3.3rem;
  //   height: auto;
  //   line-height: 0.7rem;
  //   margin-top: 0.83rem;
  //   font-size: 0.28rem;
  //   background: @primaryColor;
  //   color: #ffffff;
    // position: relative;
    // left:50%;
    // transform: translateX(-50%);
  //   display: block;
  //   margin: 0 auto;

  }
}

</style>
