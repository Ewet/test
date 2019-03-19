<template>
    <StructPage class='purchaseRefund'>
        <Header
            slot="header"
            title="代购退货"
        />
        <div slot="content">
            <Cell class="ol-item" v-if="isList">
                <div class="ol-item-head">
                    <div>
                        <p>订单编号：{{orderNum}}</p>
                        <span>请将商品退回到对应的货位中</span>
                    </div>
                </div>
                <div class="ol-item-body">
                    <div class="desc" v-for="(goods, index) in goods" :key="index">
                        <img v-lazy="goods.goodsimage" alt="">
                        <p class="goodsname">{{goods.goodsname}}</p>
                        <p class="orderPrice">
                            <span class="bold">￥{{goods.price}}</span>
                            <span>x{{goods.quanity}}</span>
                        </p>
                        <div class='stepper'>
                            <stepper
                                v-model="goods.retireQuantity"
                                integer
                                disable-input
                                :min="0"
                                :max= goods.quanity
                                v-if="status === '1'"
                                @plus='add(index)'
                                @minus='reduce(index)'
                            />
                            <span class="gray">请放回第{{goods.area}}区</span>
                        </div>
                    </div>
                </div>
            </Cell>
            <Result :datas='datas' v-else />
        </div>
        <OrderFooter
            v-if="isList"
            slot='footer'
            btnText='确定'
            @confirm='confirm'
        >
            <div class='total' slot='left'>
                <span>总计：<i>￥{{total}}</i></span>
                <span>数量：{{totalNum}}</span>
            </div>
        </OrderFooter>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import OrderFooter from 'components/OrderFooter';
import Result from './Result';
import { List, Cell, Stepper, Toast } from 'vant';
import { getRefundList, confirmRefund } from 'model/purchaseRefund';
export default {
  data () {
    return {
      orderNum: '',
      status: '', // 1已支付 2未支付
      total: '',
      totalNum: '',
      goods: [],
      isList: true, // 是否显示退货结果
      orderId: '',
      datas: {} // 退货结果数据
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    async loadData () {
      let orderId = this.$route.query.order_id;
      this.orderId = orderId;
      let {success, data, msg} = await getRefundList(orderId);
      console.log(data);
      if (success) {
        this.orderNum = data.orderNum;
        this.status = data.status;
        this.total = data.total;
        this.totalNum = data.totalNum;
        this.goods = data.goods;
      } else {
        Toast(msg);
      }
    },
    add (index) {
      this.goods[index].retireQuantity++;
      this.totalNum++;
      this.totalMoney();
    },
    reduce (index) {
      this.goods[index].retireQuantity--;
      this.totalNum--;
      this.totalMoney();
    },
    totalMoney () {
      let totalM = 0;
      this.goods.map(x => {
        let money = x.retireQuantity * x.price;
        totalM += money;
      });
      this.total = totalM.toFixed(2);
    },
    async confirm () {
      let {success, data, msg} = await confirmRefund({
        order_id: this.orderId,
        cart: this.goods.map(x => ({
          'layer_no': x.area,
          'quantity': x.retireQuantity
        }))
      });
      if (success) {
        console.log(data);
        this.isList = false;
        this.datas = data;
      } else {
        Toast(msg);
      }
    }
  },
  components: {
    StructPage,
    Header,
    OrderFooter,
    List,
    Cell,
    Stepper,
    Result
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';
.purchaseRefund{
    p{
        margin: 0;
    }
    .van-cell{
        padding: 0;
        padding-bottom: .34rem;
    }
    .ol-item {
        font-size:.26rem;
        margin-bottom: 0.2rem;
        .ol-item-head {
            font-size:.2rem;
            color: #7B7B7B;
            display: flex;
            justify-content: space-between;
            padding: .2rem 0.15rem;
            line-height: 0.34rem;
            background-color: #fff;
        }
        .ol-item-body {
            .desc {
                position: relative;
                box-sizing: border-box;
                height: 1.6rem;
                padding: 0.2rem;
                background-color: #F8F8FA;
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
                .stepper{
                    position: absolute;
                    top: 0;
                    right: 0.15rem;
                    width: 1.7rem;
                    height: 1.6rem;
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    padding: .2rem 0;
                    box-sizing: border-box;
                    text-align: right;
                    .van-stepper{
                        .van-stepper__minus,.van-stepper__plus{
                            width: 0.5rem;
                            height: 0.4rem;
                        }
                        .van-stepper__input{
                            width: 0.5rem;
                            height: 0.32rem;
                            color: #494949;
                        }
                    }
                    span{
                        font-size: .2rem;
                        color:#7B7B7B;
                    }
                }
            }
            .desc + .desc {
                margin-top: 0.20rem;
            }
            img {
                width: 1.2rem;
                height: 1.2rem;
                float: left;
                margin-right: .25rem;
            }
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
