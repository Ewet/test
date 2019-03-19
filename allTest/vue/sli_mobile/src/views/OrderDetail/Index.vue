<template>
  <StructPage>
    <Header
        slot="header"
        title="订单详情"
    />
    <div class='orderDetail' slot="content">
      <div class='orderStatus' v-show="status === '20'">
        <p class='top'>交易成功</p>
      </div>
      <div class='orderStatus' v-show="status === '15'">
        <p class='top'>待支付</p>
      </div>
      <div class="ol-item">
        <div slot="header" class="ol-item-h">
          <p>{{storename}}</p>
          <span>{{logisticsstate}}</span>
        </div>
        <div class="ol-item-body">
          <div class="desc" v-for="(item, index) in goods" :key="index">
            <img v-lazy="item.goodsimage" alt="">
            <p class="goodsname">{{item.goodsname}}</p>
            <p class="price">
                <span class="bold">￥{{item.price}}</span><br/><span class=" bold">￥{{item.originalprice}}</span><br/><span>x{{item.quanity}}</span>
            </p>
          </div>
        </div>
        <div class="totalPrice">
          <div class="havePay" v-if="status === '20'">
            <div class="left">
              <p>订单总价 </p>
              <p>支付方式</p>
            </div>
            <div class="right">
              <p>￥{{totalPrice}}</p>
              <p>{{payWay}}</p>
            </div>
          </div>
          <div class="havePay" v-else>
              <p>订单状态</p>
              <p>{{payType}}</p>
          </div>
        </div>
        <div class="realPay">
          <p>{{status === '20' ? '实付金额' : '应付金额'}}</p>
          <p>￥{{status === '20' ? realPay : payableTotal}}</p>
        </div>
        <div class="orderNumber">
          <p>订单编号：{{orderNum}}</p>
           <!-- v-if="status !== '20'" -->
          <p v-if="status === '20'">成交时间：{{payTime}}</p>
          <p v-else>下单时间：{{createTime}}</p>
        </div>
      </div>
      <div class="goPay" v-show="status === '15'">
        <Button @click="goPay">去支付</Button>
      </div>
    </div>
  </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import { Button, Dialog } from 'vant';
import Header from 'components/Header';
import { getOrderDetail } from '@/model/orderModel';
export default {
  data () {
    return {
      status: '',
      orderSn: '',
      storename: '',
      logisticsstate: '',
      goods: [],
      totalPrice: '', // 总价
      payWay: '',
      payType: '',
      realPay: '', // 实付金额
      payableTotal: '', // 应付金额
      orderNum: '',
      orderId: '',
      payTime: '',
      plfOrderId: '',
      createTime: ''
    };
  },
  components: {
    StructPage,
    Header,
    Button,
    Dialog
  },
  mounted () {
    this.orderSn = this.$route.query.order_sn;
    this.loadData(this.orderSn);
  },
  methods: {
    // 支付
    goPay (id) {
      this.$go({
        name: 'Payment',
        query: {
          order_id: this.plfOrderId
        }
      });
      // Dialog.confirm({
      //   title: '标题',
      //   message: '你有订单未完成支付，是否立即前往支付？',
      //   confirmButtonText: '是',
      //   cancelButtonText: '否'
      // }).then(() => {
      //   // on confirm
      // }).catch(() => {
      //   // on cancel
      // });
    },
    async loadData (orderSn) {
      let res = await getOrderDetail(orderSn);
      console.log(res);
      if (res.success) {
        let data = res.result;
        this.storename = data.storename;
        this.logisticsstate = data.logisticsstate;
        this.goods = data.goods;
        this.totalPrice = data.totalPrice;
        this.payWay = data.payWay;
        this.payType = data.payType;
        this.realPay = data.realPay;
        this.payableTotal = data.payableTotal;
        this.orderNum = data.orderNum;
        this.orderId = data.orderId;
        this.payTime = data.payTime;
        this.createTime = data.createTime;
        this.status = data.status;
        this.plfOrderId = data.plfOrderId;
      } else {
        Dialog.alert({
          message: '数据获取失败！' + res.msg
        });
      }
    }
  }
};
</script>

<style lang='less'>
@import '~@/assets/color.less';
.orderDetail{
  .orderStatus{
    background-color: #E2C1F2;
    height: 1.31rem;
    p{
      font-size: .32rem;
      line-height: 1.31rem;
      margin: 0;
      padding-left: .72rem;
      color: #3C3C3C;
    }
  }
  .ol-item {
    font-size:.26rem;
    margin-bottom: 0.2rem;
    .ol-item-h {
        display: flex;
        justify-content: space-between;
        padding: 0 0.15rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #fff;
        p {
            margin: 0;
        }
        span {
            color: @primaryColor;
            text-align:right;
        }
    }
    .ol-item-body {
        .desc {
            position: relative;
            box-sizing: border-box;
            height: 1.6rem;
            padding: 0.2rem;
            background-color: #F8F8FA;
            .goodsname{
                font-size: 0.28rem;
                margin: 0;
                width:5.5rem;
                word-wrap: break-word;
            }
        }
        .desc + .desc {
            border-top: 0.02rem solid #e5e5e5;
        }
        img {
            width: 1.2rem;
            height: 1.2rem;
            float: left;
            margin-right: .25rem;
        }
        .price {
            position: absolute;
            right: 0.25rem;
            top: 0.2rem;
            margin: 0;
            text-align: right;
            span:nth-of-type(2) {
                color: #aaa;
                text-decoration: line-through;
            }
        }
        .total {
            font-size: 0.24rem;
            text-align: right;
            margin:0;
            padding: 0.25rem 0.25rem 0.25rem 0;
            .totalprice{
              font-size: 0.28rem;
              color:@primaryColor;

            }
        }
    }
    .ol-item-f {
        text-align: right;
        .more {
            float: left;
            position: relative;
            z-index: 2;
            ul {
                // display: none;
                position: absolute;
                left: 0;
                top: 0.5rem;
                width: 1.2rem;
                border: 1px solid #e5e5e5;
                background: #fff;
                padding: 0.2rem;
                line-height: 0.5rem;
            }
        }
    }
  }
  .totalPrice{
    padding-bottom: 1px;
    .havePay{
      background-color: #fff;
      color: rgba(98,97,99,.6);
      display: flex;
      justify-content: space-between;
      padding: 0 .24rem;
      font-size: .22rem;
      .right{
        font-size: .26rem;
        text-align: right;
      }
    }
  }
  .realPay{
    // &:extend(.totalPrice .havePay);
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .24rem;
    p{
      font-size: .24rem;
      color: #000000;
    }
    p:nth-of-type(2){
      font-size: .28rem;
      color: #A669C2;
    }
  }
  .orderNumber{
    background-color: #fff;
    padding: .24rem;
    font-size: .22rem;
    color: #626163;
    margin-top: 0.2rem;
    p{
      margin: .04rem 0;
    }
  }
  .goPay{
    margin-top: .5rem;
    text-align: center;
    Button{
      width:4.8rem;
      height:.7rem;
      line-height: .7rem;
      background:@primaryColor;
      border-radius:.08rem;
      color: #fff;
      font-size: 0.28rem;
    }
  }
}
</style>
