<template>
  <div class="coupon">
    <TopNav
    title="摩萄券"
    />
  <tabs v-model="active" >
    <tab :key="index" v-for="(item, index) in catetorys" :title="item.name+'(' + item.list.length + ')'">
      <template v-if="payStatu">
      <div class="announcement" @click="$go({name : 'CouponReceiving'})">
            <icon name="igift">&nbsp;赶紧去领券中心看看更多优惠券</icon>
      </div>
        <div class="quanheight">
           <div style="padding:0 0.4rem 0 0.6rem">
          <div class="quan" :class="{unvalidate: index === 1}" v-for="(itemVal,i) in item.list" :key="i">
            <CouponCard
            :cardStatus="0"
            :opertionType="3"
            :formData="itemVal"
            @selectClick="checkcoupon(i, itemVal.disable)"
            >
              <div @click.stop="checkcoupon(i)" class="coupon-check">
                <icon name="checked"  v-show="itemVal.disable===false&&itemVal.checked===true"/>
                <icon name="check" v-show="itemVal.disable===false&&itemVal.checked===false"/>
              </div>
              <Button
               v-if="index === 0"
                slot="btn-use"
                class="selectItem"
                :class="[itemVal.cardType === 1 ? 'purplecolor' : 'bluecolor']"
                >确认使用</Button>
            </CouponCard>
          </div>
           </div>
          <!-- <div class="notdata" v-show="item.list.length===0">
            <div class="null"></div>
            <div class="nottext">暂无可用优惠券</div>
          </div> -->
          <ListNoData
            desc="暂无可用优惠券~"
            bgimg='bg2'
            v-show="item.list.length===0 && item.loaded">
          </ListNoData>
        </div>
        <div class="lookoverbg">
          <div class="lookover" @click="showRule">查看优惠券使用规则<icon name="right"/></div>
        </div>
        <div class="bottomtext">
            <Button class="bottombtn" @click="setdiscount">确定</Button>
            <div class="bttext">已选用<span class="zi">{{bondQuantity}}</span>张，总抵扣<span class="zi">￥{{totalDeduction.toFixed(2)}}</span></div>
        </div>
      </template>
    <template v-else>
      <ListNoData
            :desc="`该订单处于${payStatusFormat}状态,无法操作~`"
            bgimg='bg2'
           >
      </ListNoData>
    </template>
    </tab>
  </tabs>

</div>
</template>
<script>
import { NavBar, Button, Popup, Tab, Tabs, Icon, Toast } from 'vant';
import CouponCard from 'views/Coupon/CardItem';
import { getAvailableList, getUnavailableList } from '@/model/coupon';
import { pendingOrder, getCouponDeduction } from '@/model/paymentModel';
import TopNav from 'components/TopNav';
import ListNoData from 'components/ListNoData';
import { mapMutations, mapState } from 'vuex';
export default {
  data () {
    return {
      active: 0,
      //   show: true,
      activeIndex: 0,
      orderId: this.$route.query.order_id,
      total: 0,
      payStatus: '',
      catetorys: [
        {
          name: '可用优惠券',
          value: 1,
          list: [

          ],
          current: 1,
          loaded: false
        },
        {
          name: '不可用优惠券',
          value: 2,
          list: [

          ],
          current: 1,
          loaded: false
        }
      ],
      // bondQuantity: '0',
      couponDeduction: 0,
      // total: 51.88,
      index: 0,
      cache: {},
      payStatusFormat: ''
      // couponSn: []
    };
  },
  computed: {
    // 总抵扣
    totalDeduction () {
      // return this.calDiscount(this.catetorys[0].list.filter(x => x.checked), this.total);
      return this.couponDeduction;
    },
    // 优惠券数量
    bondQuantity () {
      return this.catetorys[0].list.filter(x => x.checked).length;
    },
    payStatu () {
      if (this.payStatus === '11' || this.payStatus === '15') {
        return true;
      } else {
        return false;
      }
    },
    ...mapState('confirmOrder', ['selectedCouponItems'])
  },
  mounted () {
    this.loadData();
  },
  methods: {
    // 计算总抵扣
    // calDiscount (arr, total) {
    //   let cut = 0;
    //   if (arr.length > 0) {
    //     arr.forEach(x => {
    //       if (x.cardType === 2) {
    //         cut += total - total * x.discount / 10;
    //       }
    //       if (x.cardType === 1) {
    //         // console.log(x.discount, cut);
    //         cut += x.discount;
    //       }
    //     });
    //   } else {
    //     cut = 0;
    //   }
    //   // console.log(cut);
    //   if (cut <= total) {
    //     return cut.toFixed(2);
    //   } else {
    //     return total.toFixed(2);
    //   }
    // },
    showRule () {
      Toast({
        duration: 1500, // 持续展示 toast 1.5秒
        message: '该功能尚未开放'
      });
    },
    getCardStatus (tabVal) {
      if (tabVal === 1) {
        return 0;
      } else if (tabVal === 2) {
        return 1;
      }
    },
    // 获取总抵扣
    getDiscount (orderId, items, callback = () => {}) {
      let snStr = items.map(x => x.couponSn).join(',');
      if (this.cache[snStr]) {
        this.couponDeduction = this.cache[snStr].couponDeduction;
        callback();
      } else {
        getCouponDeduction({
          order_id: this.orderId,
          coupon_sn_str: snStr
        }).then(({
          success,
          data,
          msg
        }) => {
          if (success) {
            // return {
            this.couponDeduction = data.couponDeduction;
            this.cache[snStr] = data;
            callback();
            // this.remaining=data.remaining;
            // };
          } else if (msg) {
            Toast(msg);
          }
        });
      }
    },
    // 选择优惠券
    checkcoupon (index, disable = false) {
      // let items = this.catetorys[0].list.filter(x => x.checked);
      // console.log(items);
      if (!disable) {
        this.activeIndex = index;
        // if (items.length === 0) {
        this.catetorys[0].list.forEach((x, i) => {
          if (i === index) {
            // x.checked = true;
            x.checked = !x.checked;
          } else {
            x.checked = false;
          }
        });
        let items = this.catetorys[0].list.filter(x => x.checked);
        if (items.length) {
          this.getDiscount(this.orderId, items, () => this.setdiscount());
        } else {
          this.couponDeduction = 0;
        }
      // 还可能用到
      // } else if (items.length > 0) {
      // if (items[0].superposable === '1') {
      //   this.catetorys[0].list.forEach((x, i) => {
      //     if (i === index && x.superposable === '1') {
      //       x.checked = !x.checked;
      //     } else if (i === index && x.superposable === '0') {
      //       // x.checked = false;
      //       Toast({
      //         message: '已选中券只能与可叠加券一起使用',
      //         duration: 1500
      //       });
      //     }
      //   });
      // } else {
      //   this.catetorys[0].list.forEach((x, i) => {
      //     if (i === index) {
      //       if (x.checked === false) {
      //         Toast({
      //           message: '已选中券为不可叠加券',
      //           duration: 1500
      //         });
      //       }
      //       x.checked = false;
      //     }
      //   });
      // }
      // }
      }
    },
    setdiscount () {
      this.setCouponItems(this.catetorys[0].list.filter(x => x.checked));
      this.setTotalDiscount(this.totalDeduction);
      this.$go({ path: '/Payment',
        query: {
          order_id: this.orderId
        } });
    },
    item (item) {
      return {
        rangebox: item.rangebox,
        rangegoods: item.rangegoods,
        range: item.range,
        threshold: item.threshold, // 使用门槛
        couponType: item.couponType, // 券类型
        cardType: item.cardType,
        discount: item.discount, // 卷面价值0
        descriptions: item.descriptions, // 使用说明
        validityPeriod: item.validityPeriod, //
        // superposable: item.superposable, // 是否可叠加
        showSuperposable: item.showSuperposable, // 是否显示可叠加
        couponId: item.couponId,
        couponSn: item.couponSn
      };
    },
    loadData () {
      this.$showSpin();
      // 可用
      getAvailableList(this.orderId).then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          this.catetorys[0].list = data.map(x => {
            return {
              ...this.item(x),
              superposable: x.superposable, // 可叠加标识，有这个字段且为真时显示（可叠加）字样
              disable: false,
              checked: false
            };
          });
          this.catetorys[0].current++;
          this.catetorys[0].loaded = true;
          // 加载已选中
          if (this.selectedCouponItems.length > 0) {
            this.catetorys[0].list.map(x => {
              if (this.selectedCouponItems.some(g => g.couponSn === x.couponSn)) {
                x.checked = true;
              }
            });
            this.getDiscount(this.orderId, this.selectedCouponItems);
          }
        } else if (msg) {
          Toast(msg);
        }
        this.$hideSpin();
      });
      // 不可用
      getUnavailableList(this.orderId).then(({
        success,
        data,
        msg
      }) => {
        if (success) {
          this.catetorys[1].list = data.map(x => {
            return {
              ...this.item(x),
              disable: true
            };
          });
          this.catetorys[1].current++;
          this.catetorys[1].loaded = true;
        } else if (msg) {
          Toast(msg);
        }
      });
      pendingOrder(this.$route.query.order_id).then(result => {
        if (result.success) {
          let data = result.data;
          this.total = data.total;
          this.payStatus = data.payStatus;// 支付状态
          this.payStatusFormat = data.payStatusFormat;// 支付状态
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      });
    },
    ...mapMutations('confirmOrder', ['setCouponItems', 'setTotalDiscount'])
  },
  components: { NavBar, Button, Popup, Tab, Tabs, CouponCard, TopNav, Icon, Toast, ListNoData }
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
    .zi{
        color:@primaryColor;
    }
    .announcement{
        color: @primaryColor;
        font-size: 0.24rem;
        line-height: .7rem;
        border: 0.01rem solid @primaryColor;
        margin: 0.3rem auto 0;
        text-align: center;
        width: 6.5rem;
    }
    .quanheight{
      // margin-top:-0.2rem;
      // padding-top: 0.3rem;
      // position:fixed;
      padding-bottom:2rem;
      // padding-top: 0.5rem;
      height:100%;
      box-sizing:border-box;
      overflow: auto;
    .quan{
      // padding-left: 0.3rem;
        // .check{
        //     float: left;
        //     font-size: 0.3rem;
        //     line-height: 3rem;
        //     // margin-right: 0.1rem;
        //     margin-left: 0.3rem;
        // }
        .van-tabs {
          z-index: 1;
        }
        .van-icon-checked{
          color: @primaryColor;
        }
        .van-icon-checked,.van-icon-check{
          // margin-top: 0.2rem;
          float: left;
          font-size: 0.3rem;
          line-height: 3rem;
          margin-left: 0.3rem;
        }
        .coupon-check {
          display:flex;
          justify-content: centter;
          align-items:center;
          position: absolute;
          left: -0.7rem;
          top: 0;
          bottom: 0;
        }
    }
    .unvalidate {
      .coupon-card {
        opacity: 0.5;
      }
    }

    }
    .lookoverbg{
      position: fixed;
      bottom:0.98rem;
      width:100%;
      height:0.8rem;
      // text-align:center;
      display: flex;
      justify-content: center;
      align-items: center;
      // z-index:1;
      // background:red;
      background:#F1F1F1;
      .lookover{
        // position: absolute;
        // top: 0.1rem;
        // bottom:0.1rem;
        // left: 2.3rem;
        color:@primaryColor;
        border:0.02rem solid @primaryColor;
        border-radius: 0.23rem;
        font-size: 0.24rem;
        width:2.9rem;
        line-height: 0.5rem;
        text-align: center;
        // z-index:1;
        // margin:0 auto;
      }
    }

    .bottomtext{
        // z-index: -1;
        background: #fff;
        position: fixed;
        bottom: 0;
        // right:0;
        // left:0;
        width: 100%;
        height: 0.98rem;
        // border-top: 0.01rem solid #000000;
        // box-shadow: 0 0 0.1rem #cccccc;
        .bttext{
            float: left;
            font-size: 0.28rem;
            line-height: 0.98rem;
            margin-left: 0.6rem;
        }
        .bottombtn{
            margin-left: 0.32rem;
            width: 2.2rem;
            height: 100%;
            float: right;
            font-size: 0.34rem;
            color: #fff;
            background: @primaryColor;
            border: none;
            border-radius: 0;
        }

    }
}

</style>
