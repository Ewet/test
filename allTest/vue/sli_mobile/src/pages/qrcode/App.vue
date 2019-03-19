<template>
  <transition>
    <div style="height:100%">
    <qr/>
    <div class="loading-wrap" v-show="spin">
      <loading color="white"  />
    </div>
    <!-- <RouterTransition></RouterTransition> -->
    </div>
  </transition>
</template>

<script>
// import RouterTransition from 'Common/RouterTransition';
import { Loading } from 'vant';
import qr from './qr';
export default {
  name: 'App',
  data () {
    return {
      spin: false
    };
  },
  created () {
    this.$Bus.$on('showSpin', this.showSpin);
    this.$Bus.$on('hideSpin', this.hideSpin);
  },
  beforeDestroy () {
    this.$Bus.$off('showSpin', this.showSpin);
    this.$Bus.$off('hideSpin', this.hideSpin);
  },
  methods: {
    showSpin () {
      this.spin = true;
    },
    hideSpin () {
      this.spin = false;
    }
  },
  components: {
    Loading,
    qr
  }
};
</script>

<style lang="less">
html,body {
 height: 100%;
 background-color: #f0eff5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
