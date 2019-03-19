<template>
<div class="orderlist">
  <TopNav
     title="我的订单"
  />
<tabs v-model="active" @click="tabClick">
  <tab :key="index" v-for="(item, index) in catetorys" :title="item.name">
        <list
            v-show="active === index"
            v-model="item.loading"
            :finished="item.finished"
            @load="onLoad"
            :immediateCheck="false"
            :offset="100"
            >
                <div class="ol-item" :class="{ 'mt0': index === item.list.length - 1 }" :key="index" v-for="(listitem, index) in item.list">
                    <Panel>
                        <div slot="header" class="ol-item-h">
                            <p>{{listitem.storename}}</p>
                            <span>{{listitem.logisticsstate}}</span>
                        </div>
                        <div class="ol-item-body">
                            <div class="desc" v-for="(goodsitem, goodsIndex) in listitem.goods" :key="goodsIndex">
                            <img v-if="goodsitem.goodsimage" v-lazy="goodsitem.goodsimage"  alt="">
                            <img v-else v-lazy="defaultImg"  alt="">
                            <p class="goodsname">{{goodsitem.goodsname}}</p>
                            <p class="price">
                                <span class="bold">￥{{goodsitem.price}}</span><br/><span class=" bold">￥{{goodsitem.originalprice}}</span><br/><span>x{{goodsitem.quanity}}</span>
                            </p>
                            </div>
                            <p class="total">共计：{{listitem.totalquantity}}件商品 &nbsp;&nbsp;&nbsp;&nbsp;合计:￥<span class="totalprice bold">{{listitem.total}}</span> (含运费：￥{{listitem.freight}})</p>
                        </div>
                        <div slot="footer" class="ol-item-f clearfix" v-if="listitem.sstatus === 41">
                            <Button class="more" @click.prevent.stop="showpage(index)" >更多
                                <ul v-show="listitem.showMoreBtn">
                                    <li @click.prevent.stop="invoice">开发票</li>
                                </ul>
                            </Button>
                            <!-- <Button size="small" @click="checklogistics">查看物流</Button>
                            <Button size="small" @click="confirmreceipt">确认收货</Button> -->
                        </div>
                    </Panel>
                </div>
                <BottomNoData v-show="item.finished && item.list.length"></BottomNoData>
                <ListNoData
                    desc="您还没有相关的订单"
                    subDesc='去看看你喜欢的商品吧'
                    v-show="item.list.length===0 && item.loaded"></ListNoData>
        </list>
  </tab>
</tabs>
</div>
</template>
<script>
import { NavBar, Tab, Tabs, Panel, List, Toast, Button } from 'vant';
import { getList } from 'model/order-old';
import defaultImg from './images/defaultgoods@2x.png';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import TopNav from 'components/TopNav';
export default {
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
          //   immediateCheck: true,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '待支付',
          value: 11,
          list: [
          ],
          finished: false,
          loading: false,
          //   immediateCheck: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '待发货',
          value: 21,
          list: [],
          finished: false,
          loading: false,
          //   immediateCheck: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '待收货',
          value: 31,
          list: [
          ],
          finished: false,
          loading: false,
          //   immediateCheck: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '待评价',
          value: 41,
          list: [
          ],
          finished: false,
          loading: false,
          //   immediateCheck: false,
          loaded: false,
          hasMore: true,
          current: 1
        }
      ],
      defaultImg: defaultImg
    };
  },
  created () {
    document.addEventListener('click', this.closeMorePop);
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeMorePop);
  },
  mounted () {
    this.loadData();
  },
  methods: {
    closeMorePop () {
      let item = this.catetorys[this.active];
      item.list.forEach(x => (x.showMoreBtn = false));
    },
    showpage (index) {
      let item = this.catetorys[this.active];
      item.list[index].showMoreBtn = !item.list[index].showMoreBtn;
    },
    // 开发票
    invoice () {
      Toast.success('开发票');
      this.closeMorePop();
    },
    // 打印
    print () {
      alert('打印');
    },
    resetpage () {
      // this.show = false;
    },
    // 查看物流
    checklogistics () {
      alert('物流信息');
    },
    // 确认收货
    confirmreceipt () {
      alert('确认收货');
    },
    loadData () {
      let item = this.catetorys[this.active];
      let params = {};
      if (item.value === 11) {
        params['pay_status'] = item.value;
      } else {
        params['ship_status'] = item.value;
      }
      getList({
        'pagination[page]': item.current,
        ...params
        // 'user_id': '000'
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
  },
  components: {NavBar, Tab, Tabs, Panel, List, BottomNoData, TopNav, ListNoData, Button}
};
</script>
<style>
.orderlist .van-tabs__wrap {
    position: fixed;
    top:46px;
}

</style>

<style  lang="less" scoped>
@import '~@/assets/color.less';
.orderlist {
    // .van-button--bottom-action {
    //     position: fixed;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     background-color: @primaryColor;
    // }
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
                width: 5.5rem;
            }
            span {
                color: @primaryColor;
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
    .van-panel__footer {
        padding-right: 0.25rem;
        .van-button:last-child {
            background-color: @primaryColor;
            color: #fff;
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
