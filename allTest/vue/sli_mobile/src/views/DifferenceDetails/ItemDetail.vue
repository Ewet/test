<template>
  <div class="itemDetail">
    <div class="itemRow">
      <div class="imgBox"><img :src="itemData.goodsImage" alt=""></div>
      <div class="itemMain">{{itemData.goodsName}}</div>
      <div class="itemRight">
        <p style="font-size: 0.22rem;">系统结算的商品</p>
        <p>
          <span class="number">x{{itemData.quantity}}</span>
          <span style="font-weight:bold;">￥{{itemData.price}}</span>
        </p>
      </div>
    </div>

    <div class="itemRow">
      <div class="imgBox"><img :src="itemData.tobeGoodsImage" alt=""></div>
      <div class="itemMain">{{itemData.tobeGoodsName}}</div>
      <div class="itemRight">
        <p style="color:#6086CD;font-size: 0.22rem;">您实际取走的商品</p>
        <p>
          <span class="number">x{{itemData.tobeQuantity}}</span>
          <span style="font-weight:bold;">￥{{itemData.tobeGoodsPrice}}</span>
        </p>
      </div>
    </div>

    <div class="explainBox">
      <h6 v-if="itemData.amount<0">说明：由于理货员疏忽，商品摆放错了货区，导致结算时多收了您￥{{Math.abs(itemData.amount)}}</h6>
      <h6 v-if="itemData.amount>0">说明：由于理货员疏忽，商品摆放错了货区，导致结算时少收了您￥{{Math.abs(itemData.amount)}}</h6>
      <p v-if="itemData.amount<0">退回金额:&nbsp;&nbsp;￥{{Math.abs(itemData.amount)}}</p>
      <p v-if="itemData.amount>0">需补金额:&nbsp;&nbsp;￥{{Math.abs(itemData.amount)}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    itemData: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {

  },
  components: {
  }
};
</script>
<style lang="less" scope>
@import '~@/assets/color.less';

.itemDetail{
  background-color: #fff;
  margin-top: 0.2rem;
}
.itemRow{
  padding: 0.3rem;
  background-color: #fff;
  display: flex;
  border-bottom: 1px solid #eee;
  .imgBox{
    width: 0.92rem;
    height: 0.92rem;
    background-color: #eee;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .itemMain{
    width: 3.5rem;
    padding-left: 0.2rem;
    margin: 0.05rem 0 0 0;
    box-sizing: border-box;
    height: 100%;
    font-size: 0.26rem;
  }
  .itemRight{
    width: 2.48rem;
    height: 100%;
    font-size: 0.22rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    p{
      margin: 0.1rem 0 0 0;
      width: 100%;
      font-size: 0.26rem;
      text-align: right;
    }
  }
  .itemRight>p:nth-of-type(1){
    color: #A669C2;
  }
  .itemRight>p:nth-of-type(2){
    font-size: 0.26rem;
  }
  span.number{
    font-size: 0.24rem;
    color: #616161;
  }
}

.explainBox{
  padding:0.2rem 0.3rem;
  h6{
    margin: 0;
    border-radius: 0.08rem;
    font-size: 0.18rem;
    background-color: #6D6D6D;
    color: #fff;
    font-weight: 400;
    line-height: 0.44rem;
    text-align: left;
    text-indent: 0.07rem;
    letter-spacing:0.02rem;
  }
  p{
    margin: 0.2rem 0 0 0;
    font-size: 0.24rem;
    text-align: right;
  }
}

</style>
