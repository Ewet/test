<template>
<div class="refundFail">
    <TopNav title="提交失败"/>
    <div class="content">
      <icon name="fail"/>
      <div class="refundMsg">
        <span>退款申请提交失败</span><br/>
        <span class="data">申请日期：2018-08-16</span>
      </div>

      <Btn size="height" @click="暂未开放">返回</Btn>
    </div>

</div>
</template>
<script>
import { Button, Icon } from 'vant';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
export default{
  data () {
    return {
      value: 0
    };
  },
  components: { TopNav, Btn, Button, Icon }
};
</script>

<style lang="less" scoped>
@import "~@/assets/color.less";
.refundFail{
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
