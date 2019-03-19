<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 50px;
    height: 50px;
    /* background: url('../../../assets/logo.png') no-repeat; */
    border-radius: 3px;
    float: left;
    position: relative;
    top: 7px;
    left: 20px;
    background-size: cover;
}
.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', zIndex: 9}">
                <ModuleNav :activeName="activeName"></ModuleNav>
            </Header>
            <Layout :style="{padding: '0 10px',marginTop:'100px', transition: 'height .5s', zIndex: 8}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}" class="js-content">
                        <Layout>
                            <Sider hide-trigger :style="{background: '#fff'}">
                               <slot name="menu"></slot>
                            </Sider>
                            <Content :style="{padding: '0 24px 0 24px', minHeight: '280px', background: '#fff'}">
                                 <router-view></router-view>
                            </Content>
                        </Layout>
                </Content>
             </Layout>
            <Footer class="layout-footer-center">&copy; 2018 摩萄盒子</Footer>
        </Layout>
        <!-- 订单详情 -->
        <OrderDetailModal
          :orderSn="orderSn"
          v-model="showOrder">
        </OrderDetailModal>
        <!-- 退货详情 -->
        <ReturnDetailModal
          :returnId="returnId"
          v-model="showReturnDeail">
        </ReturnDetailModal>
        <!-- 视频预览 -->
        <VideoPreviewModal
          v-model="showVideo"
          :videoSrc="videoSrc"/>
    </div>
</div>
</template>
<script>
import { debounce } from 'lodash';

export default {
  props: {
    activeName: {
      type: String,
      default: ''
    }
  },
  name: 'CommonLayoutPage',
  data () {
    return {
      containerHeight: 0,
      orderSn: '',
      showOrder: false,
      showReturnDeail: false,
      returnId: '',
      showVideo: false,
      videoSrc: ''
    };
  },
  created () {
    this.resize = debounce(this.resize);
    window.addEventListener('resize', this.resize);
    this.$g_on('openOrderDetail', this.openOrderDetail);
    this.$g_on('openReturnDetail', this.openReturnDetail);
    this.$g_on('openPreviewVideo', this.openPreviewVideo);
  },
  beforeDestroy () {
    this.$g_off('closeOrderDetail', this.closeOrderDetail);
    this.$g_off('closeReturnDetail', this.closeReturnDetail);
    this.$g_off('closePreviewVideo', this.closePreviewVideo);
  },
  mounted () {
    this.resize();
  },
  methods: {
    resize () {
      let winHeight = 0;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
      }
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
      }
      this.containerHeight = winHeight - 200;
    },
    openOrderDetail (data) {
      this.orderSn = typeof (data) === 'string' ? data : data.orderSn;
      this.showOrder = true;
    },
    closeOrderDetail () {
      this.showOrder = false;
      this.orderSn = '';
    },
    openReturnDetail (data) {
      this.returnId = typeof (data) === 'string' ? data : data.returnId;
      this.showReturnDeail = true;
    },
    closeReturnDetail () {
      this.showReturnDeail = false;
      this.returnId = '';
    },
    openPreviewVideo (data) {
      this.videoSrc = typeof (data) === 'string' ? data : data.videoSrc;
      this.showVideo = true;
    },
    closePreviewVideo () {
      this.showVideo = false;
      this.videoSrc = '';
    }
  }

};
</script>
