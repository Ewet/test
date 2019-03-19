<template>
<div class="credit">
<TopNav
     title="积分明细"
    />
<div class="calendar-wrap"><icon  name="calendar"  @click="showCalendar = true"/></div>
  <div v-show="showFixed" class="group">
        <header
        v-show="groupItem.fixed"
        v-for="(groupItem,i) in list" :key="i"
        class="group-header gh"
        >
            <h3>{{groupItem.name}}</h3>

            </header>
    </div>
<pull-refresh v-model="topLoading" @refresh="onRefresh">

 <list
            v-model="bottomLoading"
            :finished="finished"
            @load="onLoad"
            :immediate-check="false"
            style="min-height:7.5rem"
            >
    <div class="group" v-for="(groupItem) in list" :key="groupItem.unionKey">
        <header class="group-header js-header">
            <h3 >{{groupItem.name}}</h3></header>
        <ul class="group-body">
            <li v-for="(item,index) in groupItem.items" :key="index">
                <ListItem
                iconname="liwu"
                ltText="积分"
                :lcText= "`[${item.fromType}]`"
                :lbText="item.createTime"
                :rtText="item.credit"
                :rbText="item.statusFormatted"
                >
                </ListItem>
                <!-- <div class="gb-left fixed-icon">
                    <img :src="liwu" alt="">
                    <div class="lefttext">
                        <p class="text">积分<span>{{item.fromType}}</span></p>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
                <div class="gb-right" :class="{'puple': item.credit > 0 }">{{formatCredit(item.credit)}}<br/><span class="status">{{item.statusFormatted}}</span>
                </div> -->
            </li>
        </ul>
    </div>
    <ListNoData
     desc="暂无积分记录"
     v-show="list.length===0 && loaded"></ListNoData>
    <BottomNoData v-show="loaded && finished && list.length >0"></BottomNoData>
 </list>
 </pull-refresh>
 <popup v-model="showCalendar" position="bottom">
 <datetime-picker
  v-model="currentDate"
  type="year-month"
  @confirm="selectDate"
  @cancel="showCalendar=false"
/>
</popup>
</div>
</template>
<script>
import { NavBar, Popup, List, PullRefresh, Icon, DatetimePicker } from 'vant';
import { getList } from '@/model/creditModel';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import groupList from 'components/groupList.js';
import liwu from './images/jifen@2x.png';
import TopNav from 'components/TopNav';
import ListItem from 'components/ListItem';
export default {
  mixins: [groupList],
  data () {
    return {
      showCalendar: false,
      currentDate: new Date(),
      list: [],
      liwu: liwu,
      finished: false,
      showFixed: true,
      loaded: false,
      hasMore: true,
      current: 1,
      // 上拉刷新
      topLoading: false,
      // 底部更多
      bottomLoading: false,
      filterTime: '',
      showNoMoreData: false
    };
  },
  mounted () {
    window.addEventListener('scroll', this.scroll);
    this.current = 1;
    this.onLoad();
  },
  methods: {
    formatCredit (val) {
      if (val > 0) {
        return '+ ' + val;
      }
      return val;
    },
    getList (params) {
      return getList(params);
    }
  },
  components: {NavBar, Popup, List, PullRefresh, BottomNoData, ListNoData, TopNav, Icon, DatetimePicker, ListItem}
};
</script>
<style>
 .van-nav-bar .van-icon {
    color:#fff !important;
}
</style>

<style  lang="less" scoped>
@import '~@/assets/color.less';
@import '~components/groupList.less';
.credit {
    font-size: .26rem;
    p{
      margin: 0;
    }
    .group {
        .group-header {
            display: flex;
            align-items: center;
        }
        .group-body{
            font-size: 0.28rem;
            li {
                height: 1.5rem;
                // display: flex;
                // justify-content: space-between;
                // padding: 0.21rem 0.25rem;
                // margin-bottom: 0.02rem;
                // background: #fff;
                // .status{
                //   font-size:0.24rem;
                //   color:@primaryColor;
                // }
                // div:nth-child(1) {
                //     flex:1;
                //     .text {
                //         // font-size: .28rem;
                //         margin-bottom: 0.1rem;
                //         span{
                //             margin-left: 0.2rem;
                //         }
                //     }
                //     span {
                //       color:#aaa;
                //       font-size: 0.24rem;
                //     }
                // }
                // .gb-left {
                //   display: flex;
                //   img{
                //       width:0.87rem;
                //       height:0.87rem;
                //   }
                //   .lefttext{
                //     margin-left: 0.25rem;
                //     padding-top: 0.05rem;
                //   }
                // }
                // .gb-right{
                //   text-align: center;
                // //   font-size:0.28rem;
                // }
            }
        }
    }
}

</style>
