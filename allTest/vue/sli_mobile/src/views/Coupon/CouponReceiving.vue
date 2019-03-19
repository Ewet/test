<template>
  <div class="coupon">
    <TopNav
    title="优惠券领取中心"
    />
  <tabs v-model="active" >
    <tab :key="index" v-for="(item, index) in catetorys" :title="item.name">
        <div style="padding:0 0.4rem">
          <CouponCard
          :opertionType="1"
          :formData="itemVal"
          v-for="(itemVal,i) in item.list"
          :key="i"
          @receiveCoupon="receiveCoupon"
          ></CouponCard>
          <ListNoData
            desc="暂无可领取优惠券~"
            bgimg='bg2'
            v-show="item.list.length===0 && item.loaded"></ListNoData>
        </div>
    </tab>
  </tabs>
<PopupCard v-model="showCard" :formData="formData"/>
</div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs, Toast } from 'vant';
import { getFullReductionList, getDiscountList, getAllList } from '@/model/coupon';
import PopupCard from 'views/Coupon/PopupCard';
import CouponCard from 'views/Coupon/CardItem';
import TopNav from 'components/TopNav';
import ListNoData from 'components/ListNoData';
export default {
  data () {
    return {
      active: 0,
      //   show: true,
      ismine: false,
      catetorys: [
        {
          name: '全部优惠券',
          value: '',
          list: [
          ],
          current: 1,
          loaded: false
        },
        {
          name: '满减券',
          value: 1,
          list: [
          ],
          current: 1,
          loaded: false
        },
        {
          name: '打折券',
          value: 2,
          list: [
          ],
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
    setTimeout(() => {

    }, 2000);
  },
  methods: {
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
        validityPeriod: item.validityPeriod, // 0
        couponId: item.couponId,
        couponSn: item.couponSn
      };
    },
    loadData () {
      this.getAll();
      // setTimeout(() => {
      this.getDiscount();
      // }, 2000);
      // setTimeout(() => {
      this.getReduction();
      // }, 2000);
    },
    getAll () {
      // 全部
      this.$showSpin();
      getAllList().then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          if (this.catetorys[0].current === 1) {
            this.catetorys[0].list = data.items.map(x => {
              return this.item(x);
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
    getDiscount () {
      // 折扣
      getDiscountList().then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          if (this.catetorys[2].current === 1) {
            this.catetorys[2].list = data.items.map(x => {
              return this.item(x);
            });
          } else {
            this.catetorys[2].list = this.catetorys[2].list.concat(data.items.map(x => {
              return this.item(x);
            }));
          }
          this.catetorys[2].current++;
          this.catetorys[2].loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    },
    getReduction () {
      // 满减
      getFullReductionList().then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          if (this.catetorys[1].current === 1) {
            this.catetorys[1].list = data.items.map(x => {
              return this.item(x);
            });
          } else {
            this.catetorys[1].list = this.catetorys[1].list.concat(data.items.map(x => {
              return this.item(x);
            }));
          }
          this.catetorys[1].current++;
          this.catetorys[1].loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
    }
  },
  components: { NavBar, Button, Popup, Tab, Tabs, CouponCard, TopNav, PopupCard, ListNoData }
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
