<template>
    <StructPage class="merchant-list">
        <Header
            slot="header"
            title="商户列表"
        />
        <div slot="content" class="merchant-list-content">
            <search
              v-model="searchName"
              placeholder="请输入搜索关键词"
              show-action
              @search="handleSearch(searchName)"
            >
              <div slot="action" @click="handleSearch(searchName)">搜索</div>
            </search>
          <list
          v-model="bottomLoading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="true"
        >
            <div class="item" v-for="(item,index) in items" :key="index">
              <div @click="selectTitle(item)" class="van-hairline--bottom">
                <cell :title="item.merchantName" titleClass="van-ellipsis"/>
              </div>
            </div>
            <ListNoData
              desc="暂无商户记录~"
              bgimg='bg1'
              v-show="items.length===0 && loaded"></ListNoData>
            <BottomNoData v-show="loaded && finished && items.length >0"></BottomNoData>
            </list>
        </div>
    </StructPage>
</template>

<script>
import { CellGroup, Cell, Icon, List, Toast, Search } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import Btn from 'components/Btn';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import { getMerchantList } from 'model/purchaseApplication';
export default {
  data () {
    return {
      // invoiceHeaderList: [],
      orderSn: this.$route.query.order_sn,
      items: [],
      topLoading: false,
      finished: false,
      bottomLoading: false,
      current: 1,
      hasMore: true,
      loaded: false,
      merchantName: '',
      searchName: ''
    };
  },
  mounted () {
  },
  methods: {
    handleSearch (name) {
      this.loadAjaxData(() => {
        // this.filterTime = '';
        this.current = 1;
        this.finished = true;
      }, ({
        hasMore
      }) => {
        setTimeout(() => {
          this.topLoading = false;
        }, 500);
        this.finished = !hasMore;
        if (this.finished) {
          this.$nextTick(() => {
            this.showNoMoreData = true;
          });
        }
      }, name);
    },
    loadData (callback = (data) => {}) {
      this.loadAjaxData();
    },
    //
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
        // this.filterTime = '';
        this.current = 1;
        this.finished = true;
      }, ({
        hasMore
      }) => {
        setTimeout(() => {
          this.topLoading = false;
        }, 500);
        this.finished = !hasMore;
        if (this.finished) {
          this.$nextTick(() => {
            this.showNoMoreData = true;
          });
        }
      });
    },
    // 加载异步数据
    loadAjaxData (beforeCallback = () => {}, afterCallback = () => {}, name) {
      beforeCallback.call(this);
      getMerchantList({
        'name': name,
        'pagination[page]': this.current
      }).then(({
        success,
        data,
        msg
      }) => {
        afterCallback.call(this, data);
        let formatItem = item => {
          return {
            merchantId: item.merchantId,
            merchantName: item.merchantName
          };
        };
        if (success) {
          if (this.current === 1) {
            this.items = data.items.map(x => {
              return formatItem(x);
            });
          } else {
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
    },
    //
    selectTitle (item) {
      this.$go({
        name: 'Request',
        query: {
          merchant_id: item.merchantId,
          merchant_name: item.merchantName
        }
      });
    }
  },
  components: {
    StructPage,
    Btn,
    BottomNoData,
    ListNoData,
    Header,
    CellGroup,
    Cell,
    Icon,
    List,
    Toast,
    Search
  }
};
</script>
<style lang="less">
.merchant-list{
  .merchant-list-content {
    border: 1px solid transparent;
    .van-search{
      z-index: 2;
      position: absolute;
      width: 100%;
    }
    .van-list{
      margin-top: 0.9rem;
      // z-index: 2;
    }
  // .van-search{
  //   position: fixed;
  //   top:46px;
  //   left: 0;
  //   right: 0;
  //   z-index: 2;
  // }
  }
}
</style>
<style lang="less" scoped>
@import "~@/assets/color.less";
.merchant-list{
  &-content {
    // position: relative;
    // margin-top:0.9rem;
  }
}
</style>
