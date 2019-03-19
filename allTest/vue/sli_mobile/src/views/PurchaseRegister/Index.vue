<template>
    <StructPage class='purchaseRegister'>
        <Header
            slot="header"
            title="代购挂单"
        >
            <span slot="right" class="list" @click="goList">代购列表</span>
        </Header>
        <div slot="content">
            <Cell class="ol-item" v-show="goods.length > 0">
                <div class="ol-item-h">
                    <p>{{shopName}}[盒子编号：{{boxNum}}]</p>
                </div>
                <div class="ol-item-body">
                    <div class="desc" v-for="(goods, index) in goods" :key="index">
                    <img v-lazy="goods.goods_image" alt="">
                    <p class="goodsname">{{goods.goods_name}}</p>
                    <p class="price">
                        <span class="bold">￥{{goods.price}}</span><br/>
                        <span>x{{goods.quantity}}</span>
                    </p>
                    </div>
                </div>
                <div class='goodsNum'>共{{allNum}}件商品</div>
            </Cell>
            <ListNoData
                desc="您的购物车空空如也"
                subDesc='去看看你喜欢的商品吧'
                v-show="goods.length <= 0">
            </ListNoData>
        </div>
        <OrderFooter
            slot='footer'
            btnText='代客购买'
            @confirm='agentOrder'
            v-show="goods.length > 0"
            :disabled="!goods.length"
        >
            <div class='total' slot='left'>
                <span>总计：<i>￥{{total}}</i></span>
                <Button :disabled="!goods.length" class="agent" @click="confirm">个人购买</Button>
            </div>
        </OrderFooter>
        <div class="purchase" slot="other" v-show="showCodePay">
            <div class="top">
                <div class="icon" :class="{active: status === 1}" @click="showCode">
                    <icon name="close"/>
                </div>
                <div class="qr-code">
                    <h3>摩萄收银台</h3>
                    <div class="qr-pic">
                        <img :src="qrcodeImg"/>
                    </div>
                    <p class="totals">￥{{allMoney}}</p>
                    <div class="wechatIcon">
                        <img :src="wechatImg"/>
                        <span>微信扫一扫收款</span>
                    </div>
                    <div class="btn" :class="{active: status === 1}">
                        <span class="refund" @click="goRefund">我要退货</span>
                        <span class="goOn" @click="showCode">继续下单</span>
                    </div>
                    <div class="result" v-show="status === 1">
                        <icon name="checked"/>
                        <p>已收款成功</p>
                    </div>
                </div>
            </div>
            <!-- <div class="bottom">
                <div class="orderList">
                    <h3>{{name}}[盒子编号：{{boxNo}}]</h3>
                    <Cell class="lists">
                        <div class="ol-item-body">
                            <div class="desc" v-for="(goods, index) in codeGoodsList" :key="index">
                                <img v-lazy="goods.goodsimage" alt="">
                                <p class="goodsname">{{goods.goodsname}}</p>
                                <p class="orderPrice">
                                    <span class="bold">￥{{goods.price}}</span>
                                    <span>x{{goods.quanity}}</span>
                                </p>
                            </div>
                            <p class="total-p">共{{number}}件商品 </p>
                        </div>
                    </Cell>
                </div>
            </div> -->
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import OrderFooter from 'components/OrderFooter';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import { List, Cell, Toast, icon } from 'vant';
import { agentList } from 'model/purchaseRegister';
import cartSocket from 'websocket/cart';
import sweepCodePayment from 'websocket/sweepCodePayment';
import {generateOrder} from 'model/generateOrder';
import { isLogined } from 'model/memberModel';
export default {
  created () {
    isLogined().then(result => {
      let { code } = result;
      if (code === 401) {
        this.$error('当前用户未登录!');
      }
    });
  },
  data () {
    return {
      wechatImg: require('./images/wechat.png'),
      shopName: '',
      boxNum: '',
      total: '',
      qrCode: '',
      allNum: '',
      goods: [],
      showCodePay: false,
      codeGoodsList: [],
      qrcodeImg: '',
      name: '',
      boxNo: '',
      allMoney: '',
      number: null,
      orderId: '',
      status: null,
      boxOrderId: ''
    };
  },
  mounted () {
    let boxId = this.$route.query.box_id;
    this.loadData(boxId);
  },
  methods: {
    async buildOrder () {
      let { success, data, msg } = await generateOrder(this.qrCode);
      if (success) {
        this.goPay(data.order_id);
      } else {
        this.$error(msg);
      }
    },
    goPay (orderId) {
      console.log('跳转到付款', orderId);
      this.$replace({
        name: 'Payment',
        query: {
          order_id: orderId
        }
      });
    },
    confirm () {
      this.buildOrder();
    },
    async agentOrder () {
      Toast.loading({
        mask: true,
        message: '加载中...',
        duration: 0
      });
      let {success, data, msg} = await agentList(this.qrCode);
      if (success) {
        Toast.clear();
        this.boxOrderId = data.boxOrderId; // 用于跳转除支付页面之外的页面
        this.orderId = data.orderId;
        this.showCodePay = true;
        this.codeGoodsList = data.codeGoodsList;
        this.qrcodeImg = data.qrcodeImg;
        this.name = data.name;
        this.boxNo = data.boxNo;
        this.allMoney = data.allMoney;
        this.number = data.number;
        this.resultSocket();
      } else {
        Toast.clear();
        Toast(msg);
      }
    },
    loadData (boxId) {
      cartSocket({
        box_id: boxId
      }, {
        onMessage: ({success, data, message}) => {
          console.log('购物车链接成功！');
          if (success) {
            if (data === '' || data.detail.length <= 0) {
              // 购物车为空
              this.goods = [];
            } else {
              this.qrCode = data.qrcode;
              this.shopName = data.name;
              this.boxNum = data.box_no;
              this.allNum = data.goodsSum;
              this.total = data.sumPrice;
              this.goods = data.detail;
            }
          } else {
            Toast(message);
          }
        },
        onClose (data) {
          console.log('购物车链接关闭');
        }
      });
    },
    // 代客购买的结果socket
    resultSocket () {
      sweepCodePayment({
        order_id: this.boxOrderId
      }, {
        onMessage: ({success, data, message}) => {
          console.log('支付链接成功');
          if (success) {
            let rs = data;
            this.status = rs.pay_success;
          } else {
            Toast(message);
          }
        },
        onClose (data) {
          console.log('支付链接关闭');
        }
      });
    },
    goList () {
      this.$go({
        name: 'PurchaseOrder'
      });
    },
    showCode () {
      this.showCodePay = false;
    },
    goRefund () {
      this.$go({
        name: 'PurchaseRefund',
        query: {
          order_id: this.boxOrderId
        }
      });
    }
  },
  components: {
    StructPage,
    Header,
    List,
    Cell,
    OrderFooter,
    BottomNoData,
    icon,
    ListNoData
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';
.purchaseRegister{
    .list{
        font-size: .2rem;
        color: #fff;
        padding: .08rem .19rem;
        border: 1px solid #fff;
        border-radius: .1rem;
    }
    p{
        margin: 0;
    }
    .van-cell{
        padding: 0;
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
                color: #7E7E7E;
                font-size: .2rem;
            }
            span {
                color: #535353;
                width: 2rem;
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
                    word-break: break-all;
                    color: #000;
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
        .goodsNum{
            height: .8rem;
            text-align: right;
            font-size: .24rem;
            color: #7E7E7E;
            padding-right: .3rem;
            line-height: 0.8rem;
        }
    }
    .total{
        font-size: .26rem;
        color: #000;
        display: flex;
        justify-content: space-between;
        span{
            margin-left: 10%;
            i{
                font-style: normal;
                color: @primaryColor;
            }
        }
        .agent{
            width: 40%;
            height: 0.9rem;
            padding: 0;
            color: #fff;
            background-color: #6E95D0;
            border: none;
            font-size:.34rem;
            margin-right: 1px;
        }
    }
    .purchase{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 11;
        background: rgba(0, 0, 0, 0.5);
        .top{
            left:.26rem;
            right:.26rem;
            top:.36rem;
            background:@primaryColor;
            border-radius: .3rem;
            // margin: .36rem auto;
            position: absolute;
            .icon{
                position: absolute;
                top: .16rem;
                right: 0.16rem;
                width:0.5rem;
                height:0.5rem;
                z-index: 19;
                font-size: 0;
                .van-icon{
                    font-size: 25px;
                    color: #fff;
                }
            }
            .icon.active{
                .van-icon{
                    color: @primaryColor;
                }
            }
            .qr-code{
                // width: 100%;
                height: 100%;
                box-sizing: border-box;
                text-align: center;
                // display: flex;
                // flex-direction: column;
                // justify-content: space-between;
                // align-items: center;
                font-size: .22rem;
                color: #fff;
                position: relative;
                padding-top: .44rem;
                padding-bottom: 1.2rem;
                h3,p.totals{
                    font-size: .5rem;
                    margin: 0px;
                }
                .qr-pic{
                    display: inline-block;
                    height: 5rem;
                    width: 5rem;
                    margin-top: .38rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                p.totals{
                    margin-top: .36rem;
                }
                .wechatIcon{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: .36rem;
                    margin-bottom: 0.07rem;
                    margin-top: .46rem;
                    img{
                        width:.9rem;
                        height:.8rem;
                        margin-right:0.18rem
                    }
                }
                .btn{
                    position: absolute;
                    bottom: 0;
                    font-size: .38rem;
                    color: @primaryColor;
                    background: #fff;
                    width: 7rem;
                    height: 1rem;
                    border-radius: 0 0 .3rem .3rem;
                    span{
                        box-sizing: border-box;
                        display: inline-block;
                        line-height: 0.8rem;
                        width: 49%;
                        text-align: center;
                        margin-top: 0.1rem;
                    }
                    span.goOn{
                        border-left: 1px solid #A569C1;
                    }
                }
                .btn.active{
                    color: #fff;
                    background: @primaryColor;
                    span.goOn{
                        border-left: 1px solid #fff;
                    }
                }
                .result{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 90%;
                    background: rgba(255, 255, 255, 0.9);
                    text-align: center;
                    border-radius: 0.3rem 0.3rem 0 0;
                    left: 0;
                    bottom: 0;
                    .van-icon{
                        margin-top: 2.50rem;
                        font-size: 2.8rem;
                        color: @primaryColor;
                        background: #fff;
                        border-radius: 50%;
                    }
                    p{
                        font-size:.50rem;
                        color: @primaryColor;
                        margin-top: 0.6rem;
                    }
                }
            }
        }
        .bottom{
            .orderList{
                position: absolute;
                top: 76%;
                left: 0;
                right: 0;
                height: 24%;
                background: #fff;
                overflow: hidden;
                .van-cell:not(:last-child)::after{
                    border-bottom: none;
                }
                h3{
                    margin: 0;
                    height: .7rem;
                    line-height: 0.7rem;
                    font-size:.24rem;
                    color:#888;
                    background-color: #fff;
                    padding-left: .3rem;
                }
                p.total-p{
                    height: .7rem;
                    line-height: 0.7rem;
                    font-size:.24rem;
                    color:#000;
                    background-color: #fff;
                    text-align: right;
                    padding-right: .3rem;
                }
                .lists {
                    font-size:.26rem;
                    position: absolute;
                    top: 0.7rem;
                    left: 0;
                    right: 0;
                    height: 78%;
                    .ol-item-body {
                        height: 100%;
                        overflow: auto;
                        -webkit-overflow-scrolling: touch;
                        background: #F8F8FA;
                        .desc {
                            position: relative;
                            box-sizing: border-box;
                            height: 1.6rem;
                            padding: 0.2rem;
                            p{
                                line-height: 0.42rem;
                            }
                            p.goodsname{
                                font-size: 0.28rem;
                                width:5.3rem;
                                word-break: break-all;
                                color: #000;
                            }
                            p.orderPrice{
                                position: absolute;
                                left: 1.6rem;
                                bottom: 0.14rem;
                                span.bold{
                                    color: @primaryColor;
                                }
                                span:nth-of-type(2){
                                    margin-left: 1.2rem;
                                }
                            }
                        }
                        .desc + .desc {
                            border-top: 1px solid #fff;
                        }
                        img {
                            width: 1.2rem;
                            height: 1.2rem;
                            float: left;
                            margin-right: .25rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
