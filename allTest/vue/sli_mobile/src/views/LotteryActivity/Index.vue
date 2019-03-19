<template>
    <StructPage bgImg="lottery-bg">
        <Header
            title=""
            slot="header"
            :transparentBar="true"
            :back="handleMyPrize"
            :needBack="false"
        >
          <span slot="left" class="top-nav-btn">我的礼品</span>
          <span  slot="right" class="top-nav-btn" @click="handleViewRule">抽奖规则</span>
        </Header>
        <div slot="content" class='lotteryContainer'>
            <h3>
              <img src="./images/logo@2x.png" alt="" style="width:1.45rem;display:inline-block;">
            </h3>
            <div class='worldPic'>
              <img src="./images/lottery-world.png"/>
            </div>
            <div class='content'>
              <div class=world>
                <p>你还有<span style="font-size:0.99rem;padding: 0 0.2rem;">{{opportunities}}</span>次抽奖机会</p>
                <p>请尽快进行抽奖</p>
                <p style="font-size:0.3rem">活动还有<span>{{day}}天{{hour}}小时{{minute}}分{{second}}秒</span>结束</p> <!--{{second}}秒-->
              </div>
            </div>
            <a class='clickLottery' @click="getResult">
              抽奖
            </a>
            <a class="view-activity-price" @click="getPrice">查看本次活动奖品>>></a>
            <!-- 中奖结果 -->
            <Popup v-model="show">
              <WinningResult :prizeData='result'></WinningResult>
            </Popup>
            <!-- 规则 -->
            <LotteryRule :text="description"  v-model="showRule"></LotteryRule>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import { NavBar, Popup, Dialog, Toast } from 'vant';
import WinningResult from './WinningResult';
import LotteryRule from './LotteryRule';
import { debounce } from 'lodash';
import getUrl from 'utils/link';
import {
  getO2Code,
  getOpenid,
  getLotteryNum,
  getOpportunities,
  getLotteryResult,
  getAgentLotteryResult
} from '@/model/lotteryActivity';
export default {
  data () {
    return {
      result: '',
      show: false,
      showRule: false,
      userType: this.$route.query.user_type,
      activityId: this.$route.query.activity_id,
      code: this.$route.query.code,
      opportunities: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      description: ''
    };
  },
  created () {
    this.$Bus.$on('closeWinningResult', this.closeWinningResult);
    this.$Bus.$on('closeWinningRule', this.closeWinningRule);
    this.getResult = debounce(this.getResult, 500);
  },
  beforeDestroy () {
    this.$Bus.$off('closeWinningResult', this.closeWinningResult);
    this.$Bus.$off('closeWinningRule', this.closeWinningRule);
  },
  mounted () {
    if (this.code) {
      this.haveCode();
    } else {
      this.getLotteryMessage();
    }
  },
  methods: {
    // 秒数的转换
    formatSeconds (value) {
      var secondTime = parseInt(value);// 秒
      var minuteTime = 0;// 分
      var hourTime = 0;// 小时
      var dayTime = 0;// 天
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60);
          minuteTime = parseInt(minuteTime % 60);
          if (hourTime > 24) {
            dayTime = parseInt(hourTime / 24);
            hourTime = parseInt(hourTime % 24);
          }
        }
      }
      var result = {
        day: dayTime,
        hour: hourTime,
        minute: minuteTime,
        second: secondTime
      };
      return result;
    },
    // 倒计时
    countDown (secondTimes) {
      // let testTime = '1545148';
      let date = this.formatSeconds(secondTimes);
      this.day = date.day;
      this.hour = date.hour;
      this.minute = date.minute;
      let day = parseInt(date.day);
      let hour = parseInt(date.hour);
      let minute = parseInt(date.minute);
      let second = parseInt(date.second);
      var timer = setInterval(() => {
        if (second > 0) {
          second--;
          this.second = second;
        } else if (minute > 0) {
          second = 59;
          minute--;
          this.minute = minute;
          this.second = second;
        } else if (hour > 0) {
          second = 59;
          minute = 59;
          hour--;
          this.second = second;
          this.minute = minute;
          this.hour = hour;
        } else if (day > 0) {
          second = 59;
          minute = 59;
          hour = 23;
          day--;
          this.second = second;
          this.minute = minute;
          this.hour = hour;
          this.day = day;
        } else if (day <= 0) {
          clearInterval(timer);
          this.day = 0;
          this.hour = 0;
          this.minute = 0;
          this.second = 0;
          Dialog.alert({
            content: '活动已结束'
          });
        }
      }, 1000);
    },
    async getLotteryMessage () {
      let { success, data, msg } = await getLotteryNum({
        activityId: this.activityId,
        userType: this.userType
      });
      if (this.userType === '1') {
        if (success) {
          // originer
          if (data.hasOpenId) {
          // 有openid
          // 给页面赋值
            this.opportunities = data.opportunities;
            this.description = data.rule;
            let time = new Date().getTime() / 1000;
            let real = data.endTime - time;
            if (real > 0) {
            // daojishi
              this.countDown(real);
            } else {
            // end
              Dialog.alert({
                message: '活动已结束'
              });
            }
          } else {
            // 没有openid
            this.loadData();
          }
        } else {
          Dialog.alert({
            message: msg
          });
        }
      } else {
        // agent
        if (success) {
          // 给页面赋值
          this.opportunities = data.opportunities;
          this.description = data.rule;
          let time = new Date().getTime() / 1000;
          let real = data.endTime - time;
          if (real > 0) {
          // daojishi
            this.countDown(real);
          } else {
          // end
            Dialog.alert({
              message: '活动已结束'
            });
          }
        } else {
          Dialog.alert({
            message: msg
          });
        }
      }
    },
    async haveCode () {
      let { success, msg } = await this.fetchOpenId();
      if (success) {
        // 重定向
        let stateStr = this.$route.query.state;
        let stateArr = stateStr.split(',');
        let url = getUrl('lottery', {
          user_type: stateArr[0],
          activity_id: stateArr[1]
        });
        location.replace(url);
      } else {
        Dialog.alert({
          message: msg
        });
      }
    },
    async loadData () {
      let { success, msg, data } = await this.fetchCode();
      if (success) {
        location.href = data;
      } else {
        Dialog.alert({
          message: msg
        });
      }
    },
    async fetchOpenId  () {
      return getOpenid(this.code);
    },
    async fetchCode  () {
      return getO2Code({
        callback: location.href,
        state: this.userType + ',' + this.activityId
      });
    },
    async fetchInfo  () {
      let stateStr = this.$route.query.state;
      let stateArr = stateStr.split(',');
      this.userType = stateArr[0];
      this.activityId = stateArr[1];
      return getOpportunities(this.activityId);
    },
    handleMyPrize () {
      this.$go({
        name: 'MyPrize'
      });
    },
    handleViewRule () {
      this.showRule = true;
    },
    // 抽奖按钮
    async getResult () {
      if (this.opportunities === 0) {
        Dialog.alert({
          message: '您的抽奖机会已用完！'
        });
      } else {
        let toast = Toast.loading({
          mask: true,
          message: '加载中...'
        });
        if (this.userType === '1') {
          // originer
          let { success, data, msg } = await getLotteryResult(this.activityId);
          if (success) {
            if (this.opportunities > 0) {
              this.opportunities = data.opportunities !== undefined ? data.opportunities : this.opportunities - 1;
            };
            this.result = data;
            this.show = true;
            this.$nextTick(() => {
              toast.clear();
            });
          } else {
            toast.clear();
            Dialog.alert({
              message: '抽取奖品失败！' + msg
            });
          }
          toast.clear();
        } else if (this.userType === '2') {
          // 代购员
          let { success, data, msg } = await getAgentLotteryResult(this.activityId);
          if (success) {
            this.opportunities = data.opportunities;
            this.result = data;
            this.show = true;
            this.$nextTick(() => {
              toast.clear();
            });
          } else {
            toast.clear();
            Dialog.alert({
              message: '获取奖品失败！' + msg
            });
          }
        }
      }
    },
    closeWinningResult () {
      this.show = false;
    },
    closeWinningRule () {
      this.showRule = false;
    },
    getPrice () {
      this.$go({
        name: 'LotteryPrize',
        query: {
          activity_id: this.activityId
        }
      });
    }
  },
  components: {
    StructPage,
    NavBar,
    Header,
    Popup,
    WinningResult,
    LotteryRule,
    Toast
  }
};
</script>
<style lang="less" scoped>
.van-popup{
  background-color: transparent;
  overflow-y: visible;
}
</style>
<style lang="less" >
// .van-popup{
//   background-color: transparent;
//   overflow-y: visible;
// }
.top-nav-btn {
    display: inline-block;
    color: #fff;
    width:1.66rem;
    // height:0.53rem;
    border:1px solid rgba(255,255,255,1);
    border-radius:0.1rem;
    font-size: 0.3rem;
    line-height: 0.53rem;
    text-align: center;
}
.lotteryContainer {
  text-align: center;
  position: relative;
  p{
    margin: 0;
  }
  h3{
    margin: 0;
    font-size: .55rem;
    color: #FEFEFE;
    line-height: .9rem;
    letter-spacing: 0.08rem;
    font-weight: normal;
  }
  .worldPic{
    width: 5.58rem;
    margin: .60rem auto .76rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .content{
    width: 6.35rem;
    height: 3.7rem;
    margin: 0 auto;
    background: url(./images/light.png) no-repeat;
    background-size: 100% 100%;
    .world{
      padding-top: 1rem;
      p{
        font-size:.34rem;
        color:#626262;
        line-height: .50rem;
      }
      p:nth-child(3){
        margin-top: 0.20rem;
      }
      span{
        color: #AA32FF;
      }
    }
  }
  // .loading{
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   padding: .6rem;
  // }
  .clickLottery{
    display: inline-block;
    width:5rem;
    margin-top: .68rem;
    background: url(./images/big-button.png) no-repeat;
    background-size: 100% 100%;
    font-size:.72rem;
    color:#985301;
    line-height: 1.38rem;
    font-weight: bold;
    &:active{
      margin-top: 0.8rem;
    }
  }
  .view-activity-price {
    display: inline-block;
    font-size:.26rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.33rem;
    opacity:0.78;
  }
}
</style>
