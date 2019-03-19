<template>
<div style="height:100%;overflow:hidden;position:absolute;width:100%">
  <img :src="imgSrc" alt="" width="100%">
  <p>{{txt}}</p>
</div>
</template>
<script>
import { wxPostCode } from '@/model/memberModel';
import { authLogin } from '@/utils/jump';
import cup from './images/cup.gif';
export default {
  data () {
    return {
      imgSrc: cup,
      txt: '数据处理中...'
    };
  },
  mounted () {
    wxPostCode({
      code: this.$route.query.code || ''
    }).then(({success, msg}) => {
      if (success) {
        // Toast({message: '登陆成功', duration: 1000});
        setTimeout(() => {
          authLogin();
        }, 1000);
      } else {
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
</style>
