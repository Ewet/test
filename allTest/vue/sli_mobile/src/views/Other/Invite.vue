<template>
<div class="invite">
  <!-- <img :src="imgSrc" alt="" width="100%"> -->
  <!-- <SuperMan/> -->
  <p>{{txt}}</p>
</div>
</template>
<script>
import { join } from '@/model/distributionCenterModel';
export default {
  data () {
    return {
      txt: '数据处理中...'
    };
  },
  mounted () {
    join({
      invite_code: this.$route.query.invite_code
    }).then(({success, msg}) => {
      if (success) {
        this.$go({
          name: 'DistributionCenterHome'
        });
      } else if (msg) {
        // Toast({
        //   message: msg,
        //   position: 'bottom'
        // });
        this.txt = msg;
      }
    });
  }
};
</script>
<style lang="less" scoped>
p {
    position: absolute;
    top: 8rem;
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 0.8);
    width: 101%;
}
.invite {
  height:100%;
  overflow:hidden;
  position:absolute;
  width:100%;
  background:  url('./images/cup.gif') center/100% no-repeat;
}
</style>
