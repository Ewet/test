<template>
  <div class="detail">
    <TopNav
     title="提现账户管理"
    />
    <p class="toptext">请填写提现到账的帐户，目前只支持提现到微信和支付宝</p>
    <div class="message">
    <cell is-link title="帐户类型" :value="aliantext" @click="show=!show"/>
    <!-- <field
    maxlength=15
    v-model="account"
    label="帐户"
    placeholder="请输入帐户名"
  />
    <field
    maxlength=10
    v-model="nickname"
    label="姓名"
    placeholder="请输入姓名"
  /> -->
    </div>
        <!-- <Button class="submit"  @click="ok">确定</Button> -->
        <div class="submit"><Btn @increment="ok">确认</Btn></div>
      <popup v-model="show" position="bottom" :overlay="true">
        <div class="user-list">
          <div class="listTitle">请选择账户类型</div>
          <div class="popup">
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
        </div>
        <!-- <Button class="btn" @click="show = false">关闭</Button> -->
    </popup>
  </div>
</template>
<script>
import { NavBar, Cell, CellGroup, Popup, Toast, Button, Icon, Field } from 'vant';
import { save } from '@/model/withdrawAccountModel';
import { getWithDrawMode } from '@/model/enumModel';
import TopNav from 'components/TopNav';
import Btn from 'components/Btn';
export default {
  data () {
    return {
      show: false,
      items: [],
      account: 'weixin',
      nickname: 'weixin',
      activeIndex: 0
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
    this.loadMode();
  },
  methods: {
    loadMode () {
      this.$showSpin();
      getWithDrawMode().then(result => {
        // console.log(result);
        let {success, data, msg} = result;
        if (success) {
          this.items = data.map(x => {
            return {
              icon: x.value === '0' ? 'wx' : 'zhifubao',
              text: x.name,
              checked: false,
              alian: x.name,
              value: x.value
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
      if (this.account === '') {
        Toast('帐户名不能为空！');
        return false;
      } else if (this.nickname === '') {
        Toast('姓名不能为空！');
        return false;
      }
      if (this.items.length === 0) {
        Toast(`无有效的帐号`);
        return false;
      }
      this.$showSpin();
      save({
        name: this.nickname,
        account: this.account,
        mode: this.items[this.activeIndex].value
      }).then(({success, msg}) => {
        if (success) {
          this.$go({name: 'RewardGoldOperation'});
        } else {
          Toast(msg);
        }
        this.$hideSpin();
      });
    }
  },
  components: {NavBar, Cell, CellGroup, Popup, TopNav, Button, Icon, Field, Btn}
};
</script>
<style  lang="less">
.detail{
  .van-cell__title{
      font-size:0.28rem;
  }
  .van-cell__value{
      color: #cccccc;
      font-size:0.24rem;
  }
}

</style>
<style  lang="less" scoped>
@import '~@/assets/color.less';
@import '~@/assets/mixin.less';
.detail {
  .toptext{
    font-size:0.26rem;
    color:#AAAAAA;
    padding-left:0.2rem;
    // margin-left:0.4rem;
  }
  .message{
    font-size:0.3rem;
    .van-cell{
      height: 1rem;
      line-height: 0.5rem;
    }
    .van-field{

      height:1rem;
    }
  }
  .submit{
    // width: 3.3rem;
    // height: auto;
    // line-height: 0.7rem;
    // display: block;
    // margin: 1.72rem auto 0;
    margin-top: 1.42rem;
    text-align:center;
    font-size:0;
    // margin-top: 1.72rem;
    // margin-left: 2.1rem;
    // font-size: 0.32rem;
    // background: @primaryColor;
    // color: #ffffff;
    // border:0;
    // border-radius: 0.05rem;
  }
  .van-popup{
    font-size:0;
    .popup{
      overflow:auto;
      // height:3.5rem;
      max-height:3.5rem;
    }
    .user-list {
      font-size: 0.3rem;
      padding:0.2rem 0.3rem 0.4rem;
      .listTitle {
        color:#888;
        margin: 0;
        font-weight:normal;
        line-height: 0.88rem;
        // padding-left: 0.4rem;
        position: relative;
        &::after {
          .setBottomLine(#ccc);
        }
      }
      ul {
        // padding: 0.2rem 0.3rem;
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
    }
    .van-icon-wx{
      font-size: 0.54rem;
      color:#50D171;
      margin-right: 0.2rem;
    }
    .van-icon-zhifubao{
      color: #4DB0F5;
      font-size: 0.54rem;
    }
    .van-icon-checked{
      color: @primaryColor;
      margin-top: 0.2rem;
      font-size: 0.3rem;
    }
    .van-icon-check{
      margin-top: 0.2rem;
      font-size: 0.3rem;
    }
    .btn{
      width: 100%;
      line-height: 0.98rem;
      height: 0.98rem;
      // margin-top: 0.8rem;
      font-size: 0.32rem;
      background: @primaryColor;
      color: #ffffff;
      border-radius:0;
      border:0;
    }
  }
}

</style>
