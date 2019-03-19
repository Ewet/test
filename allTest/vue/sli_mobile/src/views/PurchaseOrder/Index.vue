<template>
    <StructPage class='purchaseOrder'>
        <Header
            slot="header"
            title="代购清单"
        />
        <div slot="content">
            <List
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :immediateCheck="false"
                :offset="100"
            >
                <Cell v-for="(item, index) in purchaseOrderList" :key="index" class="ol-item">
                    <div class="ol-item-h">
                        <p>订单编号：{{item.orderNum}}</p>
                        <span>{{item.logisticsstate}}</span>
                    </div>
                    <div class="ol-item-body">
                        <div class="desc" v-for="(goods, index) in item.goods" :key="index">
                        <img v-lazy="goods.goodsimage" alt="">
                        <p class="goodsname">{{goods.goodsname}}</p>
                        <p class="price">
                            <span class="bold">￥{{goods.price}}</span><br/>
                            <span>x{{goods.quanity}}</span>
                        </p>
                        </div>
                    </div>
                    <div class="ol-item-content">
                        <p></p>
                        <span><i>合计：</i>￥{{item.total}}</span>
                    </div>
                    <div class='footer-btn'>
                        <Button size="small" v-if="item.isRefundable" @click="refund(item.orderId)">退货</Button>
                        <Button size="small" v-if="item.status === 15" @click="GetMoney(item.orderId)">去收款</Button>
                    </div>
                </Cell>
                <BottomNoData v-show="finished && purchaseOrderList.length"></BottomNoData>
                <ListNoData
                    desc="您还没有相关的订单"
                    subDesc='去看看你喜欢的商品吧'
                    v-show="purchaseOrderList.length===0 && loaded">
                </ListNoData>
            </List>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import ListNoData from 'components/ListNoData';
import BottomNoData from 'components/BottomNoData';
import { List, Cell, Toast } from 'vant';
import { getList } from 'model/purchaseOrder';
export default {
  components: {
    StructPage,
    Header,
    List,
    Cell,
    ListNoData,
    BottomNoData,
    Toast
  },
  data () {
    return {
      finished: false,
      loading: false,
      current: 1,
      loaded: false,
      purchaseOrderList: []
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    onLoad () {
      this.loadData();
    },
    loadData () {
      getList({
        'pagination[page]': this.current,
        'pagination[page_size]': 10
      }).then(({success, data, msg}) => {
        if (success) {
          if (this.current === 1) {
            this.purchaseOrderList = data.items;
          } else {
            this.purchaseOrderList = this.purchaseOrderList.concat(data.items);
          }
          this.current++;
          if (!data.hasMore) {
            this.finished = true;
          }
          this.loaded = true;
        } else {
          Toast(msg);
          this.finished = true;
        }
        this.loading = false;
      });
    },
    refund (orderId) {
      this.$go({
        name: 'PurchaseRefund',
        query: {
          order_id: orderId
        }
      });
    },
    GetMoney (orderId) {
      this.$go({
        name: 'SweepCodePayment',
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
.purchaseOrder{
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
                // width: 5rem;
                color: #000;
            }
            span {
                color: #535353;
                // width: 2rem;
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
        .ol-item-content{
            .ol-item-h;
            font-size: 0.24rem;
            border-bottom: 1px solid #DDDDDD;
            span{
                color: @primaryColor;
            }
            i{
                font-style: normal;
                color: #000;
            }
        }
        .footer-btn{
            text-align: right;
            padding: .2rem .3rem;
            Button{
                width: 1.5rem;
                height: .56rem;
                padding: 0;
                color: #303030;
                font-family: '微软雅黑';
                font-size: .28rem;
                padding-top: .06rem;
                border: 1px solid #ddd;
                border-radius: .1rem;
                background: none;
            }
            Button:nth-of-type(2){
                margin-left: .3rem;
                background: @primaryColor;
                color: #fff;
                border: none;
            }
        }
    }
}
</style>
