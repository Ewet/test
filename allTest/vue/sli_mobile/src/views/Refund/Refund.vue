<template>
<div class="orderlist">
  <TopNav
     title="退货/售后"
  />
<tabs v-model="active" @click="tabClick">
  <tab :key="index" v-for="(item, index) in catetorys" :title="item.name">
        <list
            v-model="item.loading"
            :finished="item.finished"
            @load="onLoad"
            :immediateCheck="false"
            :offset="100"
            >
                <div class="ol-item mt20" :key="listitem.key" v-for="listitem in item.list">
                    <Panel>
                        <div slot="header" class="ol-item-h">
                            <p>退货单号：{{listitem.refundId}}</p>
                            <span>{{listitem.status}}</span>
                        </div>
                        <div class="ol-item-body">
                            <div class="desc" v-for="(goodsitem, goodsIndex) in listitem.goods" :key="goodsIndex">
                              <img v-lazy="goodsitem.goodsImg"  alt="">

                            <div class="goodsname">
                              <p>{{goodsitem.goodsName}}</p>

                              <div>
                                <span class="refund">退积分：{{goodsitem.integral}}&nbsp;&nbsp;&nbsp;</span>
                                <span class="refund"> 退款总金额：{{goodsitem.total}} </span>
                              </div>
                            </div>
                            <p class="price">
                                <span >￥{{goodsitem.price}}</span><br/><br/><span >x{{goodsitem.quanity}}</span>
                            </p>
                            <p class="refundTo" v-show="listitem.isShowSteps">退款至{{listitem.refundTo}}</p>

                            </div>
                            <div class="reset" v-show="listitem.statu==='0'">你已取消申请</div>
                            <div class="reset" v-show="!listitem.isShowSteps && listitem.statu!=='0'">{{listitem.refundDesc}}</div>
                            <div class="step" v-show="listitem.isShowSteps">
                              <steps
                              :data= listitem.statusList

                              ></steps>
                            </div>
                        </div>
                        <div slot="footer" class="btn" v-if="listitem.isShowBtn">
                            <Button size="small" @click="editRequest(listitem.refundId)">修改申请</Button>
                            <Button size="small" @click="resetRequest(listitem.refundId)">取消申请</Button>
                        </div>
                    </Panel>
                </div>
                <BottomNoData v-show="item.finished && item.list.length"></BottomNoData>
                <ListNoData
                    desc="暂无退货记录"
                    v-show="item.list.length===0 && item.loaded"></ListNoData>
        </list>
  </tab>
</tabs>
</div>
</template>
<script>
import { PullRefresh, NavBar, Tab, Tabs, Panel, List, Toast, Button, Dialog } from 'vant';
import { getList, cancelRefund } from '@/model/refund';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import TopNav from 'components/TopNav';
import Steps from 'components/Steps';
export default {
  name: 'Refund',
  data () {
    return {
      active: 0,
      catetorys: [
        {
          name: '处理中',
          value: 0,
          list: [],
          finished: false,
          loading: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '已完成',
          value: 1,
          list: [],
          finished: false,
          loading: false,
          loaded: false,
          hasMore: true,
          current: 1
        },
        {
          name: '申请记录',
          value: '',
          list: [],
          finished: false,
          loading: false,
          loaded: false,
          hasMore: true,
          current: 1
        }
      ]
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
      item.showMoreBtn = !item.showMoreBtn;
    },
    editRequest (refundId) {
      this.$go({ name: 'EditRequest',
        query: {
          refund_id: refundId
        }
      });
    },
    resetRequest (refundId) {
      Dialog.confirm({
        title: '确定要取消吗？',
        message: '',
        className: 'sl-dialog-confirm',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        cancelRefund(refundId).then(({success, msg}) => {
          if (success) {
            this.onRefresh(this.active);
            this.resetTabData();
          } else {
            Toast(msg);
          }
        }).catch(() => {
          // on cancel
        });
      });
    },
    loadData () {
      this.loadTabData(this.catetorys[this.active]);
    },
    onLoad () {
      this.loadData();
    },
    tabClick (index) {
      scrollTo(0, 0);
      this.active = index;
    },
    onRefresh (index) {
      let item = this.catetorys[index];
      item.current = 1;
      setTimeout(() => {
        this.loadTabData(item);
      }, 1000);
    },
    loadTabData (item) {
      let params = {'refund_status': item.value};
      getList({
        'pagination[page]': item.current,
        ...params
      }).then(({ success, data, msg }) => {
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
    resetTabData () {
      this.catetorys.forEach((item, index) => {
        if (this.active !== index) {
          Object.assign(item, {
            list: [],
            finished: false,
            loading: false,
            loaded: false,
            hasMore: true,
            current: 1
          });
        }
      });
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
  components: {
    NavBar,
    Tab,
    Tabs,
    Panel,
    List,
    BottomNoData,
    TopNav,
    ListNoData,
    Button,
    Steps,
    Dialog,
    PullRefresh
  }
};
</script>
<style lang="less">
.orderlist {
  .van-tabs__wrap {
    position: fixed;
    top: 46px;
  }
}
</style>

<style  lang="less" scoped>
@import "~@/assets/color.less";
.orderlist {
  // .van-button--bottom-action {
  //     position: fixed;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //     background-color: @primaryColor;
  // }
  font-size: 0.26rem;
  .bold {
    font-weight: bold;
  }
  .van-tab--active {
    color: @primaryColor;
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
        // color: @primaryColor;
        width: 2rem;
        text-align: right;
      }
    }
    .ol-item-body {
      .desc {
        position: relative;
        box-sizing: border-box;
        height: 2rem;
        padding: 0.2rem;
        background-color: #f8f8fa;
        .goodsname {
          height: 1.2rem;
          width: 4.5rem;
          display:flex;
          flex-flow:column;
          justify-content:space-between;
          font-size: 0.28rem;
          // margin: 0;

          p{
            margin:0;
          }
          .refund {
            font-size: 0.2rem;
            color: #838383;
          }
        }
        img {
          width: 1.2rem;
          height: 1.2rem;
          float: left;
          margin-right: 0.25rem;
        }
        .price {
          position: absolute;
          right: 0.25rem;
          top: 0.2rem;
          margin: 0;
          text-align: right;
          span:nth-of-type(2){
            color:#838383;
          }
        }
        .refundTo{
          font-size:0.24rem;
          position: absolute;
          right: 0.25rem;
          bottom: 0.2rem;
          margin: 0;
          color: @primaryColor;
          text-align: right;
        }
      }
      .desc + .desc {
        border-top: 0.02rem solid #fff;
      }
      .reset{
        font-size:0.26rem;
        color:#BABABA;
        text-align: right;
        height: 0.58rem;
        line-height: 0.58rem;
        margin:0 0.3rem 0 0;
      }
      .step {
        font-size: 0.24rem;
      }
    }
    .btn {
      text-align: right;
    }
  }
}
</style>
