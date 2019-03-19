<template>
   <StructPage>
        <Header
            slot="header"
            title="我的订单"
        />
        <div slot="content">
            <div class="orderlist">
              <tabs v-model="active" @click="tabClick">
                <tab :key="index" v-for="(item, index) in catetorys" :title="item.name"> <!-- 多个内容 -->
                    <!-- 一个内容的列表 -->
                   <list
                    v-show="active === index"
                    v-model="item.loading"
                    :finished="item.finished"
                    @load="onLoad"
                    :immediateCheck="false"
                    :offset="100"
                    >
                      <!-- 列表的item -->
                      <div class="ol-item" :class="{ 'mt0': index === item.list.length - 1 }" :key="index + 'k'" v-for="(listitem, index) in item.list">
                        <Panel>
                          <div slot="header" class="ol-item-h">
                            <p>{{listitem.storename}}</p>
                            <span>{{listitem.logisticsstate}}</span>
                          </div>
                          <div class="ol-item-body">
                            <div class="desc" v-for="(goodsitem, goodsIndex) in listitem.goods" :key="goodsIndex+ 'b'"  @click='orderDetail(listitem.orderSn)'>
                              <img v-lazy="goodsitem.goodsimage" alt="">
                              <p class="goodsname">{{goodsitem.goodsname}}</p>
                              <p class="price">
                                  <span class="bold">￥{{goodsitem.price}}</span><br/>
                                  <span class="bold second">￥{{goodsitem.originalprice}}</span><br/>
                                  <span>x{{goodsitem.quanity}}</span>
                              </p>
                            </div>
                            <p class="total">共计：{{listitem.totalquantity}}件商品 &nbsp;&nbsp;&nbsp;&nbsp;合计:￥<span class="totalprice bold">{{listitem.total}}</span> (含运费：￥0.00)</p> <!--{{listitem.freight}}-->
                          </div>
                          <div slot="footer" class="ol-item-f clearfix" v-if="listitem.sstatus === 15">
                            <Button class="pay" size="small" @click="toPay(listitem.plfOrderId)">去支付</Button>
                          </div>
                          <div slot="footer" class="ol-item-f clearfix" v-if="listitem.isRefundable || listitem.realPay > 0">
                            <Button class="refund" size="small" v-if="listitem.isRefundable" @click="applyRefund(listitem.orderSn)">申请退款</Button>
                            <Button class="invoice" size="small" v-if="listitem.invoiceId === null && listitem.realPay > 0" @click="invoice(listitem.orderSn)">申请发票</Button>
                          </div>
                        </Panel>
                      </div>
                      <BottomNoData v-show="item.finished && item.list.length"></BottomNoData>
                      <ListNoData
                        desc="您还没有相关的订单"
                        subDesc='去看看你喜欢的商品吧'
                        v-show="item.list.length===0 && item.loaded">
                      </ListNoData>
                  </list>
                </tab>
              </tabs>
            </div>
        </div>
    </StructPage>
</template>

<script>
import { NavBar, Tab, Tabs, Panel, List, Toast, Button } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import { getList } from '@/model/orderModel';
import defaultImg from './images/defaultgoods@2x.png';
export default {
  components: {
    StructPage,
    Header,
    NavBar,
    Tab,
    Tabs,
    Panel,
    List,
    BottomNoData,
    ListNoData,
    Button
  },
  data () {
    return {
      active: 0,
      more: true,
      show: false,
      catetorys: [
        {
          name: '全部',
          value: '',
          list: [
          ],
          finished: false,
          loading: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '待支付',
          value: 15,
          list: [
          ],
          finished: false,
          loading: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '已支付',
          value: 20,
          list: [
          ],
          finished: false,
          loading: false,
          loaded: false,
          hasMore: true,
          current: 1
        }
      ],
      defaultImg: defaultImg
    };
  },
  // created () {
  //   document.addEventListener('click', this.closeMorePop);
  // },
  // beforeDestroy () {
  //   document.removeEventListener('click', this.closeMorePop);
  // },
  mounted () {
    this.loadData();
  },
  methods: {
    // 订单详情
    orderDetail (orderSn) {
      this.$go({name: 'OrderDetail', query: {order_sn: orderSn}});
    },
    // closeMorePop () {
    //   let item = this.catetorys[this.active];
    //   item.list.forEach(x => (x.showMoreBtn = false));
    // },
    showpage (index) {
      let item = this.catetorys[this.active];
      item.list[index].showMoreBtn = !item.list[index].showMoreBtn;
    },
    // 开发票
    invoice (orderSn) {
      this.$go({
        name: 'InvoiceRequest',
        query: {
          order_sn: orderSn
        }
      });
    },
    // 申请退款
    applyRefund (orderSn) {
      this.$go({
        name: 'RefundRequest',
        query: {
          order_sn: orderSn
        }
      });
    },
    // 支付
    toPay (id) {
      this.$go({
        name: 'Payment',
        query: {
          order_id: id
        }
      });
    },
    loadData () {
      let item = this.catetorys[this.active];
      getList({
        'pagination[page]': item.current,
        tab: this.active
      }).then(({success, data, msg}) => {
        if (success) {
          if (item.current === 1) {
            item.list = data.items;
          } else {
            item.list = item.list.concat(data.items);
          }
          item.current++;
          if (!data.hasMore) {
            item.finished = true;
          }
          item.loaded = true;
        } else {
          Toast(msg);
          item.finished = true;
        }
        item.loading = false;
      });
    },
    onLoad () {
      this.loadData();
    },
    tabClick (index) {
      scrollTo(0, 0);
      this.active = index;
    }
  },
  watch: {
    active (val) {
      let item = this.catetorys[val];
      if (item.list.length === 0) {
        this.loadData();
      }
    }
  }
};
</script>

<style lang='less'>
@import '~@/assets/color.less';
.orderlist {
    .van-panel__footer {
        padding-right: 0.25rem;
        text-align: right;
    }
    font-size:.26rem;
    .bold{
        font-weight: bold;
    }
    .van-tab--active {
        color:@primaryColor;
    }
    .van-tabs__nav-bar {
        background-color: @primaryColor;
    }
    .van-tabs--line .van-tabs__wrap {
      height: 44px;
      position: fixed;
      top: 46px;
      left: 0;
    }
    .van-tabs {
        z-index: 1;
    }
    .ol-item {
        margin-bottom: 0.2rem;
        .ol-item-h {
            display: flex;
            justify-content: space-between;
            margin: 0.05rem 0;
            padding: 0 0.15rem;
            height: 0.8rem;
            line-height: 0.8rem;
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
                background-color: #f8f8fa;
                .goodsname{
                    font-size: 0.28rem;
                    margin: 0;
                    width:5.5rem;
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
                span.second {
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
          display: inline-block;
          margin-left: 8px;
          .more {
              float: left;
              position: relative;
              z-index: 2;
              ul {
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
          .invoice, .pay, .refund{
            border-radius: .1rem;
            border-color: #999;
            padding-top: .04rem;
            font-size: 0.28rem;
            color: #000;
          }
          .invoice, .pay{
            color: #fff;
            border-color: transparent;
            background-color: @primaryColor;
          }
        }
    }
    .no-data {
        text-align: center;
        padding-top: 1.2rem;
       img {
           width: 3.48rem;
           height: 3.48rem;
           vertical-align: top;
           border-radius: 50%;
       }
       p {
           text-align: center;
           font-size:.32rem;
           color:#000;
           span {
               font-size: .24rem;
               color: #999;
           }
       }
    }
}
</style>
