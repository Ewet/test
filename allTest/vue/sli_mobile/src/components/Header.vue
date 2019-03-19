<template>
   <div class="top-nav"  :class="[{
     'transparent-bar': transparentBar
   },bgImg]">
      <nav-bar
          :title="title"
          :leftArrow="showBack"
          @click-left="myBack"
          :zIndex="9"
          >
          <slot name="left" slot="left"></slot>
          <slot name="right" slot="right">
          </slot>
      </nav-bar>
    </div>
</template>
<script>
// import router from '@/pages/index/router';
import {NavBar, Icon} from 'vant';
import {
  back
} from '@/utils/redirect';
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: Function,
      default: () => {
        back();
      }
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否启用透明导航栏
    transparentBar: {
      type: Boolean,
      default: false
    },
    bgImg: {
      type: String,
      default: ''
    },
    needBack: {
      type: Boolean,
      default: true
    }
  },
  components: {
    NavBar, Icon
  },
  methods: {
    myBack () {
      console.log('232');
      if (this.$route.query.from && this.needBack) {
        if (wx.closeWindow) {
          wx.closeWindow();
        } else {
          this.back();
        }
      } else {
        this.back();
      }
    }
  }
};

</script>
<style lang="less">
.top-nav {
  height: 46px;
  margin-bottom: -1px;
}
.transparent-bar {
  .van-nav-bar.van-hairline--bottom{
    background-color: transparent!important;
    &:after{
      color: red;
      border-bottom-width:0;
    }
  }
}
.lottery-bg2 {
  background-image: url('~@/assets/lottery-bg2.png');
  background-repeat: no-repeat;
}
</style>
