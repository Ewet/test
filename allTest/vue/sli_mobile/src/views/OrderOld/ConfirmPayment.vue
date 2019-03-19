<template>
   <div class="payment">
            <TopNav
                title="确认付款"
                :back="back"
            />
    <div class="header">
        <div class="border"><img  :src="avatar"
 alt=""></div>
    </div>
    <cell-group style="margin-top:1.5rem;">
        <cell
            title="订单编号"
        >
          <span slot="right-icon" class="mr">{{num}}</span>
        </cell>
        <cell
            title="订单金额"
        >
         <span slot="right-icon" class="mr zi">￥{{account}}</span>
        </cell>
    </cell-group>
    <cell-group class="mt40 mb20">
            <cell
            title="当前积分"
            >
            <span slot="right-icon" class="mr zi">{{credit}}</span>
        </cell>
            <cell>
            <div slot="title">
                积分抵扣：<input class="cnum" type="number" v-model="amount" placeholder="请输入要抵扣的积分" @focus="focus"/>
            </div>
            <Button slot="right-icon" class="mr right-btn" @click="allin">全部抵扣</Button>
        </cell>
        </cell-group>
        <div class="tips">注：每<span class="zi">500</span>积分可抵扣<span class="zi">1元</span></div>
        <div style="height:1.5rem"></div>
        <!-- <submit-bar
        :price="256"
        button-text="确定"
        @submit="onSubmit"
        /> -->
        <div class="bottomtext" v-show="show">
            <Button class="bottombtn">确定</Button>
            <div class="bttext">合计：<span class="zi">￥256</span></div>
        </div>
</div>
</template>
<script>
import { Cell, CellGroup, Icon, NavBar, Button } from 'vant';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      avatar: 'http://thirdwx.qlogo.cn/mmopen/mknn7zWx09NwPiaakQpC31xOWr4vGiaLCricF0ZeKXxbCnlFups4lUdkvfqnqYIHNlCnKRDK1b0w0ibsoSSjcxPUicvGC2dMXCcwN/132',
      num: 535635354353,
      credit: 560,
      account: 320,
      amount: '',
      show: true
    };
  },
  components: {
    Cell,
    CellGroup,
    Icon,
    NavBar,
    TopNav,
    Button
  },
  methods: {
    back () {
      this.$go({name: 'MemberCenter'});
    },
    allin () {
      this.amount = this.credit;
    },
    focus () {
      setTimeout(function () {
        document.body.scrollTop = document.body.scrollHeight;
      }, 300);
    },
    loadData () {
    },
    mounted () {
      this.loadData();
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.payment{
    .zi{
            color: @primaryColor;
        }
    .header{
        position: relative;
        display: flex;
        color:#fff;
        height: 1.7rem;
        background-color: @primaryColor;
        border-radius: 0 0 1.5rem 1.5rem;
        img {
            // position: relative;
            // margin-left: 40%;
            // margin-top: 0.8rem;
            // margin-top: 0.1rem;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate3d(-50%,50%,0);
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;
            border: 0.1rem solid rgba(255,255,255,0.47);
            // box-shadow: 0 0 1rem gray;
            // margin-left: 0.1rem;
        }
    }
    .van-cell{
        height: 0.8rem;
    }
    .mr{
        position: absolute;
        right: 0.3rem;
        // color: @primaryColor;
    }
    .cnum{
        border: none;
        &::placeholder{
            color:#AAAAAA;
            font-size: 0.24rem;
        }
    }
    .tips{
        font-size: 0.25rem;
        margin-left: 0.3rem;
    }
    .right-btn {
        border-radius: 0.1rem;
        border:0.02rem solid @primaryColor;
        background-color: #ffffff;
        color:@primaryColor;
        font-size: 0.24rem;
        line-height: 0.3rem;
        height:0.4rem;
        // margin-top: 0.15rem;
    }
    //底部
    .bottomtext{
        // z-index: -1;
        background: #fff;
        position: fixed;
        bottom: 0;
        // right:0;
        // left:0;
        width: 100%;
        height: 0.98rem;
        // border-top: 0.01rem solid #000000;
        box-shadow: 0 0 0.1rem #cccccc;
        .bttext{
            float: right;
            font-size: 0.28rem;
            line-height: 0.98rem;
        }
        .bottombtn{
            margin-left: 0.71rem;
            width: 2.5rem;
            height: 100%;
            float: right;
            font-size: 0.32rem;
            color: #fff;
            background: @primaryColor;
            border: none;
        }
    }

}
</style>
