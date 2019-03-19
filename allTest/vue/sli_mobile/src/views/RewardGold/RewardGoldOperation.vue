<template>
  <div class="operation">
    <TopNav
     title="奖励金提现"
    />
   <div class="bgcolor">
    <div class="operation-user"
    >
       <span>提现到指定账户</span>
       <span>{{aliantext}}
         <!-- <icon name="arrow"></icon> -->
         </span>
    </div>
    <div class="centerpage">
      <div class="money">
        <span class="txje">提现金额</span><br />
        <div class="srk">
          ￥&nbsp;<input type="number" v-model="amount" @blur="amountBlur"/>
        </div>
      </div>
      <div class="queding">
        <span>当前可提现金额为{{activeCommission}}元，至少提现{{withdrawSill}}元</span>
        <a class="qbtx" @click="withdrawAll">全部提现</a>
      </div>

    </div>
    <!-- <Button class="submit" @click="ok">确定</Button> -->
    <div class="submit"><Btn @increment="ok">确认</Btn></div>
   </div>
    <popup v-model="show" position="bottom" :overlay="true" style="font-size:0;">
      <div class="user-list">
          <h3>请选择到账账户<div class="user-operation"><Button v-show="items.length>0" size="small"  @click="remove">删除</Button></div></h3>
          <div style="overflow:auto;max-height:3.5rem;">
            <ul>
            <li v-for="(item, index) in items"
                :key="index"
                @click="checkuser(index)"
                class="fixed-icon">
              <div>
                  <icon :name="item.icon"></icon>
                  <span>{{item.text}}</span>
              </div>
              <div>
                  <icon slot="right-icon" name="check" v-show="!item.checked"/>
                  <icon slot="right-icon" name="checked" v-show="item.checked"/>
              </div>
            </li>
          </ul>
          </div>
          <div class="add-user" @click="$go({name : 'WithdrawAccountManage'})" v-show="items.length===0">
            <icon name="add-o"></icon>
            <span>添加新的提现帐户</span>
          </div>
      </div>
      <!-- <Button class="btn" @click="show = false">关闭</Button> -->
    </popup>
  </div>
</template>
<script>
import { NavBar, Cell, CellGroup, Popup, Toast, Dialog, Button, Icon } from 'vant';
import { getHome } from '@/model/distributionCenterModel';
import { getList, del } from '@/model/withdrawAccountModel';
import {submitWithdraw} from '@/model/withdrawModel';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
export default {
  data () {
    return {
      show: false,
      activeCommission: 0,
      items: [],
      amount: '',
      mode: '',
      activeIndex: 0,
      withdrawSill: 0
    };
  },
  computed: {
    aliantext: function () {
      if (this.items.length > 0) {
        return this.items[this.activeIndex].alian;
      }
    }
  },
  mounted () {
    this.loadData();
  },
  methods: {
    amountBlur ({target: {value}}) {
      var ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (ret.test(value)) {
        // 大于最大提现金额
        if (value > this.activeCommission) {
          this.amount = this.activeCommission;
        }
      } else {
        if (!isNaN(parseFloat(value))) {
          this.amount = parseFloat(value).toFixed(2);
        } else {
          this.amount = '0.00';
        }
      }
    },
    withdrawAll () {
      this.amount = this.activeCommission;
    },
    // 删除
    remove () {
      Dialog.confirm({
        title: '',
        message: '是否删除?'
      }).then(() => {
        del(this.items[this.activeIndex].value).then(({success, msg}) => {
          if (success) {
            Dialog.alert({
              message: '删除成功！'
            }).then(() => {
              this.activeIndex = 0;
              this.getUserList();
            });
          } else {
            Toast(msg);
          }
        });
      }).catch(() => {
        // on cancel
      });
    },
    // 选中
    checkuser (index) {
      this.activeIndex = index;
      this.items.forEach((x, i) => {
        if (i === index) {
          x.checked = true;
        } else {
          x.checked = false;
        }
      });
    },
    ok () {
      if (this.items.length === 0) {
        Toast(`请先填写有效的帐号`);
        return false;
      }
      if (this.activeCommission === 0) {
        Toast('没有可提现金额');
        return false;
      }
      if (isNaN(parseFloat(this.amount))) {
        Toast('请输入数字');
        return false;
      }
      let minus = parseFloat(this.amount);
      if (minus < 0) {
        Toast(`提现金额不能为负数`);
        return false;
      }
      let tmp = parseFloat(this.amount);
      if (tmp < this.withdrawSill) {
        Toast(`至少提现${this.withdrawSill}元`);
        return false;
      }
      if (tmp > this.activeCommission) {
        Toast(`最多提现${this.withdrawSill}元`);
        return false;
      }
      submitWithdraw({
        account_id: this.items[this.activeIndex].value,
        amount: this.amount
      }).then(({success, msg}) => {
        if (success) {
          this.$go({name: 'WithdrawResult'});
        } else {
          Toast(msg);
        }
      });
    },

    getUserList () {
      getList().then(result => {
        // this.$showSpin();
        let {success, data, msg} = result;
        if (success) {
          this.items = data.map(x => {
            return {
              icon: x.mode === '0' ? 'wx' : 'zhifubao',
              text: x.title,
              checked: false,
              alian: x.title,
              value: x.id
            };
          });
          if (this.items.length > 0) {
            this.items[this.activeIndex].checked = true;// 默认选中第一项
          }
        } else if (msg) {
          Toast(msg);
        }
        this.$hideSpin();
      });
    },
    loadData () {
      this.$showSpin();
      getHome().then(result => {
        let {success, data} = result;
        if (success) {
          this.activeCommission = data.activeCommission;
          this.withdrawSill = data.withdrawSill;
        }
        this.$hideSpin();
      });
      this.getUserList();
    }
  },
  components: {NavBar, Cell, CellGroup, Popup, TopNav, Button, Icon, Btn}
};
</script>
<style lang="less">
@import '~@/assets/color.less';
@import '~@/assets/mixin.less';
.operation {
  .van-icon-wx, .van-icon-add-o,.van-icon-zhifubao {
    font-size: 0.54rem;
    margin-right: 0.2rem;
  }
  .van-icon-add-o {
    color: @primaryColor;
    // font-size: 0.48rem;
    // margin-top: 0;
  }
  .van-icon-zhifubao {
    color: #4DB0F5;
  }
  .operation-user {
    margin: 0.2rem 0;
    padding: 0 0.4rem;
    display: flex;
    background: #fff;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    position: relative;
    // &::after {
    //   .setBottomLine(#ccc);
    // }
    span:first-child{
      padding: 0.36rem 0;
    }
    span:last-child{
      font-size: 0.26rem;
      color:#aaa;
      i {
        margin-left: 0.2rem;
      }
    }
  }
  .user-list {
    font-size: 0.28rem;
    padding:0.2rem 0.3rem 0.4rem;
    h3 {
      color:#888;
      font-size: 0.3rem;
      margin: 0;
      font-weight:normal;
      line-height: 0.88rem;
      // padding-left: 0.4rem;
      position: relative;
      &::after {
        .setBottomLine(#ccc);
      }
      .user-operation {
        position: absolute;
        right: 0;
        top: 0;
        // .van-button{
        //   background: @primaryColor;
        //   color: #fff;
        // }
      }
    }
    ul {
      // padding: 0rem 0.3rem;
      li {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0 ;
        div:first-child{
          display: flex;
          align-items: center;
        }
      }
    }
    .add-user {
      margin: 0;
      line-height: 0.88rem;
      padding-left: 0.3rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style  lang="less" scoped>
@import '~@/assets/color.less';
@import '~@/assets/mixin.less';
.operation {
  font-family: 'MicrosoftYaHei';
  .bgcolor{
    // .van-cell{
    //   background: #EFEFF4;
    //   // position: relative;
    //   // &::after {
    //   //   .setBottomLine(#ccc);
    //   // }
    // }
    .centerpage{
      // margin-left: 0.4rem;
      // margin-right: 0.4rem;
      padding:0 0.4rem;
      background: #fff;
      height: 2.5rem;
      .money{
        height: 1.65rem;
        background: #fff;
        .txje{
          position: relative;
          top:-0.5rem;
          font-size:0.28rem;
          color:#888;
        }
        .srk{
          position: relative;
          top:-0.35rem;
          font-size:0.48rem;
          // &::after {
          //   .setBottomLine(#ccc);
          // }
          input{
            width:80%;
            // background: #EFEFF4;
            border:none;
            &::placeholder{
              font-size:0.25rem;
            }
          }

        }
      }
      .queding{
        font-size:0.28rem;
        position: relative;
        top:0.2rem;
        color:#888;
        .qbtx{
          color:@primaryColor;
          float: right;
        }

      }

    }
    .submit{
          font-size:0;
          text-align:center;
          margin-top: 1.12rem;
          // width: 3.3rem;
          // height: 0.7rem;
          // height:auto;
          // line-height:0.7rem;
          // display: block;
          // margin:1.2rem auto 0;
          // margin-top: 2rem;
          // margin-left: 1.8rem;
          // font-size: 0.32rem;
          // background: @primaryColor;
          // color: #ffffff;
          // border:0;
          // border-radius: 0.05rem;
        }
  }
  .van-popup{
      span{
        font-size: 0.28rem;
      }
    // .van-icon-wx{
    //   font-size: 0.54rem;
    //   color:#50D171;
    //   // margin-top: 0rem;
    // }
    // .van-icon-zhifubao{
    //   font-size: 0.54rem;
    //   color: #4DB0F5;
    // }
    .van-icon-checked{
      color: @primaryColor;
    }
    .van-icon-checked,.van-icon-check{
      // margin-top: 0.2rem;
      font-size: 0.4rem;
      width:0.4rem;
      height: 0.4rem;
      margin-top:0;
    }
    // .van-icon-add-o{
    //   color: @primaryColor;
    // }
    .btn{
      width: 100%;
      height: 0.98rem;
      line-height:0.98rem;
      // margin-top: 0.8rem;
      font-size: 0.32rem;
      background: @primaryColor;
      color: #ffffff;
      border:0;
      border-radius:0;
      vertical-align:bottom;
    }
  }
}

</style>
