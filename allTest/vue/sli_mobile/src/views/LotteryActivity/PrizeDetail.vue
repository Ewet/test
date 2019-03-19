<template>
    <StructPage>
        <Header
            title="礼品详情"
            slot="header"
            :transparentBar="true"
            bgImg="lottery-bg2"
        />
        <div slot="content" class="my-prize-detail">
            <div class="prize-detail">
            <div class="prize-top">
                <div class="prize-img" v-if="prizeType===3">
                   <img :src="imgUrl" alt="">
                </div>
                <div class="coupon" v-if="prizeType===2">
                    <div v-if="couponType===2">
                        <span >{{10*couponValue}}折</span>
                        <br/>
                        <span>折扣券</span>
                    </div>
                    <div v-else>
                        <span>{{couponValue}}元</span>
                        <br/>
                        <span>优惠券</span>
                    </div>
                </div>
                <!-- <div class="red-envelope" v-if="prizeType===1">
                    <div>
                        <span>{{amount}}</span>
                    </div>
                </div> -->
            </div>

            <div class="prize-msg" v-if="prizeType===2">
                <p class="prize-name">{{prizeName}}</p>
                <p>有效期：{{validityPeriod}}</p>
                <p>使用条件：{{useCondition}}</p>
                <p>使用范围：{{useLimit}}</p>
                <p>使用说明：{{instructions}}</p>
            </div>
            <div class="prize-msg" v-if="prizeType===3&&status===10">
                <p class="prize-name">{{prizeName}}</p>
                <p>中奖时间：{{wonTime}}</p>
                <p class="remark" v-if="remark">备注：{{remark}}</p>
                <p v-else>状态：{{statusFormat}}</p>
                <!-- <p>快递公司：{{courierCompany}}</p>
                <p>快递单号：{{trackingNumber}}</p> -->
                <!-- <span class="tips">*物流信息请到相关快递公司官网查询</span> -->
            </div>
            <div class="addmsg" v-if="prizeType===3&&status===0">
                <p class="prize-name">{{prizeName}}</p>
                <p>填写收货信息</p>
                    <field
                        v-model="formData.username"
                        clearable
                        required
                        label="收件人"
                        maxlength=50
                        placeholder="请输入收件人"
                    />
                    <field
                        v-model="formData.mobile"
                        clearable
                        required
                        type="number"
                        maxlength=15
                        label="联系电话"
                        placeholder="请输入联系电话"
                    />
                    <field
                        v-model="formData.address"
                        clearable
                        required
                        label="收货地址"
                        maxlength=200
                        placeholder="请输入收货地址"
                    />

            </div>
            </div>
        </div>
        <div class="btn" slot="footer">
            <Button v-if="prizeType===3&&status===0" @click="save">保存</Button>
        </div>
    </StructPage>
</template>

<script>
import { Cell, CellGroup, Icon, Field, Button, Toast } from 'vant';
import StructPage from 'components/StructPage';
import Header from 'components/Header';
import {getItem, modifyItem} from '@/model/lotteryActivity';

export default {
  data () {
    return {
    //   prizeType: 2,
    //   consigneeInfo: true,
      formData: {
        username: '',
        mobile: '',
        address: ''
      },
      prizeType: '',
      prizeName: '',
      couponType: 1,
      couponValue: null,
      amount: null,
      validityPeriod: '',
      useCondition: '',
      useLimit: '指定商品、指定盒子',
      instructions: '购买指定盒子指定活动的商品时可抵扣支付',
      imgUrl: '',
      wonTime: '',
      status: '',
      statusFormat: '',
      remark: '',
      consigneeInfo: '',
      courierCompany: '',
      trackingNumber: '',
      winnerId: this.$route.query.winner_id
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.$showSpin();
      getItem({
        winner_id: this.winnerId
      }).then(result => {
        console.log(result);
        //   getItem().then(result => {
        if (result.success) {
          let data = result.data;
          this.prizeType = data.prizeType;
          this.prizeName = data.prizeName;
          this.couponValue = data.couponValue;
          this.amount = data.amount;
          this.couponType = data.couponType;
          this.validityPeriod = data.validityPeriod;
          this.useCondition = data.useCondition;
          //   this.useLimit = data.useLimit;
          //   this.instructions = data.instructions;
          this.imgUrl = data.imgUrl;
          this.wonTime = data.wonTime;
          this.status = data.status;
          this.statusFormat = data.statusFormat;
          this.remark = data.remark;
          this.consigneeInfo = data.consigneeInfo;
          this.courierCompany = data.courierCompany;
          this.trackingNumber = data.trackingNumber;
          this.formData.username = data.username;
          this.formData.mobile = data.mobile;
          this.formData.address = data.address;
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
        this.$hideSpin();
      });
    },
    save () {
      if (!this.formData.username) {
        Toast('收件人不能为空');
        return false;
      }
      if (!this.formData.mobile) {
        Toast('联系电话不能为空');
        return false;
      }
      if (!this.formData.address) {
        Toast('收件地址不能为空');
        return false;
      }
      //   console.log(this.formData);
      modifyItem({
        winner_id: this.winnerId,
        contact_name: this.formData.username,
        contact_mobile: this.formData.mobile,
        contact_address: this.formData.address
      }).then(({success, msg}) => {
        if (success) {
        //   this.$go({name: 'WithdrawResult'});
          Toast('保存成功！');
          this.$go({
            name: 'MyPrize'
          });
          // this.loadData();
        } else {
          Toast(msg);
        }
      });
    }
  },
  components: {
    StructPage,
    Header,
    Cell,
    CellGroup,
    Icon,
    Field,
    Button,
    Toast
  }
};
</script>
<style lang="less">
@import '~@/assets/color.less';
.my-prize-detail{
    .van-cell--required::before {
    position: absolute;
    top: 0.14rem;
    left: 0.34rem;
}
}
</style>
<style lang="less" scoped>
@import '~@/assets/color.less';
.my-prize-detail{
    // height: 100%;
    // background-color: #EFEFF4;
    // font-size: 0.26rem;
    // padding-top: 0.28rem;
    // box-sizing: border-box;
    .prize-detail{
        background: #fff;
        padding-bottom:1.2rem;
        margin-top: 0.28rem;
        font-size: 0.26rem;
        .prize-top{
            width: auto;
            min-height: 4.44rem;
            display: flex;
                // flex-direction: column;
            justify-content: center;
            align-items: center;
            //实物
            .prize-img{
                width: 5.16rem;
                height: 3.48rem;
                text-align:center;
                img{
                    display: inline-block;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            //优惠券
            .coupon{
                width: 3.93rem;
                height: 2.2rem;
                background:url('./images/lottery-tag.png');
                background-size:100% 100%;
                background-repeat:no-repeat;
                padding-right: 0.77rem;
                text-align: center;
                color: #fff;
                span:nth-child(1){
                    display: inline-block;
                   font-size: 1.02rem;
                   line-height: 1.22rem
                }
                span:nth-child(3){
                    display: inline-block;
                   font-size: 0.8rem;
                   line-height: 0.88rem;
                }

            }
            //红包
            // .red-envelope{
            //     position: relative;
            //     width: 3.65rem;
            //     height: 2.42rem;
            //     background:url('./images/red-pack.png');
            //     background-size:100% 100%;
            //     background-repeat:no-repeat;
            //     color: #ED5854;
            //     div{
            //     //    display: inline-block;
            //        position: absolute;
            //        top:0.45rem;
            //        left: 1rem;
            //        width: 1.4rem;
            //        height: 0.8rem;
            //        font-weight: bold;
            //        font-size: 0.6rem;
            //        line-height: 0.6rem;
            //        text-align: center
            //     }

            // }
        }
        .prize-msg{
            margin: 0 0.6rem;
            p{
                margin: 0;
                min-height: 0.64rem;
                max-height: 3.2rem;
                line-height: 0.64rem;
                overflow: auto;
                border-bottom: 0.01rem dashed #CCCCCC;
            }
            .prize-name{
                height: 0.72rem;
                line-height: 0.64rem;
                font-size: 0.36rem;
                width: 6.3rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .tips{
                display: inline-block;
                padding:0.3rem 0 0;
                color:#5D5D5D;
                font-size: 0.21rem;
            }
            .remark{
                word-break: break-all;
            }
        }
        .addmsg{

            p{
                margin: 0 0.6rem;
                height: 0.64rem;
                line-height: 0.64rem;

            }
            .prize-name{
                height: 0.72rem;
                line-height: 0.64rem;
                font-size: 0.36rem;
                border-bottom: 0.01rem dashed #CCCCCC;
                width: 6.3rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .van-cell{
                padding: 0.1rem 0.6rem;
                font-size: 0.26rem;
            }
        }
    }

}
.btn{
    height: 100%;
    background-color: #EFEFF4;
    Button{
      width: 100%;
      height: 0.98rem;
      font-size: 0.32rem;
      line-height:0.98rem;
      background: @primaryColor;
      color: #ffffff;
    }
}
</style>
