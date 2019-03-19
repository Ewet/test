<template>
<div class="detail">
<TopNav
     title="提现明细"
    />
<div class="calendar-wrap"><icon  name="calendar" class="van-cell__right-icon"  @click="showCalendar = true"/></div>
  <div v-show="showFixed" class="group" >
        <header
        v-show="item.fixed"
        v-for="(item,i) in list" :key="i"
        class="group-header gh"
        >
            <h3>{{item.name}}</h3>
            <span>收入￥{{item.total}}</span></header>
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
            <span>收入￥{{groupItem.total}}</span>
            </header>
        <ul class="group-body fixed-icon">
            <li v-for="(item,index) in groupItem.items" :key="index">
                <ListItem
                iconname="money"
                :ltText="item.withdrawType"
                :lcText= "`[到${item.modeFormatted}]`"
                :lbText="item.createTime"
                :rtText="item.amount"
                :rbText="item.statusFormatted"
                >
                </ListItem>
                <!-- <div>
                    <icon  name="money"/><p>{{item.withdrawType}}-到{{item.modeFormatted}}</p>
                    <span>{{item.createTime}}</span>
                </div>
                <div><span class="bold">{{item.amount}}</span><br/>
                <span class="status">{{item.statusFormatted}}</span>
                </div> -->
            </li>
        </ul>
    </div>
    <ListNoData
     desc="暂无提现记录，马上去提一笔吧"
     bgimg='0'
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
import bgImg from '@/assets/no-data@2x.png';
import { getList } from '@/model/WithdrawDetailModel';
import BottomNoData from 'components/BottomNoData';
import ListNoData from 'components/ListNoData';
import groupList from 'components/groupList.js';
import TopNav from 'components/TopNav';
import ListItem from 'components/ListItem';
export default {
  mixins: [groupList],
  data () {
    return {
    //   showCalendaricon: true,
      showCalendar: false,
      currentDate: new Date(),
      list: [],
      finished: false,
      showFixed: true,
      nodataImg: bgImg,
      loaded: false,
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
    this.onLoad();
  },
  methods: {
    // back () {
    //   this.$router.back();
    // },
    getList (params) {
      return getList(params);
    }
  },
  components: {NavBar, Popup, List, PullRefresh, BottomNoData, ListNoData, TopNav, Icon, DatetimePicker, ListItem}
};
</script>

<style  lang="less" scoped>
@import '~@/assets/color.less';
@import '~components/groupList.less';
.detail {
    font-size: .26rem;
    // padding-top: 46px;
    p{
        margin: 0;
    }
    .calendar-wrap {
    //     color: #000;
    //     position: fixed;
    //     right: 0.4rem;
    //     top: 47px;
    //     font-size: 0.42rem;
    //     z-index: 99;
        height: 0.8rem;
    //     width: 0.5rem;
    //     display: flex;
    //     align-items: center;
    //     .van-icon-calendar {
    //         color: #000;
    //         font-size: 0.42rem;
    //         // margin-top: -0.1rem;
    //         // position: absolute;
    //         // left: 0;
    //         // top:0;
    //         // bottom:0;
    //         // // top: 50%;
    //         // right: 0;
    //         // transform: translateY(-62%);
    //     }
    }
    // .van-icon-calendar {
    //     color: #000;
    //     position: fixed;
    //     right: 0.4rem;
    //     top: 1.1rem;
    //     font-size: 0.42rem;
    //     z-index: 99
    // }
    .group {
        // .group-header {
        //     transform: translateZ(0);
        //     z-index: 2;
        //     padding: 0.13rem 0.4rem;
        //     width: 100%;
        //     box-sizing: border-box;
        //     background-color: #efeff4;
        //     height: 1rem;
        //     h3 {
        //         margin: 0;
        //         font-size: .3rem;
        //     }
        //     span {
        //         font-size: 0.22rem;
        //         color: #aaa;
        //     }
        //     // .van-icon {
        //     //     position: absolute;
        //     //     right: 0.4rem;
        //     //     top: 0.5rem;
        //     //     font-size: 0.42rem;
        //     //     color: #000000;
        //     // }
        // }
        // .gh{
        //     position:fixed;
        //     top:46px;
        //     left:0;
        //     right:0;
        //     z-index:2;
        // }
        .group-body{
            font-size: 0.26rem;
            li {
                height: 1.5rem;
            //     display: flex;
            //     justify-content: space-between;
            //     padding: 0.23rem 0.25rem;
            //     margin-bottom: 0.02rem;
            //     height: 1.3rem;
            //     box-sizing: border-box;
            //     background: #fff;
            //     .bold{
            //         font-weight: bold;
            //     }
            //     .status{
            //           font-size:0.24rem;
            //           color:@primaryColor;
            //         }
            //     div:nth-child(1) {
            //         flex:1;
            //         p {
            //             font-size: .3rem;
            //             line-height: 0.55rem;
            //         }
            //         span {
            //             color:#aaa;
            //             font-size:0.24rem;
            //         }
            //         .van-icon-money {
            //             float: left;
            //             margin-right: 0.25rem;
            //             color: @primaryColor;
            //             font-size: 0.87rem;
            //         }
            //     }
            //     div:nth-child(2) {
            //         text-align: center;
            //         line-height: .4rem;
            //     }
            }
        }
    }
}

</style>
