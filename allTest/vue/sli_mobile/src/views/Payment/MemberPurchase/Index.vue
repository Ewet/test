<template>
<div class="vip">
    <TopNav
     title="VIP会员购买"
    />
    <div class="content">
        <!-- <cell-group>
        <cell  @click="confirm" value="...">
            <template slot="title">
                <span class="text">购买方式</span>
                <span class="zi">付费购买</span>
            </template>
        </cell>
        </cell-group>
        <cell-group>
        <cell>
            <template slot="title">
                <span class="text">购买年限</span>
                <span class="zi">1年&nbsp;&nbsp;</span>
                <tag type="primary">额外赠送30天会员</tag>
            </template>
        </cell>
        </cell-group>
        <cell-group>
        <cell  @click="confirm" is-link >
            <template slot="title">
                <span class="text">发票信息</span>
                <span class="zi">电子普通发票<span class="gray t3">（会员服务-个人）</span></span>
            </template>
        </cell>
        </cell-group> -->
        <cell-group>
        <cell>
            <template slot="title">
                <span class="text">应付金额</span>
                <span class="zi">￥{{vipPrice}}&nbsp;</span>
                <!-- <span class="original gray">￥245</span> -->
            </template>
        </cell>
        </cell-group>
        <!-- <p class="gray">开通视为同意<span @click="show=true" class="zi">《摩萄盒子会员正式期·用户协议》</span></p> -->
        <Btn @increment="loadInfo" size="large">立即支付</Btn>
    </div>
    <popup class="popup" v-model="show" :overlay="true">
        <div class="description">
            <img src="../images/motaox@2x.png" alt="">
            <div class="ptop">价格说明</div>
            <div class="ptext">因可能存在系统缓存、页面更新导致价格 变动异常等不确定性情况出现，商品售价 以本结算页商品价格为准；<br/>如有疑问，请您立即联系销售商咨询</div>
            <Button size="small" class="pbtn" @click="show=false"> 我知道了 </Button>
        </div>
    </popup>
    <!-- <div class="privilege">
        <div class="bottomtitle">
            <p>开通VIP会员享专属特权</p>
        </div>

        <div class="flex">
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
        </div>
        <div class="flex">
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
            <div class="content">
                <span class="bg"></span>
                <span>爱奇艺</span>
                <span>VIP会员</span>
            </div>
        </div>
    </div> -->
</div>
</template>
<script>
import { NavBar, Toast, Cell, CellGroup, Button, Icon, Tag, Popup } from 'vant';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
import { pay } from '@/utils/wx';
import { getWxpaySignature } from '@/model/buyMemberships';
import { getPrice } from '@/model/vipDetail';
// import { getInformation } from '@/model/paymentModel';
import { log } from '@/model/logModel';
export default {
  data () {
    return {
      show: false,
      vipPrice: 2
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    confirm () {
      Toast('暂未开放,敬请期待 ^ o ^');
    },
    loadInfo () {
    //   getInformation().then(({
    //     success, data, msg
    //   }) => {
    //   // 是否微信登陆签名
    //     if (data.openId) {
    //       console.log('openId', data.openId);
    //       this.fetchPay({
    //         openid: data.openId
    //       });
    //     } else if (this.code) {
    //       console.log('code', this.code);
    //       this.fetchPay({
    //         o2_code: this.code
    //       });
    //     }
    //   });
    // },
    // fetchPay (opts) {
    //   getWxpaySignature(opts)
      getWxpaySignature()
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
          if (success) {
            pay({signParams: data.paySignature,
              success: () => {
                // 跳转到支付成功
                this.paySuccess();
              },
              fail: () => {
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
      this.$go({
        name: 'MemberPurchaseSuccess',
        query: {
          order_id: this.orderId
        }
      });
    },
    payFail () {
      this.$go({
        name: 'MemberPurchaseFail',
        query: {
          order_id: this.orderId
        }
      });
    },
    loadData () {
      this.$showSpin();
      getPrice(5).then(result => {
        if (result.success) {
          let data = result.data;
          this.vipPrice = data.vipPrice;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    }
  },
  components: { NavBar, Cell, CellGroup, TopNav, Button, Icon, Tag, Btn, Toast, Popup }
};
</script>

<style  lang="less" scoped>
@import '~@/assets/color.less';
.vip {
    .zi{
        color: @primaryColor;
    }
    .gray{
        color: #999999;
    }
    .content {
        padding-top: 0.3rem;
        // overflow: auto;
        .van-cell{
            height: 0.9rem;
            font-size: 0.28rem;
            .text{
                color:#666;
                margin-right: 0.7rem;
            }
            .t3{
                font-size:0.24rem;
            }
            .original{
                text-decoration: line-through;
            }
            .van-tag{
                font-size: 0.2rem;
            }
            .van-tag--primary{
                background: #F59C66;
            }
        }
        p{
            font-size: 0.2rem;
            padding-left: 0.3rem;
        }
        .van-button {
            border-radius: 0.45rem;
            height: 0.9rem;
            line-height: 0.9rem;
            display: block;
            margin: 0.5rem auto 0;
        }
    }
    .popup{
        //   background: transparent;
        width:73.33%;
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
                height: auto;
                line-height: 0.54rem;
                width: 1.76rem;
                // left: 50%;
                font-size: 0.28rem;
                // bottom: 0.31rem;
                // transform: translateX(-50%);
                margin: 0 0 0.3rem 0;
            }
        }
      }
    .privilege{
        position: fixed;
        bottom: 0;
        height: 5rem;
        background:#fff;
        font-size: 0.28rem;
        width: 100%;
        text-align: center;
        .bottomtitle{
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                padding:0 0.05rem;
            }
            &::before{
                content: '';
                background:linear-gradient(to right,rgba(166,105,194,0),rgba(166,105,194,1));
                height:0.02rem;
                width:1rem;
            }
            &::after{
                content: '';
                background:linear-gradient(to left,rgba(166,105,194,0),rgba(166,105,194,1));
                height:0.02rem;
                width:1rem;
            }
        }
        .flex{
            display: flex;
            justify-content: space-around;
            text-align: center;
            // align-items: center;
            .content{
                display: flex;
                flex-direction: column;
                // justify-content: center;
                // vertical-align: middle;
                // text-align: center;
                color: #555555;
                .bg{
                    display: block;
                    width: 0.6rem;
                    height: 0.6rem;
                    background:@primaryColor;
                    opacity:0.5;
                    margin:0 auto 0;
                }
                span:nth-of-type(3){
                    color:#999999;
                    font-size: 0.22rem;
                }
            }

        }
    }

}

</style>
