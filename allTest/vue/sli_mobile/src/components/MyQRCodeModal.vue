<template>
 <Popup
    :close-on-click-overlay="false"
    :value="value"
    class="myqrcode-modal"
    >
    <icon name="iclose" @click="handleClose"/>
    <MyQRCode :animate="false" :inviteCode="inviteCode"/>
 </Popup>
</template>
<script>
import { Icon, Popup } from 'vant';
import MyQRCode from 'components/MyQRCode';
export default {
  name: 'MyQRCodeModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    inviteCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShowTips: false,
      hasBindEvent: false
    };
  },
  methods: {
    // 关闭
    handleClose () {
      this.$emit('input', false);
    }
  },
  mounted () {},
  components: {
    Icon,
    Popup,
    MyQRCode
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/color.less';
.myqrcode-modal{
    border-radius: 0.2rem;
    .van-icon-iclose {
        position: absolute;
        right: 0.15rem;
        top: 0.1rem;
        font-size: .5rem;
        opacity: 0.43;
        z-index: 1
    }
}
</style>
