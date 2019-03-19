<template>
   <div class="myquota">
        <TopNav
     title="我的额度"
    >
            <span slot="right" v-show="false">
            <icon name="setting" />设置</span>
        </TopNav>
    <div class="avatar">
      <img :src="avatar" alt="">
        <div>
          <p>{{username}}<br />{{level}}</p>
        </div>
    </div>
    <div class="container">
      <p class="toppage">总额度：￥{{commissionLimit}}</p>
      <div class="centerpage">
        <img :src="bg" alt="">
        <p>剩余：<span>￥{{residueCommissionLimit}}</span></p>
      </div>
      <div class="bottompage">
        <p>总额度：表示您积累最多可得到的奖励金</p>
        <p>剩余额度：表示您还可以积累的奖励金</p>
      </div>
    </div>
</div>
</template>
<script>
import { Cell, CellGroup, Icon, NavBar, Toast } from 'vant';
import { getQuota } from '@/model/quotaModel';
import { getProfile } from '@/model/memberModel';
import avatarImg from '@/assets/avatar.jpg';
import bg from './images/money-bg@2x.png';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
      username: '',
      level: '',
      avatar: avatarImg,
      bg: bg,
      commissionLimit: '0',
      residueCommissionLimit: '0'
    };
  },
  components: {
    Cell,
    CellGroup,
    Icon,
    NavBar,
    TopNav
  },
  methods: {
    imgClick () {
      this.$go({name: 'PersonalInfo'});
    },
    loadData () {
      this.$showSpin();
      getQuota().then(result => {
        if (result.success) {
          let data = result.data;
          this.commissionLimit = data.commissionlimit;// 总额度
          this.residueCommissionLimit = data.residue;// 剩余额度
        } else if (result.code !== 401) {
          Toast(result.msg);
        }
      });
      getProfile().then(result => {
        if (result.success) {
          let data = result.data;
          this.avatar = data.avatar;
          this.level = data.level;
          this.username = data.nickname;
        }
        this.$hideSpin();
      });
    }
  },
  mounted () {
    this.loadData();
  }
};
</script>
<style>
</style>

<style lang="less" scoped>
@import '~@/assets/mixin.less';
@import '~@/assets/color.less';
.myquota {
    .nav-bar {
        color:#FFFFFF;
        background-color: @primaryColor;
        .van-icon {
            color:#fff !important;
            background-color: fff;
        }
        .van-nav-bar__right {
            font-size:0.28rem;
            .van-icon {
                margin-right: 0.1rem;
            }
        }

    }
    .van-hairline--bottom::after {
            border-bottom: none;
        }
    .avatar{
        display: flex;
        color:#fff;
        height: 1.5rem;
        background-color: @primaryColor;

          img {
            width: 1.1rem;
            height: 1.1rem;
            border:0.05rem solid rgba(255, 255, 255, 0.4);
            margin: 0.03rem 0.4rem 0.25rem;
            border-radius: 0.05rem;
          }
       p{
            font-size:0.28rem;
        }
    }
    .container{
      font-size: 0.28rem;
      .toppage {
        text-align: right;
        margin-right: 0.4rem;
      }
      .centerpage{
        text-align: center;
        margin-top: 0.53rem;
        img{
        width: 2.21rem;
        height: 2.37rem;
        margin: auto;
        }
        p{
          // font-weight: bold;
          span{
            color:@primaryColor;
            font-size:0.4rem;
            font-weight:bold;
          }
        }
      }
      .bottompage{
        margin-left: 0.4rem;
        margin-top:1.58rem;
        font-size: 0.26rem;
      }
    }
}
</style>
