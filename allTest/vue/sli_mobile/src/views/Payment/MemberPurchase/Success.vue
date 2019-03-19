<template>
  <div class="paysuccess">
    <nav-bar
    title="支付结果"
    :back="back"
    />
    <div class="center-page">

    </div>
    <!-- <Button @click="$go({name: 'MemberCenter'})">返回</Button> -->
  </div>
</template>
<script>
import { NavBar, Button } from 'vant';
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
  components: { NavBar, Button }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.paysuccess {
  .center-page{
      width: 4.63rem;
      height:5.2rem;
      background-size:4.63rem 5.2rem;
      background-image: url("../images/success@2x.png");
      margin:1.17rem auto;
  }
  .van-button{
    width: 3.3rem;
    height: auto;
    line-height: 0.7rem;
    margin-top: 0.83rem;
    font-size: 0.28rem;
    background: @primaryColor;
    color: #ffffff;
    display: block;
    margin: 0 auto;

  }
}

</style>
