<template>
  <div style="height:100%;overflow:hidden;position:absolute;width:100%">
  <img :src="imgSrc" alt="" width="100%">
  <p>{{txt}}</p>
</div>
</template>

<script>
import {generateOrder} from 'model/generateOrder';
import { cartDiversion } from 'model/cartDiversion';
import cup from '../Other/images/cup.gif';
export default {
  name: 'GenerateOrder',
  data: function () {
    return {
      qrCode: this.$route.query.qrcode,
      txt: '生成订单中...',
      imgSrc: cup
    };
  },
  mounted () {
    this.diversion();
  },
  methods: {
    goPay (orderId) {
      console.log('跳转到付款', orderId);
      this.$replace({
        name: 'Payment',
        query: {
          order_id: orderId
        }
      });
    },
    goPurchaseRegister (boxId) {
      console.log('跳转到代购购物车', boxId);
      this.$go({
        name: 'PurchaseRegister',
        query: {
          box_id: boxId
        }
      });
    },
    async buildOrder () {
      let { success, data, msg } = await generateOrder(this.qrCode);
      if (success) {
        console.log('生成订单成功！orderId', data);
        this.goPay(data.order_id);
      } else {
        console.log('生成订单失败！msg', msg);
        this.txt = '生成订单失败！';
        this.$error(msg);
      }
    },
    async diversion () {
      if (!this.qrCode) {
        console.log('this.qrCode', this.qrCode);
        this.$error('找不到结算码');
        this.txt = '找不到结算码！';
        return false;
      }
      console.log('this.qrCode', this.qrCode);
      let { success, data, msg } = await cartDiversion(this.qrCode);
      if (success) {
        if (data.is_agent) {
          console.log('身份为代购员');
          // 跳到代购购物车
          this.goPurchaseRegister(data.box_id);
        } else {
          this.buildOrder();
        }
      } else {
        console.log(data, msg);
        this.$error(msg);
      }
    }
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
