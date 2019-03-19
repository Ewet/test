<template>
   <div class="top-nav">
    <nav-bar
          :title="title"
          left-arrow
          @click-left="myBack"
          :zIndex="9"
          :fixed="true"
          >
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
    }
  },
  components: {
    NavBar, Icon
  },
  methods: {
    myBack () {
      if (!this.$route.query.from) {
        this.back();
      } else {
        wx.closeWindow && wx.closeWindow();
      }
    }
  }
};

</script>
<style lang="less" scoped>
.top-nav {
  height: 46px;
  margin-bottom: -1px;
}
</style>
