<template>
  <div class="result">
    <TopNav
    title="提现结果"
    :back="back"
    />
    <!-- <div class="center-page">
      <icon name="checked" />
      <p>操作成功<br /><span>提现申请已提交，请留意具体到账时间</span></p>
    </div> -->
    <ListNoData
     desc="操作成功"
     subDesc="提现申请已提交，请留意具体到账时间"
     bgimg='bg4'>
     </ListNoData>
    <!-- <Button @click="back">确定</Button> -->
    <Btn @increment="back">确认</Btn>
  </div>
</template>
<script>
import { Button, Icon } from 'vant';
import TopNav from 'components/TopNav';
import ListNoData from 'components/ListNoData';
import Btn from 'components/Btn';
export default {
  data () {
    return {
    };
  },
  mounted () {},
  methods: {
    back () {
      this.$replace({name: 'DistributionCenterHome'});
    }
  },
  components: { TopNav, Button, Icon, ListNoData, Btn }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.result {
  // .center-page{
  //   margin-top: 3rem;
  //   text-align: center;
  //   font-size: 0.28rem;
    // .van-icon-checked {
    //         font-size: 1.75rem;
    //         color:@primaryColor;
    //     }
    // p{
    //   margin-top: 0.6rem;
    //   span{
    //     color: #999999;
    //     font-size: 0.24rem;
    //   }
    // }
  // }
  .van-button{
    display: block;
    margin: 1.5rem auto 0;
  }
}

</style>
