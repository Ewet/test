<template>
    <div style="min-height:420px">
      <Table border :columns="columns" :data="items" ></Table>
    </div>
</template>
<script>
export default {
  name: 'SalesDetailListView',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '商户',
          key: 'merchantName',
          minWidth: 120
        },
        {
          title: '盒子',
          key: 'boxNo',
          minWidth: 100
        },
        {
          title: '商品名',
          key: 'goodsName',
          minWidth: 150
        },
        {
          title: 'BOM码',
          key: 'bomCode',
          minWidth: 80
        },
        {
          title: '单价',
          key: 'unitPrice',
          minWidth: 80
        },
        {
          title: '数量',
          key: 'quantity',
          minWidth: 80
        },
        {
          title: '退货',
          key: 'returnQuantity',
          minWidth: 80
        },
        {
          title: '销售时间',
          key: 'salesTimeFormatted',
          minWidth: 150
        },
        {
          title: '订单金额',
          key: 'salesAmount',
          minWidth: 90
        },
        {
          title: '优惠券',
          key: 'couponDeduction',
          minWidth: 80
        },
        {
          title: '随机减',
          key: 'randomDeduction',
          minWidth: 80
        },
        {
          title: '退款',
          key: 'refundedTotal',
          minWidth: 80
        },
        {
          title: '实收',
          key: 'paidAmount',
          minWidth: 80
        },
        {
          title: '成本单价',
          key: 'costPrice',
          minWidth: 90
        },
        {
          title: '成本金额',
          key: 'costAmount',
          minWidth: 90
        },
        {
          title: '代购佣金',
          key: 'agentCommission',
          minWidth: 90
        },
        {
          title: '毛利',
          key: 'grossProfitAmount',
          minWidth: 90
        },
        {
          title: '毛利率',
          key: 'grossProfitMargin',
          minWidth: 100,
          render: (h, params) => h('span',
            `${params.row.grossProfitMargin}%`)
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 120,
          align: 'center',
          render: (h, params) => h('div', [
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  // this.$emit('viewOrderDetail', params.row.orderSn);
                  this.$openOrderDetail({
                    orderSn: params.row.orderSn
                  });
                }
              }
            }, '关联订单')
          ])
        }
      ]
    };
  }
};
</script>
<style lang="less">
.red{
  color:red;
}
.blue{
  color:#2db7f5;;
}
</style>
