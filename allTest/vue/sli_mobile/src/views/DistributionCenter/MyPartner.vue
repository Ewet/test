<template>
  <div class="my-partner">
    <TopNav
     title="我的小伙伴"
    />
    <pull-refresh v-model="topLoading" @refresh="onRefresh">
      <div v-show="false" class="partnertop" ><p ><icon name="shaixuan" />筛选</p></div>
    <list
    v-model="bottomLoading"
    :finished="finished"
    @load="onLoad"
    :immediate-check="true"
    >
    <div class="van-hairline--bottom" v-for="(item,index) in items" :key="index" >
      <div class="van-cell">
        <span class="icon-wrap"><icon :name="item.icon" /></span>
        <div class="partnerinfo-text">{{item.mobile}}</div>
        <span>（贡献：{{item.contributed}}）</span>
      </div>
    </div>
    <ListNoData
     desc="暂无小伙伴~"
     bgimg='bg1'
     v-show="items.length===0 && loaded"></ListNoData>
    <BottomNoData v-show="loaded && finished && items.length >0"></BottomNoData>
  </list>

  </pull-refresh>
  </div>
</template>
<script>
import {NavBar, List, Cell, CellGroup, PullRefresh, Toast, Icon} from 'vant';
import { getList } from '@/model/subordinateModel';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      items: [],
      topLoading: false,
      finished: false,
      count: 0,
      bottomLoading: false,
      current: 1,
      hasMore: true,
      loaded: false
    };
  },
  mounted () {
    // this.onLoad();
  },
  methods: {
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
        if (this.finished) {
          this.$nextTick(() => {
            this.showNoMoreData = true;
          });
        }
      });
    },
    setIcon (gender) {
      if (gender === '1') {
        return 'man';
      } else if (gender === '2') {
        return 'women';
      } else {
        return '';
      }
    },
    // 加载异步数据
    loadAjaxData (beforeCallback = () => {}, afterCallback = () => {}) {
      beforeCallback.call(this);
      getList({
        'pagination[page]': this.current
      }).then(({
        success,
        data,
        msg
      }) => {
        afterCallback.call(this, data);
        let formatItem = item => {
          return {
            avatar: '头像',
            mobile: item.mobile,
            icon: this.setIcon(item.gender),
            contributed: item.contributed
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
    }
  },
  components: {NavBar, List, Cell, CellGroup, PullRefresh, BottomNoData, TopNav, Icon, ListNoData}
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.my-partner {
  .partnertop {
      font-size: 0.24rem;
      text-align: right;
      margin-right:0.2rem;
      // margin-top:1.2rem;
    }
    .icon-wrap{
      width:0.5rem;
    }
  .van-cell{
    // height:0.9rem;
    font-size: 0.28rem;
    align-items: center;
    .van-icon-women,.van-icon-man{
      font-size: 0.42rem;
    }
    .partnerinfo-text{
      flex: 1;
      font-size: 0.28rem;
      margin-left: 0.25rem;
    }
  }
}

</style>
