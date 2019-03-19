<template>
    <div class="returndetail">
        <Table border :columns="columns" :data="returnData.items" :loading = isloading >
            <p slot="header"><span>退货单号：{{returnData.refundSn}}</span><span style="float:right;">退货时间：{{returnData.returnTime}}</span></p>
            <div slot="footer" >
                <span>退货原因：{{returnData.reason}}</span><br/>
                <span>共退款：<span style="color:red;">{{returnData.refundAmount}}</span>元</span>
            </div>
        </Table>
    </div>
</template>
<script>
import { getItem } from 'views/finance/PendingConfirmed/model';

export default {
  name: 'ReturnDetail',
  props: {
    returnId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      columns: [{
        title: '商品名称',
        key: 'goodsName',
        minWidth: 80
      },
      {
        title: '商品单价(元)',
        key: 'price',
        minWidth: 30
      },
      {
        title: '退货数量',
        key: 'quantity',
        minWidth: 30,
        render: (h, params) => h('span', `${params.row.quantity}支`)
      },
      {
        title: '退款金额',
        key: 'totalprice',
        minWidth: 30
      }
      ],
      isloading: false,
      returnData: {}
    };
  },
  methods: {
    async loadData () {
      this.isloading = true;
      const { success, data, msg } = await getItem(this.returnId);
      if (success) {
        this.returnData = data;
      } else {
        this.$error(msg);
      }
      this.isloading = false;
    }
  },
  watch: {
    returnId (val) {
      if (val) {
        this.loadData();
      }
    }
  }
};
</script>
<style lang="less">
.returndetail{
  .ivu-table-title,.ivu-table-footer{
    padding:0 10px;
  }
  .ivu-table-body{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 340px;
  }
  .ivu-table-footer{
    line-height: 20px;
    height: auto;
    // span:nth-of-type(2){
    //   color: red;
    // }
  }
}
</style>
