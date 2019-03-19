<template>
<div class="goldpool">
 <TopNav
    title="奖励金详情"
  />
<!-- <icon  name="calendar" class="van-cell__right-icon" @click="showCalendar = true"/> -->
<div class="calendar-wrap"><icon  name="calendar"  @click="showCalendar = true"/></div>
  <div v-show="showFixed" class="group">
    <header
      v-show="groupItem.fixed"
      v-for="(groupItem,i) in list" :key="i"
      class="group-header gh"
      >
      <h3 >{{groupItem.name}}</h3>
      <span>收入:￥{{groupItem.total}}</span>
    </header>
  </div>
<pull-refresh v-model="topLoading" @refresh="onRefresh">

 <list
            v-model="bottomLoading"
            :finished="finished"
            @load="onLoad"
            :immediate-check="false"
            >
    <div class="group" v-for="(groupItem,i) in list" :key="i">
        <header class="group-header js-header">
            <h3>{{groupItem.name}}</h3>
            <span>收入:￥{{groupItem.total}}</span>
        </header>
        <ul class="group-body">
            <li v-for="(item,index) in groupItem.items" :key="index">
                <ListItem
                iconname="dollar"
                :ltText="item.subTitle"
                :lcText="item.content"
                :lbText="item.createTime"
                :rtText="item.commission"
                :rbText="item.isSettle"
                >
                </ListItem>
                <!-- <div class="gb-left fixed-icon">
                    <icon  name="dollar"/>
                    <div class="textbox">
                        <p class="text">{{item.subTitle}}</p>
                        <p>{{item.content}}</p>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
                <div class="gb-right">
                  <p>{{item.commission}}</p>
                  <p class="status">{{item.isSettle}}</p>
                </div> -->
            </li>
        </ul>
    </div>
     <ListNoData
     desc="您还没有任何奖励"
     bgimg='bg3'
     v-show="list.length===0 && loaded"></ListNoData>
    <BottomNoData v-show="loaded && finished && list.length > 0"></BottomNoData>
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
import { getCommissionList } from '@/model/commissionModel';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import groupList from 'components/groupList.js';
import bgImg from '@/assets/no-data@2x.png';
import TopNav from 'components/TopNav';
import ListItem from 'components/ListItem';
export default {
  mixins: [groupList],
  data () {
    return {
      nodataImg: bgImg,
      showCalendar: false,
      currentDate: new Date(),
      list: [],
      finished: false,
      showFixed: true,
      loaded: false,
      hasMore: true,
      current: 1,
      // 上拉刷新
      topLoading: false,
      // 底部更多
      bottomLoading: false,
      filterTime: ''
    };
  },
  mounted () {
    window.addEventListener('scroll', this.scroll);
    this.current = 1;
    this.onLoad();
  },
  methods: {
    // back () {
    //   history.go(-1);
    // },
    add () {
      this.$go({
        name: 'AddressEdit'
      });
    },
    getList (params) {
      return getCommissionList(params);
    }
  },
  components: {NavBar, Popup, List, PullRefresh, BottomNoData, ListNoData, TopNav, Icon, DatetimePicker, ListItem}
};
</script>

<style  lang="less" scoped>
@import '~@/assets/color.less';
@import '~components/groupList.less';
.goldpool {
    font-size: .26rem;
    // padding-top: 46px;
    p{
      margin: 0;
    }

    .group {
        .group-body{
            font-size: 0.26rem;
            li {

                height: 1.5rem;
            }
        }
    }
}

</style>
