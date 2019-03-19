<template>
    <StructPage class="differenceDetails">
        <Header
            title="差额详情"
            slot="header"
        ></Header>
        <div slot="content">
          <div v-for="(item,index) in data['items']" :key="index">
            <ItemDetail
            :itemData="item"
            />
          </div>
          <div class="bottomBox">
            <h6 v-if="data.total_price===0">金额合计￥{{Math.abs(data.total_price)}}</h6>
            <h6 v-if="data.total_price<0">退回金额合计￥{{Math.abs(data.total_price)}}</h6>
            <h6 v-if="data.total_price>0">需补差额合计￥{{Math.abs(data.total_price)}}</h6>
            <div class="bottomRow">
              <p>订单编号：{{data.order_sn}}</p>
              <p>成交时间：{{data.create_time_formatted}}</p>
            </div>
            <div class="bottomRow">
              <p>补付款说明：</p>
              <p>点击立即支付，即可补付差额，给你带来不便，十分抱歉，为表示歉意系统会给您发一张优惠券作为感谢。</p>
            </div>
          </div>

        </div>
        <div class="btn-footer" slot="footer">
            <Btn  v-if="orderStatus===1" size="large" style="background-color:#D1D1D6;">已支付</Btn>
            <Btn  v-if="orderStatus===3"  @increment="loadInfo" size="large">立即支付</Btn>
        </div>
    </StructPage>
</template>

<script>
import StructPage from 'components/StructPage';
import Btn from 'components/Btn';
import Header from 'components/Header';
import {getList, getWxpaySignature} from 'model/differenceDetails';
import ItemDetail from './ItemDetail';
import { pay } from '@/utils/wx';
import { log } from '@/model/logModel';
import { NavBar, Popup, Picker, Checkbox, CheckboxGroup, Toast } from 'vant';
export default {
  data () {
    return {
      data: {},
      orderStatus: -1
    };
  },
  mounted () {
    this.getListData();
  },
  methods: {
    loadInfo () {
      let correctionOrderId = this.$route.query.id;
      // let correctionOrderId = '340937214508317862';
      console.log('correctionOrderId=' + correctionOrderId);
      getWxpaySignature(correctionOrderId)
        .then(({success, data, msg}) => {
          log({
            content: JSON.stringify({
              name: 'VIP开通获取微信签名',
              data: {
                params: {},
                res: { success, data, msg }
              }
            })
          });
          console.log('获取微信签名=' + data);
          if (success) {
            pay({signParams: data,
              success: () => {
                console.log('paySuccess');
                // 跳转到支付成功
                this.paySuccess();
              },
              fail: () => {
                console.log('payFail');
                // 跳转到支付失败
                this.payFail();
              }
            });
          } else {
            Toast(msg);
          }
        });
    },
    paySuccess () {
      let correctionOrderId = this.$route.query.id;
      this.$go({
        name: 'MemberPurchaseSuccess',
        query: {
          'correction_order_id': correctionOrderId
        }
      });
    },
    payFail () {
      let correctionOrderId = this.$route.query.id;
      this.$go({
        name: 'MemberPurchaseFail',
        query: {
          'correction_order_id': correctionOrderId
        }
      });
    },
    // 差额详情列表
    async getListData () {
      let correctionOrderId = this.$route.query.id;
      // let correctionOrderId = '340937214508317862';
      let res = await getList({
        'correction_order_id': correctionOrderId
      });
      if (res.success) {
        this.data = res.data;
        this.orderStatus = res.data['order_status'];
      } else {
        if (res.code === 405 || res.code === 406) {
          this.$replace({
            name: 'MegPage',
            query: {
              'code': res.code,
              'from': 'differenceDetails'
            }
          });
        }
      }
    }
  },
  components: {
    StructPage,
    NavBar,
    Header,
    ItemDetail,
    Popup,
    Picker,
    CheckboxGroup,
    Checkbox,
    Toast,
    Btn
  }
};
</script>
<style lang="less" scope>
@import '~@/assets/color.less';
.differenceDetails{
  .btn{
    width: 100% !important;
    height: 0.98rem !important;
    outline: none;
  }
}
.bottomBox{
  padding: 0.3rem 0 1.3rem 0;
  h6{
    margin: 0;
    padding: 0 0.3rem;
    font-size: 0.24rem;
    color: #A669C2;
    text-align: right;
  }
  .bottomRow{
    padding: 0.2rem 0.3rem 0 0.3rem;
    margin: 0.3rem 0 0 0;
    border-top: 1px solid #ddd;
    p{
      font-size: 0.2rem;
      color: #626163;
      margin: 0;
      line-height: 0.33rem;
    }
  }
}

</style>
