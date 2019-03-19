<template>
  <div class="checkoutcounter">
    <TopNav
     title="收银台"
    />
<template v-if="payStatu">
  <!-- <div class="price">需支付：<span class="zi">￥254.50</span></div>
  <div class="bgcolor">
    <div class="text ml30">请选择支付方式：</div>
    <div class="van-hairline--bottom"></div>
    <div class="method">
        <icon name="wx2" class="ml30"></icon>
        <p class="paytext">微信支付<br/><span class="label" >微信安全支付</span></p>

    <div class="check mr30">
      <icon slot="right-icon" name="check" v-show="!checked"/>
      <icon slot="right-icon" name="checked" v-show="checked"/>
    </div>
  </div>
  <div class="van-hairline--bottom"></div>
    <div class="method ">
        <icon name="daifu" class="ml30"></icon>
        <p class="paytext">微信好友代付<br/><span class="label" >帮你付款才是真爱</span></p>

    <div class="check mr30">
      <icon slot="right-icon" name="check" v-show="!checked"/>
      <icon slot="right-icon" name="checked" v-show="checked"/>
    </div>
  </div>
  </div> -->
      <Button class="btn" type="default" @click="loadInfo">确认支付：￥{{total}}</Button>
  </template>
  <template v-else>
      <ListNoData
            :desc="`该订单处于${payStatusFormat}状态,无法操作~`"
            bgimg='bg2'
           >
      </ListNoData>
  </template>
  </div>
</template>
<script>
import {NavBar, Icon, Cell, CellGroup, Button, Toast} from 'vant';
import TopNav from 'components/TopNav';
import { pay } from '@/utils/wx';
import { getO2Redirect } from '@/model/wxModel';
import { pendingOrder, getInformation, getWxpaySignature } from '@/model/paymentModel';
import { mapMutations } from 'vuex';
import ListNoData from 'components/ListNoData';
import { log } from '@/model/logModel';
export default {
  data () {
    return {
      show: false,
      checked: true,
      orderId: this.$route.query.order_id || this.$route.query.state || '',
      code: this.$route.query.code || '',
      total: 0,
      isLock: true,
      realReceive: 0,
      willReceive: 0,
      payStatus: '',
      payStatusFormat: ''
    };
  },
  computed: {
    payStatu () {
      if (this.payStatus === '11' || this.payStatus === '15') {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted () {
    this.loadData();
    this.loadInfo();
  },
  methods: {
    loadInfo () {
      getInformation().then(({
        success, data, msg
      }) => {
      // 是否微信登陆签名
        if (data.openId) {
          console.log('openId', data.openId);
          this.fetchPay({
            openid: data.openId,
            order_id: this.orderId
          });
        } else if (this.code) {
          console.log('code', this.code);
          this.fetchPay({
            order_id: this.orderId,
            o2_code: this.code
          });
        } else {
          getO2Redirect({
            callback: `https://${location.host}${location.pathname}`,
            state: this.orderId
          }).then(({success, data, msg}) => {
            if (success) {
              log({
                content: JSON.stringify({
                  name: 'o2Redirect',
                  data: {
                    params: {
                      callback: `https://${location.host}${location.pathname}`,
                      state: this.orderId
                    },
                    res: {success, data, msg}
                  }
                })
              });
              console.log('跳转到', data);
              location.href = data;
            } else {
              Toast(msg);
            }
          });
        }
      });
    },
    // 选中
    checkuser (index) {
      this.activeIndex = index;
      this.items.forEach((x, i) => {
        if (i === index) {
          x.checked = true;
        } else {
          x.checked = false;
        }
      });
    },
    loadData () {
      pendingOrder(this.orderId).then(result => {
        if (result.success) {
          this.isLock = result.data.isLock;
          this.realReceive = result.data.realReceive;
          this.willReceive = result.data.willReceive;
          this.payStatus = result.data.payStatus;// 支付状态
          this.payStatusFormat = result.data.payStatusFormat;// 支付状态
          if (this.isLock) {
            this.total = this.realReceive;
          } else if (this.isLock === false) {
            this.total = this.willReceive;
          }
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      });
    },
    fetchPay (opts) {
      // 开发环境测试代码
      // if (process.env.NODE_ENV !== 'production') {
      //   this.paySuccess();
      //   return false;
      // }
      getWxpaySignature(opts)
        .then(({success, data, msg}) => {
          log({
            content: JSON.stringify({
              name: '获取微信签名',
              data: {
                params: opts,
                res: { success, data, msg }
              }
            })
          });
          if (success) {
            this.wxPay(data);
          } else {
            Toast(msg);
          }
        });
    },
    wxPay (data) {
      pay({signParams: data,
        success: () => {
        // 跳转到支付成功
          this.paySuccess();
        },
        fail: () => {
        // 跳转到支付失败
          this.payFail();
        }
      });
    },
    paySuccess () {
      this.$go({
        name: 'PaySuccess',
        query: {
          order_id: this.orderId
        }
      });
    },
    payFail () {
      this.$go({
        name: 'PayFail',
        query: {
          order_id: this.orderId
        }
      });
    },
    ...mapMutations('confirmOrder', ['setCouponItems'])
  },
  components: {NavBar, Icon, Cell, CellGroup, TopNav, Button, ListNoData}
};
</script>
<style lang="less">
@import '~@/assets/color.less';
@import '~@/assets/mixin.less';
.checkoutcounter {
  .zi{
    color: @primaryColor;
  }
  .van-icon-wx2,.van-icon-daifu {
    font-size: 0.6rem;
    // height:0.49rem;
    // width: 0.6rem;
    margin-right: 0.2rem;
  }
  // .van-icon-daifu {
  //   font-size: 0.6rem;
  //   // height:0.49rem;
  //   // width: 0.6rem;
  //   margin-right: 0.2rem;
  //   // margin-left: 0.1rem;
  //   // margin-top: -0.1rem;
  // }
  .mr30{
    margin-right: 0.3rem;
  }
  .ml30{
    margin-left: 0.3rem;
  }

}
</style>

<style  lang="less" scoped>
@import '~@/assets/color.less';
@import '~@/assets/mixin.less';
.checkoutcounter {
  font-family: 'MicrosoftYaHei';
  .price{
    line-height: 0.88rem;
    text-align:right;
    font-size: 0.28rem;
    padding-right:0.3rem;
  }
  .bgcolor{
    background: #ffffff;
    .text{
      font-size: .28rem;
      color:#666666;
      line-height:0.9rem;
    }
    .method{
      font-size: .32rem;
      display:flex;
      align-items:center;
      .paytext {
        flex:1;
        line-height:1;
        .label{
          color:#999999;
          font-size:.24rem;

        }
      }
      .check{
        .van-icon-checked{
          color: @primaryColor;
        }
        .van-icon-checked,.van-icon-check{
          // margin-top: 0.2rem;
          font-size: 0.4rem;
          width:0.4rem;
          height: 0.4rem;
          margin-top:0;
        }
      }
    }
  }
    .btn{
      position: absolute;
      bottom:0;
      // border:0;
      width: 100%;
      height: 0.98rem;
      font-size: 0.32rem;
      line-height:0.98rem;
      background: @primaryColor;
      color: #ffffff;
    }

}

</style>
