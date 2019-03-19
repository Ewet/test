<template>
    <StructPage class='shopCar'>
        <Header
            slot="header"
            title="购物车"
        >
            <span slot="right" class="list" @click="goOrder">消费列表</span>
        </Header>
        <div slot="content">
            <Cell class="ol-item" v-show="goods.length > 0">
                <div class="ol-item-h">
                    <p>{{shopName}}[盒子编号：{{boxNum}}]</p>
                </div>
                <div class="ol-item-body">
                    <div class="desc" v-for="goods in goods" :key="goods.goods_id">
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
            btnText='付款'
            @confirm='confirm'
            :disabled="!goods.length"
            v-show="goods.length > 0"
        >
            <div class='total' slot='left'>
                <span>总计：<i>￥{{total}}</i></span>
            </div>
        </OrderFooter>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import OrderFooter from 'components/OrderFooter';
import ListNoData from 'components/ListNoData';
import { List, Cell, Toast } from 'vant';
import shopCarList from 'websocket/cart';
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
  components: {
    StructPage,
    Header,
    List,
    Cell,
    OrderFooter,
    ListNoData
  },
  data () {
    return {
      shopName: '',
      boxNum: '',
      allNum: '',
      total: '',
      qrCode: '',
      goods: []
    };
  },
  mounted () {
    let boxId = this.$route.query.box_id;
    this.loadData(boxId);
  },
  methods: {
    goOrder () {
      this.$go({name: 'OrderList'});
    },
    confirm () {
      if (!this.goods.length) {
        this.$error('当前购物车为空！');
        return false;
      }
      this.buildOrder();
    },
    loadData (boxId) {
      shopCarList({
        box_id: boxId
      }, {
        onMessage: ({success, data, message}) => {
          console.log('成功');
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
          console.log('关闭');
        }
      });
    },
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
    }
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';
.shopCar{
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
        margin-bottom: 0.9rem;
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
        justify-content: space-around;
        span{
            i{
                font-style: normal;
                color: @primaryColor;
            }
        }
    }
}
</style>
