<template>
  <div class="coupon">
    <TopNav
    title="我的优惠券"
    />
  <tabs v-model="active" >
    <tab :key="index" v-for="(item, index) in catetorys" :title="item.name">
        <!-- <div class="announcement" @click="showCard=true"> -->
        <div class="announcement" @click="$go({name : 'CouponReceiving'})">
            <icon name="igift">&nbsp;赶紧去领券中心看看更多优惠券</icon>
        </div>
         <div style="padding:0 0.4rem">
        <CouponCard @receiveCoupon="receiveCoupon" :cardStatus="getCardStatus(item.value)" :opertionType="getOperationType(item.value)" :formData="itemVal"  v-for="(itemVal,i) in item.list" :key="i"></CouponCard>
        <!-- <div class="notdata" v-show="item.list.length===0">
          <div class="null"></div>
          <div class="nottext">您还没有优惠券~</div>
        </div> -->
         </div>
        <ListNoData
            desc="您还没有优惠券~"
            bgimg='bg2'
            v-show="item.list.length===0 && item.loaded">
        </ListNoData>
    </tab>
  </tabs>
  <PopupCard v-model="showCard" :formData="formData"/>
</div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs, Icon, Toast } from 'vant';
import { getMyUnusedList, getMyUsedList, getMyExpiredList } from '@/model/coupon';
import CouponCard from 'views/Coupon/CardItem';
import PopupCard from 'views/Coupon/PopupCard';
import TopNav from 'components/TopNav';
import ListNoData from 'components/ListNoData';
export default {
  data () {
    return {
      active: 0,
      //   show: true,
      catetorys: [
        {
          name: '未使用',
          value: 1,

          list: [],
          current: 1,
          loaded: false
        },
        {
          name: '已使用',
          value: 2,
          list: [],
          current: 1,
          loaded: false
        },
        {
          name: '已过期',
          value: 3,

          list: [],
          current: 1,
          loaded: false
        }
      ],
      showCard: false,
      formData: {}
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    getOperationType (tabVal) {
      if (tabVal === 1) {
        return 2;
      } else {
        return 3;
      }
    },
    getCardStatus (tabVal) {
      if (tabVal === 1) {
        return 0;
      } else if (tabVal === 2) {
        return 2;
      } else if (tabVal === 3) {
        return 1;
      }
    },
    receiveCoupon (formData) {
      this.formData = formData;
      this.showCard = true;
    },
    item (item) {
      return {
        range: item.range,
        rangebox: item.rangebox,
        rangegoods: item.rangegoods,
        threshold: item.threshold, // 使用门槛
        couponType: item.couponType, // 券类型
        cardType: item.cardType,
        discount: item.discount, // 劵面价值
        descriptions: item.descriptions, // 使用说明
        validityPeriod: item.validityPeriod, //
        couponId: item.couponId,
        couponSn: item.couponSn
      };
    },
    loadData () {
      this.getUnused();
      // setTimeout(() => {
      this.getUsed();
      // }, 2000);
      // setTimeout(() => {
      this.getExpired();
      // }, 2000);
    },

    getUnused () {
      // 未使用
      this.$showSpin();
      getMyUnusedList().then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          if (this.catetorys[0].current === 1) {
            this.catetorys[0].list = data.items.map(x => {
              return {
                ...this.item(x),
                used: false,
                expired: false
              };
            });
          } else {
            this.catetorys[0].list = this.catetorys[0].list.concat(data.items.map(x => {
              return this.item(x);
            }));
          }
          this.catetorys[0].current++;
          this.catetorys[0].loaded = true;
        } else if (msg) {
          Toast(msg);
        }
        this.$hideSpin();
      });
    },
    getUsed () {
      // 已使用
      getMyUsedList().then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          this.catetorys[1].list = data.items.map(x => {
            return {
              ...this.item(x),
              used: true,
              expired: false
            };
          });
          this.catetorys[1].loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    },
    getExpired () {
      // 已过期
      getMyExpiredList().then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          this.catetorys[2].list = data.items.map(x => {
            return {
              ...this.item(x),
              // used: false,
              expired: true
            };
          });
          this.catetorys[2].current++;
          this.catetorys[2].loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    }
  },
  components: { NavBar,
    Button,
    Popup,
    Tab,
    Tabs,
    CouponCard,
    TopNav,
    Icon,
    PopupCard,
    ListNoData }
};
</script>
<style  lang="less">
@import '~@/assets/color.less';
.coupon {
  .van-tabs__wrap {
    position: fixed;
    top:46px;
  }
}
</style>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.coupon {
    .announcement{
        color: @primaryColor;
        font-size: 0.24rem;
        line-height: .7rem;
        border: 0.01rem solid @primaryColor;
        margin: 0.3rem auto 0;
        text-align: center;
        width: 6.5rem;
    }

}

</style>
