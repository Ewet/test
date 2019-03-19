<template>
    <StructPage class='sweepCodePayment'>
        <Header
            slot="header"
            title="扫码支付"
            :transparentBar="true"
        />
        <div slot="content" class="container">
            <div class="qr-code">
                <div class="totals">
                    <p>总计：<span>￥{{total}}</span></p>
                </div>
                <div class="qr-pic">
                    <img :src="qrcodeImg"/>
                </div>
                <div class="order-no">
                    <p>订单编号：<span>{{orderSn}}</span></p>
                    <p>创建时间：<span>{{creatTime}}</span></p>
                </div>
                <div class="result" v-show="status === 1">
                    <icon name="checked"/>
                    <p>已支付</p>
                </div>
            </div>
            <div class="orderList">
                <h3>订单详情</h3>
                <Cell class="ol-item" v-if="isList">
                    <div class="ol-item-body">
                        <div class="desc" v-for="(goods, index) in goods" :key="index">
                            <img v-lazy="goods.image_url" alt="">
                            <p class="goodsname">{{goods.goods_name}}</p>
                            <p class="orderPrice">
                                <span class="bold">￥{{goods.price}}</span>
                                <span>x{{goods.quantity}}</span>
                            </p>
                        </div>
                    </div>
                </Cell>
                <!-- <BottomNoData v-show="true" style="background-color: #F8F8FA;"></BottomNoData> -->
            </div>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import BottomNoData from 'components/BottomNoData';
import {getQrimg} from 'model/sweepCodePayment';
import { Cell, Icon, Toast } from 'vant';
import sweepCodePayment from 'websocket/sweepCodePayment';
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
  name: 'sweepCodePayment',
  components: {
    StructPage,
    Header,
    Cell,
    BottomNoData,
    Icon
  },
  data () {
    return {
      total: '',
      orderSn: '',
      creatTime: '',
      status: null, // 1已支付 2未支付
      goods: [],
      isList: true,
      qrcodeImg: ''
    };
  },
  mounted () {
    let orderId = this.$route.query.order_id;
    this.loadData(orderId);
  },
  methods: {
    loadData (orderId) {
      getQrimg(orderId).then(x => {
        console.log(x);
      });
      sweepCodePayment({
        order_id: orderId
      }, {
        onMessage: ({success, data, message}) => {
          console.log('成功');
          if (success) {
            let rs = data;
            this.total = rs.order_total;
            this.orderSn = rs.order_sn;
            this.status = rs.pay_success;
            this.creatTime = rs.created_time;
            this.qrcodeImg = rs.qrcode_src;
            this.goods = rs.goodsList;
          } else {
            Toast(message);
          }
        },
        onClose (data) {
          console.log('关闭');
        }
      });
    }
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';
.sweepCodePayment{
    background: @primaryColor;
    .container{
        margin-top: .34rem;
        p{
            margin: 0;
        }
    }
    .qr-code{
        width:6.4rem;
        height:7.49rem;
        background:#fff;
        box-shadow:0px 10px 13px 0px rgba(4,0,0,0.05);
        border-radius:.2rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: .22rem;
        color: #6D6D6D;
        position: relative;
        .totals{
            margin-top: -.26rem;
            width: 100%;
            text-align: center;
            height: 1.5rem;
            border-bottom: 1px solid rgba(166,105,194,.4);
            p{
                font-size:.32rem;
                color: @primaryColor;
                line-height: 1.5rem;
                span{
                    font-size: .6rem;
                }
            }
        }
        .qr-pic{
            height: 3.83rem;
            width: 3.83rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .order-no{
            height: .68rem;
            text-align: center;
        }
        .result{
            position: absolute;
            width: 100%;
            height:5.90rem;
            background-color: rgba(255,255,255,.9);
            text-align: center;
            left: 0;
            bottom: 0;
            .van-icon{
                margin-top: 1.60rem;
                font-size: 1.7rem;
                color: @primaryColor;
            }
            p{
                font-size:.30rem;
                color: @primaryColor;
                margin-top: 0.10rem;
            }
        }
    }
    .orderList{
        position: absolute;
        top: 9.2rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        overflow: hidden;
        .van-cell{
            padding: 0 0;
        }
        .van-cell:not(:last-child)::after{
            border-bottom: none;
        }
        h3{
            margin: 0;
            height: .7rem;
            line-height: 0.7rem;
            font-size:.24rem;
            color:#888;
            background-color: #F8F8FA;
            padding-left: .3rem;
        }
        .ol-item {
            position: absolute;
            top: 0.7rem;
            left: 0;
            right: 0;
            height: 76%;
            font-size:.26rem;
            .ol-item-body {
                height: 100%;
                overflow: auto;
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
                    border-top: 1px solid #F8F8F8;
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
</style>
