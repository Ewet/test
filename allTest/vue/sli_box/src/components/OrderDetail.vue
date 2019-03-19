<template>
    <div class="orderdetail" style="overflow-y: auto; max-height: 600px;">
        <Card :bordered="true" class="card-item">
          <span slot="title"><span>订单号：{{orderData.orderSn}}</span><span style="float:right;">下单时间：{{orderData.createTime}}</span></span>
          <Table :columns="columns" :data="orderData.goods" :loading = isloading >
          </Table>
          <div class="order-total">
            <p>优惠劵减免：<span>{{orderData.couponDeduction}}</span>元</p>
            <p>随机减免：<span>{{orderData.randomDeduction}}</span>元</p>
            <p>应收款：<span>{{orderData.willReceive}}</span>元</p>
            <p v-if="orderData.realReceive !== null">实收款：<span>{{orderData.realReceive}}</span>元</p>
          </div>
        </Card>
        <Card :bordered="true" class="card-item">
            <span slot="title">支付信息</span>
            <p>支付状态：{{orderData.shipStatus}}</p>
            <p>支付方式：{{orderData.payMode}}</p>
            <p>支付时间：{{orderData.payTime}}</p>
        </Card>
        <Card :bordered="true" class="card-item">
            <span slot="title">商户</span>
             <p>商户名称：{{orderData.merchantName}}</p>
            <p>商户地址：{{orderData.merchantAddress}}</p>
        </Card>
        <Card :bordered="true" class="card-item">
            <span slot="title">客户信息 <Button @click="handleDunning" type="warning" v-if="orderData.status==='15' && orderData.userId !== -1">催款</Button></span>
            <p>客户名：{{orderData.nickName}}</p>
            <p>手机号：{{orderData.mobile}}</p>
        </Card>
        <Card :bordered="true" class="card-item">
            <span slot="title">盒子</span>
            <p>盒子编号：{{orderData.boxNo}}</p>
            <p>盒子地址：{{orderData.boxAddress}}</p>
        </Card>
        <Card :bordered="true" class="card-item" v-if="orderData.orderType==='2'">
            <span slot="title">代购员</span>
            <p>姓名：{{orderData.purchasingName}}</p>
            <p>手机号：{{orderData.purchasingMobile}}</p>
        </Card>
        <Card
            :bordered="true"
            class="card-item"
            v-if="orderData.noteData && orderData.noteData.length">
            <span slot="title">备注</span>
            <p
              v-for="noteItem in orderData.noteData"
              :key="noteItem.date">
              <span style="margin-right:2px;">{{noteItem.date}}</span>
              {{noteItem.name}}<br/>
              {{noteItem.content}}
            </p>
        </Card>
        <slot/>
    </div>
</template>
<script>
import { sendNotify, getOrderDetail } from 'views/market/Order/model';

export default {
  props: {
    orderSn: {
      type: String,
      value: ''
    }
  },
  name: 'OrderDetail',
  data () {
    return {
      containerHeight: 0,
      columns: [{
        title: '商品名称',
        key: 'goodsName'
      },
      {
        title: '数量',
        key: 'quantity',
        render: (h, params) => h('span', `${params.row.quantity}支`)
      },
      {
        title: '商品单价/元',
        key: 'price',
        className: 'price'
      }
      ],
      isloading: false,
      orderData: {}
    };
  },
  created () {
    this.handleDunning = this.$debounce(this.handleDunning);
  },
  methods: {
    async handleDunning () {
      const { success, msg } = await sendNotify({
        order_id: this.orderData.orderId
      });
      if (success) {
        this.$success('发送催款通知成功!');
      } else {
        this.$error(msg);
      }
    },
    async loadData () {
      const { success, data, msg } = await getOrderDetail(this.orderSn);
      if (success) {
        this.orderData = data;
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    orderSn (val) {
      if (val) {
        this.loadData();
      }
    }
  }
};
</script>
<style lang="less">
.orderdetail{
  .ivu-table-title{
    padding: 0 10px;
  }
  .ivu-table-body{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
  }
  .ivu-table td.price{
    color: red;
  }
  .order-total{
    text-align: right;
    margin-top: 10px;
    /* flex-direction: column; */
    p{
      span{
        display: inline-block;
        color: red;
        min-width: 40px;;
      }
    }

  }
  .ivu-divider{
    margin:10px 0;
  }
  .card-item {
    margin-top: 10px;
    .ivu-card-head span {
      font-weight: bold;
    }
  }
}
</style>
