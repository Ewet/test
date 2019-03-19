<template>
<div class="faq">
    <TopNav
     title="常见问题"
    />
    <div class="content">
        <cell-group>
        <cell title="关于奖励金提出规则的说明" is-link @click="confirm"/>
        </cell-group>
        <cell-group>
        <cell title="关于奖励金支持的提现账号问题" is-link @click="confirm"/>
        </cell-group>
        <cell-group>
        <cell title="关于奖励金额度的说明" is-link @click="confirm"/>
        </cell-group>
    </div>
    <Button bottom-action @click="confirm"><icon name="kefu"/>联系客服</Button>
</div>
</template>
<script>
import { NavBar, Toast, Cell, CellGroup, Button, Icon } from 'vant';
import TopNav from 'components/TopNav';
export default {
  data () {
    return {
    };
  },
  mounted () {},
  methods: {
    confirm () {
      Toast('暂未开放,敬请期待 ^ o ^');
    }
  },
  components: { NavBar, Cell, CellGroup, TopNav, Button, Icon }
};
</script>
<style  lang="less" scoped>
@import '~@/assets/color.less';
.faq {
    // padding-top: 46px;
    .TopNav {
        color:#FFFFFF;
        background-color: @primaryColor;
        .van-icon {
            color:#FFFFFF!important;
        }
    }
    .content {
        padding-top: 0.2rem;
    }
    .van-button--bottom-action {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @primaryColor;
        .van-icon {
            margin-right:0.2rem;
        }
    }
}

</style>
