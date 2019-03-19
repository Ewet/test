<template>
    <StructPage class="megPage">
        <Header
            title="差额详情"
            slot="header"
        ></Header>
        <div slot="content">
          <div :class="code===405?'megImg meg2':''"></div>
          <div :class="code===406?'megImg meg1':''"></div>
          <p v-if="code===405">当前订单已取消</p>
          <p v-if="code===406">当前订单已关闭</p>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';

export default {
  data () {
    return {
      code: 0
    };
  },
  mounted () {
    let code = this.$route.query.code;
    this.code = code;
  },
  methods: {
  },
  components: {
    StructPage,
    Header
  }
};
</script>
<style lang="less" scope>
@import '~@/assets/color.less';
.megPage{
  .megImg{
    width: 4.63rem;
    height: 4.42rem;
    display: block;
    background: #ccc;
    margin: 2.32rem auto 0 auto;
  }
  .meg1{
    background: url('./images/meg.jpg') no-repeat  top center;
    background-size: cover;
  }
  .meg2{
    background: url('./images/meg.jpg') no-repeat  bottom center;
    background-size: cover;
  }
  p{
    margin: 0.4rem auto 0 auto;
    text-align: center;
    padding: 0;
    font-size: 0.32rem;
  }
}

</style>
