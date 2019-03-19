<template>
  <div class="no-data" :class="[bgimg,{ 'nodata2': subDesc===''}]">
        <!-- <img :src="imgSrc" alt="您还没有相关的奖励"> -->
        <p>{{desc}}
          <template v-if="subDesc">
            <br>
            <span>{{subDesc}}</span>
          </template>
        </p>
     </div>
</template>
<script>
import noDataSrc from '@/assets/no-data@2x.png';
export default {
  props: {
    desc: {
      type: String,
      default: '暂无奖励记录'
    },
    subDesc: {
      type: String,
      default: ''
    },
    bgimg: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      imgSrc: noDataSrc
    };
  },
  computed: {

  }
};
</script>
<style lang="less" scoped>
 .no-data {
    text-align: center;
    padding-top: 1.5rem;
    background: url('../assets/no-data@2x.png') center/4.63rem 4.42rem no-repeat;//我的订单
    height: 5.5rem;
    // img {
    //     width: 3.48rem;
    //     height: 3.48rem;
    //     vertical-align: top;
    //     border-radius: 50%;
    // }
    p {
        text-align: center;
        font-size:.32rem;
        color:#000000;
        margin-top: 4.82rem;
        span {
            font-size: .24rem;
            color: #999999;
        }
    }
}
.nodata2{
  p {
      color: #999999;
    }
}

//我的小伙伴
.bg1{
  background-image: url('../assets/no-data2@2x.png');
}

//我的优惠券
.bg2{
  background-image: url('../assets/wu@2x.png');
}
// 奖励金池
.bg3{
  background-image: url('../assets/nopartner@2x.png');
}
// 提现结果
.bg4{
  background-image: url('../assets/withdrawresult@2x.png');
}
</style>
