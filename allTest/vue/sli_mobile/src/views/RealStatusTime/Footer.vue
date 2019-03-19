<template>
   <div class="realStatusTimeFooter">
     <div class="illustration">
      <p>图表说明：</p>
      <ul class="illustrationBot">
        <li>
          <span class="icons"></span>
          <span>已上架</span>
        </li>
        <li>
          <span class="icons notShelves"></span>
          <span>未上架</span>
        </li>
        <li>
          <span class="icons unKnown">?</span>
          <span>未知</span>
        </li>
        <li>
          <span class="icons sensor">...</span>
          <span>传感器</span>
        </li>
      </ul>
    </div>
   </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {

    };
  }
};
</script>

<style scoped lang='less'>
@import '~@/assets/color.less';
.commonFlexs{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.realStatusTimeFooter{
  .illustration{
    // position: absolute;
    // bottom: 1.5rem;
    // left: 0;
    width: 92%;
    padding: 0 4%;
    margin-top: 1rem;
    p{
      color: #333;
      margin-left:0;
    }
    .illustrationBot{
      &:extend(.commonFlexs);
      li{
        width: 24%;
        span{
          vertical-align: middle;
          display: inline-block;
        }
        span.icons{
          width: 0.28rem;
          height: 0.28rem;
          background: #A669C2;
          text-align: center;
          line-height: .28rem;
          border-radius: .08rem;
          font-size: .26rem;
          color: #999;
        }
        span.notShelves{
          background: #BBBBBB;
        }
        span.unKnown{
          background: #E0E0E0;
        }
        span.sensor{
          background: transparent;
          vertical-align: top;
          color: #A669C2;
        }
      }
    }
  }
}
</style>
