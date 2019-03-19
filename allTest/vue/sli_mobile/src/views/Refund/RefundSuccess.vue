<template>
<div class="refundSuccess">
    <TopNav title="提交成功"/>
    <div class="content">
      <icon name="checked"/>
      <div class="refundMsg">
        <span >退款申请提交成功</span><br/>
        <span class="data">申请日期：{{requestData}}</span>
      </div>

      <Btn size="height" @increment="$go({name : 'Refund'})">查看进度</Btn>
    </div>

</div>
</template>
<script>
import { Stepper, Field, Button, Icon } from 'vant';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
import fecha from 'fecha';
export default{
  data () {
    return {
      value: 0
      // date: new Date()
    };
  },
  computed: {
    requestData () {
      return fecha.format(new Date(), 'YYYY-MM-DD');
    }
  },
  components: { Stepper, TopNav, Btn, Field, Button, Icon }
};
</script>

<style lang="less" scoped>
@import "~@/assets/color.less";
.refundSuccess{
  font-size: 0.32rem;
  .content{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1.7rem;
    .van-icon{
      font-size: 1.64rem;
      color:@primaryColor;
    }
    .refundMsg{
      margin: 0.7rem 0 1.4rem;
      color: #5F5F5F;
      .data{
        color: #A2A1A1;
        font-size: 0.18rem;
      }
    }

  }

}
</style>
