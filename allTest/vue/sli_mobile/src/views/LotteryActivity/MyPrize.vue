<template>
    <StructPage>
        <Header
            title="我的礼品"
            slot="header"
            :transparentBar="true"
            bgImg="lottery-bg2"
        />

        <div slot="content"  class="my-prize-content">
          <pull-refresh v-model="topLoading" @refresh="onRefresh">
          <list
          v-model="bottomLoading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="true"
        >
            <cell-group v-for="(item,index) in items" :key="index">
                <cell
                    :title="item.prizeName"
                    :value="item.statusFormat"
                    :icon="item.icon"
                    is-link
                    @click="showDetail(item)"
                />
            </cell-group>
            <ListNoData
              desc="暂无奖品记录~"
              bgimg='bg2'
              v-show="items.length===0 && loaded"></ListNoData>
            <BottomNoData v-show="loaded && finished && items.length >0"></BottomNoData>
            </list>
            </pull-refresh>
        </div>

    </StructPage>
</template>

<script>
import { Cell, CellGroup, Icon, List, Toast, PullRefresh } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import { getList } from '@/model/lotteryActivity';
export default {
  data () {
    return {
      // prizeList: [
      //   {
      //     prizeType: '1',
      //     winner_id: '111',
      //     icon: 'location',
      //     prizeName: '1200元纯金手链',
      //     statusFormat: '已发放'
      //   },
      //   {
      //     prizeType: '1',
      //     winner_id: '111',
      //     icon: 'location',
      //     prizeName: '1200元纯金手链',
      //     statusFormat: '已发放'
      //   }

      // ],
      items: [],
      topLoading: false,
      finished: false,
      bottomLoading: false,
      current: 1,
      hasMore: true,
      loaded: false
    };
  },
  mounted () {
    // this.loadAjaxData();
  },
  methods: {
    //
    loadData (callback = (data) => {}) {
      this.loadAjaxData();
    },
    showDetail (item) {
      // console.log(item);
      if (item.prizeType === 1) {
        this.$go({name: 'RewardGoldPool'});
      } else if (item.prizeType === 2) {
        if (item.couponSn) {
          this.$go({ name: 'CouponDetail',
            query: {
              coupon_sn: item.couponSn
            }
          });
        } else {
          Toast('优惠券发送失败，请联系客服。');
        }
        // this.$go({name: 'MyCoupon'});
      } else {
        this.$go({ name: 'PrizeDetail',
          query: {
            winner_id: item.winnerId
          }
        });
      }
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
            prizeType: item.prizeType,
            winnerId: item.winnerId,
            icon: item.icon,
            prizeName: item.prizeName,
            status: item.status,
            statusFormat: item.statusFormat,
            couponSn: item.couponSn
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
  components: {
    StructPage,
    Header,
    BottomNoData,
    ListNoData,
    Cell,
    CellGroup,
    Icon,
    List,
    Toast,
    PullRefresh
  }
};
</script>
<style lang="less" >
@import '~@/assets/color.less';
.my-prize-content{
    .van-cell__title{
        span{
          display: inline-block;
          width: 4rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
    }
}
</style>
<style lang="less" scoped>
@import '~@/assets/color.less';
.my-prize-content{
    // height: 100%;
    // background-color: #EFEFF4;
    .van-cell{
        height: 1rem;
        span{
          color:red;
        }
    }
}
</style>
