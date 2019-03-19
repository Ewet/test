<template>
<div class="refundRequest">
  <!-- 头部 -->
  <div class="requestHeader">
    <TopNav title="修改退款申请"/>
  </div>
  <!-- 内容 -->
  <div class="requestContent">
  <div class="refundMsg">
    <div class="orderSn">订单编号：{{orderSn}}</div>
    <div class="goods" v-for="(item,index) in goods" :key="index">
      <div class="desc">
        <img :src="item.goodsImg">
        <div class="goodsmsg">
          <p class="goodsName">{{item.goodsName}}</p>

          <p class="price">￥{{item.price}}</p>
        </div>
      </div>
      <div class="amount">
        <span class="gray">可退数量 : {{item.canRefundQuantity}} </span>
        <div class="stepper">
          <span class="gray">退货数量&nbsp;&nbsp;</span>
          <stepper
            v-model="item.retireQuantity"
            integer
            disable-input
            :min="0"
            :max= item.canRefundQuantity
          />
        </div>
      </div>
    </div>
  </div>
  <div class="reason">
    <p class="gray">退款原因</p>
    <field
    v-model="reason"
    type="textarea"
    placeholder="请填写您退款的问题"
    rows="5"
    @focus="creditFocus"
    id="creditWrap"
    />
    <!-- <div class="error" v-show="showError">
      <icon name="fail" />
      <span>请填写退款原因</span>
    </div> -->
  </div>
  </div>
  <!-- 底部 -->
  <div class="requestFooter">
    <Button class="btn" :disabled="isDisabled" type="default" @click="refundSubmit">提交</Button>
  </div>
</div>
</template>
<script>
import { Stepper, Field, Button, Icon, Toast } from 'vant';
import TopNav from 'components/TopNav';
// import { getOrderDetail, modifyItem, addItem } from '@/model/refund';
import { getItem, modifyItem } from '@/model/refund';

export default{
  name: 'EditRequest',
  data () {
    return {
      refundId: this.$route.query.refund_id,
      orderSn: '',
      orderId: '',
      goods: [],
      reason: '',
      // showError: false,
      goodsId: [],
      quantity: [],
      isDisabled: false
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    refundSubmit () {
      if (this.reason) {
        this.quantity = this.goods.map(x => {
          return x.retireQuantity.toString();
        });
        let isCanSubmit = this.quantity.every(x => {
          // console.log(typeof (x));
          return x === '0';
        });
        // 修改
        if (!isCanSubmit) {
          modifyItem({
            refund_id: this.refundId, //
            order_id: this.orderId, //
            reason: this.reason,
            goods_id_str: this.goodsId.join(','),
            quantity_str: this.quantity.join(',')
          }).then(({success, msg}) => {
            if (success) {
            // this.$success('新增成功！');
              this.$go({
                name: 'RefundSuccess'
              });
            // this.setModal(false);
            // this.reload();
            } else {
              Toast(msg);
            }
          });
        } else {
          Toast('请选择退款商品数量');
        }
      } else {
        Toast('请填写退款原因');
        this.isDisabled = true;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
        // this.showError = true;
      }
    },
    loadData () {
      // let orderSn = this.$route.query.order_sn;//
      getItem(this.refundId).then(result => {
        // console.log(result.data);
        if (result.success) {
          let data = result.data;
          this.goods = data.goods;
          this.orderId = data.orderId;//
          this.orderSn = data.orderSn;//
          this.reason = data.reason;
          this.goodsId = data.goods.map(x => {
            return x.goodsId;
          });
          // disable= true
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    },
    creditFocus (event) {
      setTimeout(() => {
        let pannel = document.getElementById('creditWrap');
        pannel.scrollIntoView(false);
        pannel.scrollIntoViewIfNeeded();
      }, 1000);
    }
  },
  watch: {

  },
  components: { Stepper, TopNav, Field, Button, Icon }
};
</script>
<style lang="less">
.refundRequest{
  .van-stepper{
    .van-stepper__minus,.van-stepper__plus{
        height: 0.5rem;
        width: 0.6rem;
    }
    .van-stepper__input{
      height: 0.42rem;
      width: 0.5rem;
    }
  }
}
</style>

<style lang="less" scoped>
@import "~@/assets/color.less";
.refundRequest{
  display:flex;
  height:100%;
  flex-direction:column;
  font-size: 0.24rem;
  .gray{
    color:#3B3B3B;
  }
  .requestContent{
    flex:1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  .refundMsg{
    background: #fff;
    // padding-left: 0.3rem;
    .orderSn{
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.26rem;
      border-bottom: 0.02rem solid #EFEFF4;
      padding-left: 0.3rem;
    }
    .goods{
      .desc{
        padding-top:0.3rem;
        padding-left: 0.3rem;
        height: 1.2rem;
        img{
          width: 1.2rem;
          height: 1.2rem;
          float: left;
          margin-right: 0.25rem;
        }
        .goodsmsg{
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          p{
            margin:0;
          }
          .goodsName{
            width: 5rem;
            font-size: 0.28rem;
          }
          .price{
            color: #626163;
            font-size:0.2rem;
          }
        }
      }
      .amount{
        height: 1.17rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .stepper{
          display: flex;
          align-items: center;
        }
      }
    }
    .goods+.goods{
      border-top: 0.02rem solid #EFEFF4;
    }
  }
  .reason {
    padding: 0 0.3rem;
    margin-bottom:0.5rem;
    ::placeholder{
      font-size: 0.24rem;
      color:#C7C7C7;
    }
    .error{
      height:0.8rem;
      display: flex;
      align-items:center;
      color:@primaryColor;
      // line-height:0.4rem;
      .van-icon{
        font-size:0.4rem;
        margin:-0.1rem 0.15rem 0 0;
      }
    }
  }
  }//内容end
  .requestFooter{
    bottom: 0;
  .btn{
      // position: absolute;
      // bottom:0;
      // border:0;
      width: 100%;
      height: 0.98rem;
      font-size: 0.32rem;
      line-height:0.98rem;
      background: @primaryColor;
      color: #ffffff;
    }
  }
}
</style>
