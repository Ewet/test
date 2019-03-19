<template>
   <div class="payment">
      <div class="payment-header">
          <Header
            title="确认订单"
          />
      </div>
      <template v-if="payStatu">
      <div class="payment-content">
        <div class="ol-item mt20">
                <Panel>
                    <div slot="header" class="ol-item-h van-hairline--bottom">
                        <p>{{storename}}</p>
                    </div>
                    <div class="ol-item-body">
                            <div class="desc van-hairline--bottom" v-for="(goodsitem, goodsIndex) in goods" :key="goodsIndex">
                                <img v-lazy="goodsitem.goodsImage"  alt="">
                                <div>
                                    <p class="goodsname van-ellipsis">{{goodsitem.goodsName}}</p>
                                    <p class="message">
                                        <span>编号：{{goodsitem.num}}</span><br/>
                                        <!-- <span>规格：2014 750ml</span> -->
                                    </p>
                                </div>
                                <p class="price">
                                    <span class="bold zi">￥{{goodsitem.price}}</span><br/><span>x{{goodsitem.quanity}}</span>
                                </p>
                            </div>
                    </div>
                    <div class="tips-wrap">
                        <icon class="tips zi" name="tips" @click="show=true"> 价格说明</icon>
                    </div>

                </Panel>
        </div>
        <p v-show="isLogined" class="coupontips">*注：<span>选择对应的</span>摩萄券<span>可减免一定的</span>金额。</p>
        <cell-group v-show="isLogined ">
            <cell title="摩萄券"  is-link @click="goselect">
                <span slot="right-icon" v-if="selectedCouponItems.length===0 && !isLock && !iscut">请选择优惠券<icon v-show="isable" name="arrow" class="jt"/></span>
                <span slot="right-icon" v-else>已选择<span class="zi">{{selectedCouponItems.length}}</span>张 <icon v-show="isable" name="arrow" class="jt"/></span>
            </cell>
            <!-- <cell id="creditWrap" @click="showtips">
                <field slot="title"
                label="积分抵现:"
                v-model="integral"
                type="number"
                :placeholder="placeholder"
                :disabled="!isable"
                @blur="checkintegral(integral, totalintegral, totalTwo)"
                @focus="creditFocus"
                >
                <Button
                slot="button"
                class="right-btn zi"
                size="small"
                @click="checkintegral(totalintegral, totalintegral, totalTwo)"
                v-show="isable"
                >全部抵现</Button>
                </field>
            </cell> -->
             <cell v-if="randomDeduction>0 && !isFree" title="随机减" :value="`立减${randomDeduction}元`">
            </cell>
             <cell v-if="isFree" title="免单" value="全额减免">
            </cell>
        </cell-group>
      </div>

      <div class="payment-footer">
        <!-- <div class="motao">Motao<img :src="motao" alt=""/></div> -->
        <div class="bottomtext">
          <!-- <p>底部文字</p> -->
            <Button class="bottombtn" @click="check" :loading="btnLoading">结算</Button>
            <div class="bttext"><span>共<span class="zi">{{totalquantity}}</span>件商品 &nbsp;&nbsp;&nbsp;</span> 总计：<span class="zi">￥{{actualTotal.toFixed(2)}}</span></div>
        </div>
      </div>
      </template>
       <template v-else>
      <ListNoData
            :desc="`该订单处于${payStatusFormat}状态,无法操作~`"
            bgimg='bg2'
           >
        </ListNoData>
        </template>
    <popup class="popup" v-model="show" :overlay="true">
        <div class="description">
            <img src="./images/motaox@2x.png" alt="">
            <div class="ptop">价格说明</div>
            <div class="ptext">因可能存在系统缓存、页面更新导致价格 变动异常等不确定性情况出现，商品售价 以本结算页商品价格为准；<br/>如有疑问，请您立即联系销售商咨询</div>
            <Button size="small" class="pbtn" @click="show=false"> 我知道了 </Button>
        </div>
    </popup>
    <popup class="freepopup" v-model="showfree" :overlay="true" :close-on-click-overlay="false">
        <div v-if="!isFree" class="jianmian">
          <div class="mj">随机减</div>
          <div>减免{{randomDeduction}}元</div>
        </div>
        <div v-if="isFree" class="free">
        </div>
        <icon @click="close" name="close"/>
    </popup>
</div>
</template>
<script>
import { Cell, CellGroup, Icon, NavBar, Panel, Toast, Popup, Dialog, Button, Field } from 'vant';
import { pendingOrder, getInformation, lockOrder } from '@/model/paymentModel';
import { getAvailableList } from '@/model/coupon';
import { authLogin } from '@/utils/jump';
import TopNav from 'components/TopNav';
import motao from './images/motao@2x.png';
import motaox from './images/motaox@2x.png';
import { mapState, mapMutations } from 'vuex';
import debounce from 'lodash.debounce';
import ListNoData from 'components/ListNoData';
import Header from 'components/Header';
export default {
  data () {
    return {

      isLock: false,
      orderType: '',
      storename: '',
      goods: [],
      integral: '',
      totalintegral: 0,
      creditToMoney: 1,
      show: false,
      motao: motao,
      motaox: motaox,
      totalquantity: 0,
      total: 0, // 订单商品金额
      realReceive: 0, // 实收（锁定）
      willReceive: 0, // 应收（未锁定）
      actualTotal: 0,
      couponDeduction: 0, // 优惠券抵扣金额
      pointsDeduction: 0, // 积分抵扣金额
      pointsUse: 0, // 使用积分数量
      isLogined: false,
      btnLoading: false,
      payStatus: '',
      payStatusFormat: '',
      orderUserId: '',
      localUserId: '',
      hasCoupon: false, // 是否有可用优惠券
      hasCouponTips: false, // 是否提示过去使用优惠券
      // 锁定订单接口
      showfree: false,
      isNeedPay: true,
      isFree: false,
      randomDeduction: 0,
      iscut: false // 是否已经随机立减

    };
  },
  components: {
    Cell,
    CellGroup,
    Icon,
    NavBar,
    TopNav,
    Panel,
    Toast,
    Popup,
    Dialog,
    Button,
    Field,
    ListNoData,
    Header
  },
  computed: {
    placeholder () {
      return '当前有' + this.totalintegral + '积分';
    },
    totalTwo () {
      return this.willReceive - this.totalDiscount;
    },
    // 是否可操作
    isable () {
      return (!this.isLock && this.orderUserId === '-1' && !this.iscut) || (!this.isLock && this.orderUserId === this.localUserId && !this.iscut);
    },
    payStatu () {
      if (this.payStatus === '11' || this.payStatus === '15') {
        return true;
      } else {
        return false;
      }
    },
    ...mapState('confirmOrder', ['selectedCouponItems', 'totalDiscount'])
  },
  created () {
    this.check = debounce(this.check, 300);
  },
  methods: {
    close () {
      this.showfree = false;
      if (this.isFree) {
        this.$go({
          name: 'PaySuccess'
        });
      }
    },
    creditFocus (event) {
      setTimeout(() => {
        let pannel = document.getElementById('creditWrap');
        pannel.scrollIntoView(false);
        pannel.scrollIntoViewIfNeeded();
      }, 1000);
    },
    // 积分处理
    checkintegral (integral, totalintegral, t) {
      let ib = integral * this.creditToMoney;// 暂定比例1积分=1元
      let ti = totalintegral * this.creditToMoney;
      // 积分->ib、总积分->ti、结算价格->t
      if (ib >= ti) {
        if (ib >= t) {
          if (ti >= t) {
            ib = t;// 1.11、积分>总积分>结算金额
          } else if (ti < t) {
            ib = ti;// 1.12、积分>结算金额>总积分
          }
        } else if (ib < t) {
          ib = ti;// 1.2、结算金额>积分>总积分
        }
      } else if (ib < ti) {
        if (ib >= t) {
          ib = t;// 2.1、总积分>积分>结算金额
          // } else if (ib < t) {
          //   ib = ib;// 2.2、总积分>结算金额>积分
        }
      }
      this.integral = Math.floor(ib / this.creditToMoney);
      this.actualTotal = this.totalTwo - this.integral * this.creditToMoney;// 实际支付为原价（使用优惠券）-使用积分*比例
    },
    loadData () {
      let orderId = this.$route.query.order_id;
      let orderHandle = result => {
        if (result.success) {
          let data = result.data;
          this.isLock = data.isLock;
          this.orderType = data.orderType;
          // this.payStatus = '12';// 支付状态
          this.payStatus = data.payStatus;// 支付状态
          this.payStatusFormat = data.payStatusFormat;// 支付状态
          this.storename = data.storename;
          this.goods = data.goods;
          this.totalquantity = data.totalquantity;
          this.total = data.total;// 订单商品金额
          this.realReceive = data.realReceive;// 实收金额
          this.willReceive = data.willReceive;// 应收金额
          this.orderUserId = data.orderUserId;// 订单user_id
          // this.actualTotal = data.total;
          this.actualTotal = this.willReceive - this.totalDiscount;
          // this.actualTotal = this.total - this.totalDiscount;
          // this.couponDeduction = data.couponDeduction; // 优惠券抵扣金额
          // this.pointsDeduction = data.pointsDeduction; // 积分抵扣金额
          this.pointsUse = data.pointsUse;// 使用积分数量
          this.randomDeduction = data.randomDeduction; // 随机立减金额

          if (this.isLock) {
            this.integral = data.pointsUse;
            this.actualTotal = data.realReceive;
            // this.actualTotal = data.total - data.couponDeduction - data.pointsDeduction;
            this.setCouponItems(data.coupons);
          }
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      };
      let infoHandle = result => {
        if (result.success) {
          let data = result.data;
          if (data.isLogined === false) {
          // this.loginshow = true;
            Dialog.confirm({
              title: '提示',
              message: '登陆会有更多优惠，是否去登陆?',
              className: 'sl-dialog-confirm',
              confirmButtonText: '是',
              cancelButtonText: '否'
            }).then(() => {
              authLogin();
            });
          }
          this.isLogined = data.isLogined;
          this.localUserId = data.localUserId;// 当前用户user_id
          // this.openId = data.openId;
          this.totalintegral = data.credit;
          this.creditToMoney = data.creditToMoney;
          if (this.isLogined) {
            getAvailableList(orderId).then(result => {
              avaliateHandle(result);
            });
          }
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      };
      let avaliateHandle = ({
        success,
        data,
        msg
      }) => {
        if (success) {
          if (data.length) {
            this.hasCoupon = true;
          }
        } else {
          Toast(msg);
        }
      };
      this.$showSpin();
      Promise.all([pendingOrder(orderId),
        getInformation(orderId)]).then(values => {
        let callbacks = [orderHandle, infoHandle];
        values.forEach((x, index) => callbacks[index](x));
        this.$hideSpin();
      });
    },
    check () {
      /* 点击结算
        已经登陆&&订单未锁定-->去锁定（提示使用优惠券、随机立减等）
        否则直接跳支付界面
      */
      if (this.isLogined === true && this.isLock === false) {
        // 订单锁定、随机立减
        let fetchLock = () => {
          this.btnLoading = true;
          // 3、锁定订单
          lockOrder({
            'order_id': this.$route.query.order_id,
            'coupon_sn_str': this.selectedCouponItems.map(x => x.couponSn).join(','),
            'credit1': this.integral
          }).then(({success, data, msg}) => {
            if (success) {
              this.isNeedPay = data.isNeedPay;
              this.isFree = data.isFree;
              // this.realReceive = data.realReceive;
              this.randomDeduction = data.randomDeduction;
              // 3.1需要支付
              if (this.isNeedPay) {
                if (this.randomDeduction === 0) {
                  this.goPay(); // 3.11 随机立减0元-->去支付
                } else if (this.randomDeduction > 0) {
                  // 3.12 随机立减n元-->弹出立减信息、更新支付金额
                  this.showfree = true;
                  this.actualTotal = data.realReceive;
                  this.iscut = true;
                  // this.goPay();
                }
              } else { // 3.2 不用支付
                if (this.isFree) {
                  // 3.21 随机立减免单-->弹出免单、更新支付金额(订单已完成)
                  // 关闭弹窗直接调用close()方法跳到支付成功界面
                  this.showfree = true;
                  this.actualTotal = data.realReceive;
                  this.iscut = true;
                } else {
                  // 3.22 本身支付金额为0（优惠券或积分抵扣）-->直接跳到支付成功界面
                  this.$go({
                    name: 'PaySuccess'
                  });
                }
                // this.$go({
                //   name: 'PaySuccess'
                // });
              }
            } else {
              Toast(msg);
            };
            this.btnLoading = false;
          });
        };
        let goReduce = () => {
          if (this.randomDeduction > 0) {
            this.goPay();
          } else {
            fetchLock();
          }
        };
        // let tipstext = this.hasCoupon && this.selectedCouponItems.length === 0 && !this.hasCouponTips;
        let tipstext = this.hasCoupon && this.selectedCouponItems.length === 0;
        /* 1、 提示使用优惠券
         1.1（有可使用券&&无已选券&&没有提示过）-->弹出提示
         1.2 否则-->进行下一步（随机立减）
        */
        if (tipstext) {
          Dialog.confirm({
            // title: '你有优惠券未使用,是否现在去使用?',
            title: '提示',
            message: '您确定本次消费不使用优惠券吗？',
            className: 'sl-dialog-confirm',
            confirmButtonText: '确定',
            cancelButtonText: '去使用'
          }).then(() => {
            // this.goselect();
            goReduce();
          }).catch(() => {
            // this.hasCouponTips = true; // on cancel
            this.goselect();
          });
        } else {
          /* 2、随机立减
             判断是否已经随机立减
              2.1 是-->去支付
              2.2 否-->调用锁定方法（触发随机立减）
          */
          // if (this.randomDeduction > 0) {
          //   this.goPay();
          // } else {
          //   fetchLock();
          // }
          goReduce();
        }
      } else {
        this.goPay();
      }
    },
    ...mapMutations('confirmOrder', ['setCouponItems', 'setTotalDiscount']),
    goPay () {
      this.$go({
        name: 'CheckoutCounter',
        query: {
          order_id: this.$route.query.order_id
        }
      });
    },
    goselect () {
      if (this.isable) {
        this.$go({ path: '/available-coupon',
          query: {
            //   bondQuantity: this.bondQuantity,
            // coupon_sn: this.$route.query.coupon_sn,
            // total: this.total,
            order_id: this.$route.query.order_id
          }
        });
      } else {
        Toast('订单已锁定，无法进行此操作');
      }
    },
    showtips () {
      if (!this.isable) {
        Toast('订单已锁定，无法进行此操作');
      }
    },
    allArrived () {
      this.integral = this.totalintegral;
    }
  },
  mounted () {
    this.loadData();
  }
};
</script>

<style lang="less">
@import '~@/assets/color.less';
.payment{
  .van-cell__value{
    color:@primaryColor;
  }
}
</style>
<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.payment{
    display: flex;
    height: 100%;
    flex-direction: column;
    .payment-header {
      height: 46px;
    }
    .payment-content {
      flex:1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    // .payment-footer {

    // }
    .zi{
        color: @primaryColor;
    }
    .mr{
        position: absolute;
        right: 0.3rem;
        // color: @primaryColor;
    }
    .motao{
            // position: fixed;
            // bottom: 1.38rem;
            // left: 3.2rem;
            text-align: center;
            font-size: 0.24rem;
            color: #AAAAAA;
            margin-bottom: 0.4rem;
            img{
                width:0.39rem;
                height:.3rem;
                margin-left: .1rem;
            }
        }
    //底部
    .bottomtext{
        // z-index: -1;
        background: #fff;
        // position: fixed;
        bottom: 0;
        // right:0;
        // left:0;
        width: 100%;
        height: 0.98rem;
        // border-top: 0.01rem solid #000000;
        box-shadow: 0 0 0.1rem #cccccc;
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
    .bold{
        font-weight: bold;
    }
    .ol-item {
        margin-bottom: 0.2rem;
        .ol-item-h {
            display: flex;
            justify-content: space-between;
            // margin: 0.05rem 0;
            padding-left: 0.3rem;
            // border-bottom: 1px solid #eee;
            p {
              height:0.8rem;
              line-height:0.8rem;
              // background: red;
                margin: 0;
                // width: 5.5rem;
                font-size: 0.28rem;
            }
        }

        .ol-item-body {
            max-height: 5.1rem;
            overflow: auto;
            .desc {
                position: relative;
                box-sizing: border-box;
                padding: 0.2rem;
                background-color: #fff;
                display: flex;
                .goodsname{
                    font-size: 0.28rem;
                    margin: 0;
                    width:3.81rem;
                }
                .message{
                    font-size: 0.24rem;
                    color:#999999;
                    margin: 0;
                    width:5.5rem;
                    text-align:left;
                }
            }
            img {
                width: 1.3rem;
                height: 1.3rem;
                margin-right: .3rem;
            }
            .price {
                position: absolute;
                right: 0.3rem;
                top: 0.2rem;
                margin: 0;
                text-align: right;
                font-size: 0.26rem;
                span:nth-of-type(2) {
                    color: #999999;
                    font-size: 0.24rem;

                }
            }

        }
        .tips-wrap {
            line-height: 0.77rem;
            text-align: center;
            .van-icon-tips{
                font-size: 0.25rem;
            }
        }
      }
      .coupontips{
        font-size: 0.24rem;
        color: #D0004E;
        padding:0.1rem 0.3rem;
        margin:0;
        span{
          color:#999;
        }
      }
      .van-cell{
          font-size: 0.28rem;
          height: 0.9rem;
          .jt{
              color:#cccccc;
              margin-top: 0.1rem;
          }
          .van-field{
            //   height: 0.6rem;
            //   line-height: 0.28rem;
              padding:0.08rem 0;
              ::placeholder{
                  color:#999999;
              }
          }
          .right-btn {
              // border-radius: 0.08rem;
              border:0.01rem solid @primaryColor;
              background: #ffffff;
              font-size: 0.28rem;
              line-height: 0.36rem;
              height:0.36rem;
              // margin-top: 0.1rem;
            }

       }
      .popup{
        //   background: transparent;
        width:73.33%;
        overflow-y: visible;
        border-radius:.1rem;
          .description{

            // height:4.1rem;
            // width:73.33%;
            font-size: 0.28rem;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            img{
                position: absolute;
                top:-0.72rem;
                left: 0.5rem;
                // transform: translateY(-50%);
                height: 1.44rem;
                width: 1.41rem;
            }
            .ptop{
                // height:0.8rem;
                color: #ffffff;
                width: 100%;
                line-height: 0.8rem;
                text-align: center;
                background-color: @primaryColor;
                border-radius: 0.1rem 0.1rem 0 0;
            }
            .ptext{
                // background: #ffffff;
                color: #666666;
                font-size: 0.26rem;
                line-height: 1.8;
                // height:1.12rem;
                // padding:0.15rem 0.2rem 0.15rem 0.2rem;
                margin:0.34rem 0.4rem;

            }
            .pbtn{
                background-color: @primaryColor;
                color: #ffffff;
                // position: relative;
                height: 0.54rem;
                width: 1.76rem;
                // left: 50%;
                font-size: 0.28rem;
                // bottom: 0.31rem;
                // transform: translateX(-50%);
                margin: 0 0 0.3rem 0;
            }
        }
      }
      .freepopup{
        background: transparent;
        text-align: center;
        .jianmian{
          // position: relative;
          font-size: 0.34rem;
          color:#DF3C5C;
          width: 5.92rem;
          height: 4.46rem;
          background: url("./images/jm@2x.png");
          background-size: 100% 100%;
          .mj{
            font-size: 0.63rem;
            padding-top:0.57rem;
            padding-bottom:0.3rem;
          }
        }
        .free{
          width: 6.83rem;
          height: 4.17rem;
          background: url("./images/free@2x.png");
          background-size: 100% 100%;
        }
        .van-icon-close{
          color:#fff;
          font-size: 0.6rem;
          margin-top: 0.7rem;
        }
      }

    }
</style>
