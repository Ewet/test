<template>
    <div class='invoiceEdit'>
      <div class='top'>
        <p><span>发票类型：</span>{{formData.type}}</p>
        <p><span>申请时间：</span>{{formData. applicationTime}}</p>
        <p><span>发票状态：</span>{{formData.invoiceStyle}}</p>
        <template v-if="formData.status === 20 ? true : false">
          <p><span>开票时间：</span>{{formData.handledTimeFormat}}</p>
          <p><span>发票号码：</span><a :href="formData.pic" target="_blank">查看发票</a></p>
        </template>
        <p><span>关联单号：</span>{{formData.singleNumber}}</p>
        <p><span>发票抬头：</span>{{formData.invoiceTop}}</p>
        <template v-if="formData.titleType === 1 ? false :true">
          <p><span>税号：</span>{{formData.taxNumber}}</p>
          <p><span>地址：</span>{{formData.companyAddress}}</p>
          <p><span>开户行：</span>{{formData.bankName}}</p>
          <p><span>帐号：</span>{{formData.bankAccount}}</p>
        </template>
      </div>
      <Table border min-height="280" :columns="columns" :data="formData.items" :loading = isLoading>
        <div slot="footer" class='table_footer'>
          <p v-if="formData.receivables === '0.00' ? false : true">应收款： <span>{{formData.receivables}}</span> 元</p>
          <p v-if="formData.pointsDeduction === '0.00' ? false : true">积分抵扣： <span>{{formData.pointsDeduction}}</span> 元</p>
          <p v-if="formData.couponDeduction === '0.00' ? false : true">优惠券折扣： <span>{{formData.couponDeduction}}</span> 元</p>
          <p>实收款： <span>{{formData.cashReceipts}}</span> 元</p>
        </div>
      </Table>
      <Button style='float:right;margin:40px 0 10px' @click="setViewModal(false)">关闭</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'replenishment',
  data () {
    return {
      columns: [
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '单价',
          key: 'unitPrice'
        },
        {
          title: '数量',
          key: 'num'
        }
      ]
    };
  },
  mounted () {

  }

};
</script>
<style lang='less'>
.invoiceEdit{
  clear: both;
  overflow: hidden;
  .top{
    overflow: hidden;
    padding: 0 0 10px;
    border-bottom: 1px solid #DDD;
    margin-bottom: 25px;
  }
  .top p {
    font-size: 14px;
    line-height: 26px;
    color: #707070;

  }
  .top p span{
    letter-spacing: 4.5px;
  }

  .table_footer{
    line-height: 18px;
    font-size: 12px;
    text-align: right;
    padding: 6px 0;
    padding-right: 30px;
    box-sizing: border-box;
    // border-top: 1px solid #e8eaec;
    height: auto;
  }
  .table_footer p span{
    color: red;
  }
  .ivu-table-footer{
    height: 100%;
  }
}

</style>
