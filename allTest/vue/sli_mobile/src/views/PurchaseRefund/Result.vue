<template>
   <div class="refundReault">
       <div class='top'>
           <icon name="checked"/>
           <p>退货成功</p>
           <div class='time'>
                <p>退货时间：<span>{{datas.refundsTime}}</span></p>
           </div>
       </div>
       <div class='goodsList'>
           <Cell class="ol-item">
                <div class="ol-item-head">
                    <div>
                        <p>订单编号：{{datas.orderNum}}</p>
                    </div>
                </div>
                <div class="ol-item-body" v-if="datas.goodsList">
                    <div class="desc" v-for="(goods, index) in datas.goodsList" :key="index">
                        <img v-lazy="goods.image_url" alt="">
                        <p class="goodsname">{{goods.goods_name}}</p>
                        <p class="orderPrice">
                            <span class="bold">￥{{goods.price}}</span>
                            <span>x{{goods.refunded_quantity}}</span>
                        </p>
                    </div>
                </div>
            </Cell>
       </div>
   </div>
</template>

<script>
import { Icon, Cell } from 'vant';
export default {
  props: {
    datas: {
      type: Object,
      default: x => ({})
    }
  },
  components: {
    Icon,
    Cell
  }
};
</script>

<style scoped lang='less'>
@import "~@/assets/color.less";
.refundReault{
    background-color: #fff;
    .top{
        position: relative;
        height: 6.47rem;
        text-align: center;
        .van-icon{
            margin-top: 1.64rem;
            font-size: 1.64rem;
            color: @primaryColor;
        }
        p{
            font-size:.32rem;
            color: #5F5F5F;
        }
        .time{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: .84rem;
            line-height: 0.84rem;
            border-top: .03rem solid #f0eff5;
            text-align: left;
            padding-left: .3rem;
            p{
                color: #6D6D6D;
                font-size: .22rem;
            }
        }
    }
    .goodsList{
        border-top: .2rem solid #f0eff5;
    }
}
</style>
