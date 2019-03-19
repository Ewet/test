<template>
    <StructPage>
        <Header
            slot="header"
            title="我的发票"
        >
         <span slot="right" class="filter" @click="setShow(true)">
            <icon name="shaixuan" />筛选
        </span>
        </Header>
        <div slot="content">
                <pull-refresh v-model="topLoading" @refresh="onRefresh">
                <list
                v-model="bottomLoading"
                :finished="finished"
                @load="onLoad"
                :immediate-check="true"
              >
                <div :key="index" v-for="(item, index) in items" @click="showDetail(item.status, item.invoiceId)">
                    <div class="invice-item">
                        <div class="left">
                            <div class="van-ellipsis">{{item.titleTypeFormat}}:{{item.titleName}}</div>
                            <div class="amount">发票金额：<span class="zi">￥{{item.realTotal}}</span></div>
                        </div>
                        <div class="right">
                            <div class="data">{{item.createdTime}}</div>
                            <div class="status zi">{{item.statusFormat}}</div>
                        </div>
                    </div>
                </div>
                  <ListNoData
                    desc="您还没有相关的内容耶~"
                    v-show="items.length===0 && loaded"></ListNoData>
                  <BottomNoData v-show="loaded && finished && items.length >0"></BottomNoData>
                  </list>
              </pull-refresh>
        </div>
        <popup slot="footer" v-model="showDateSelect" position="bottom" >
            <datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="setData"
                @cancel="setShow(false)"
            />
        </popup>
    </StructPage>
</template>

<script>
import { Panel, Cell, List, Icon, Popup, DatetimePicker, Toast, PullRefresh } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import {getList} from 'model/invoiceModel';
import fecha from 'fecha';
export default {
  data () {
    return {
      'showDateSelect': false,
      'currentDate': new Date(),
      filterTime: '',
      items: [],
      topLoading: false,
      finished: false,
      bottomLoading: false,
      current: 1,
      hasMore: true,
      loaded: false,
      // 'loading': false,
      // 'finished': false,
      // 'loaded': false,
      // 'current': 1,
      // 'hasMore': true,

      'invoiceList': [
      ]
    };
  },
  mounted () {
    // this.loadData();
  },
  methods: {
    showDetail (status, id) {
      if (status === 20) {
        this.$go({
          name: 'InvoiceDetail',
          query: {invoice_id: id}
        });
      }
    },
    // 日期筛选的显隐
    setData (val) {
      let time = fecha.format(val, 'YYYY-MM-DD');
      this.filterTime = `${time} 00:00:00`;
      // this.loadData();
      this.finished = true;
      this.current = 1;
      this.loadData(({
        hasMore
      } = {
        hasMore: true
      }) => {
        setTimeout(() => {
          this.finished = !hasMore;
          // if (!hasMore) {
          //   this.showNoMoreData = true;
          // }
        }, 500);
      });
      // this.items.filter(x=>{})
      this.setShow(false);
    },
    setShow (val) {
      this.showDateSelect = val;
    },
    loadData (callback = (data) => {}) {
      this.loadAjaxData();
    },
    onLoad () {
      this.$nextTick(() => {
        this.loadAjaxData(undefined, ({
          hasMore
        }) => {
          this.bottomLoading = false;
          this.finished = !hasMore;
        });
      });
    },
    onRefresh () {
      this.loadAjaxData(() => {
        this.filterTime = '';
        this.current = 1;
        this.finished = true;
      }, ({
        hasMore
      }) => {
        setTimeout(() => {
          this.topLoading = false;
        }, 500);
        this.finished = !hasMore;
        // if (this.finished) {
        //   this.$nextTick(() => {
        //     this.showNoMoreData = true;
        //   });
        // }
      });
    },
    // 加载异步数据
    loadAjaxData (beforeCallback = () => {}, afterCallback = () => {}) {
      beforeCallback.call(this);
      getList({
        'pagination[page]': this.current,
        'timePoint': this.filterTime
      }).then(({
        success,
        data,
        msg
      }) => {
        afterCallback.call(this, data);
        let formatItem = item => {
          return {
            'invoiceId': item.invoiceId,
            'titleType': item.titleType,
            'titleTypeFormat': item.titleTypeFormat,
            'titleName': item.titleName,
            'createdTime': item.createdTime,
            'orderTotal': item.orderTotal,
            'realTotal': item.realTotal,
            'status': item.status,
            'statusFormat': item.statusFormat
          };
        };
        if (success) {
          if (this.current === 1) {
            this.hasMore = data.hasMore;
            this.items = data.items.map(x => {
              return formatItem(x);
            });
          } else {
            this.hasMore = data.hasMore;
            this.items = this.items.concat(data.items.map(x => {
              return formatItem(x);
            }));
          }
          this.current++;
          this.loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    }
  },
  components: {
    StructPage,
    Header,
    Panel,
    Cell,
    List,
    Icon,
    BottomNoData,
    ListNoData,
    Popup,
    DatetimePicker,
    Toast,
    PullRefresh
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/color.less";
.zi {
  color: @primaryColor;
}
.filter{
    display: inline-block;
    font-size: 0.2rem;
    line-height: 0.32rem;
    .van-icon{
        font-size: 0.32rem;
        margin-right: 0.05rem;
    }
}

.invice-item {
    height: 1.54rem;
    line-height: 0.7rem;
    padding:0 0.3rem;
    display: flex;
    justify-content: space-between;
    background: #fff;
    margin:0.2rem 0;
  .left {
      font-size: 0.3rem;
      display: flex;
      flex-direction:column;
    //   align-items: left;
    max-width: 4.8rem;
    // .titlename{
    //   width: 4.8rem;

    // }
    .amount{
        font-size: 0.26rem;
        span{
            font-size: 0.24rem;
        }
    }
  }
  .right{
      display: flex;
      flex-direction:column;
    //   align-items:right;
    .data {
      font-size: 0.2rem;
      color: #ababab;
    }
    .status {
      font-size: 0.26rem;
      text-align: right;
    }
  }
}
</style>
