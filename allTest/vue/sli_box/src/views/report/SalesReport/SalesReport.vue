<template>
    <div class='salesReport' style="min-height:420px">
      <ModuleHeader title="销售报表">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :pageSize="pageSize"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          height="500"
      >
        <div class="tabFooter" slot='footer'>
          合计：
          <span>数量&nbsp;{{totalQuantity}} 支</span>
          <span>应收金额&nbsp;{{totalReceivableAmount}} 元</span>
          <span>实收金额&nbsp;{{totalReceivedAmount}} 元</span>
        </div>
      </ZTable>
    </div>
</template>
<script>
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { EXOperationDetail } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar
  },
  name: 'SalesReportIndex',
  data () {
    return {

      columns: [
        {
          title: '商品名称',
          key: 'goodsName'
        },
        // {
        //   title: '盒子编号',
        //   key: 'boxNum'
        // },
        {
          title: '商品BOM码',
          key: 'barcode'
        },
        {
          title: '单价',
          key: 'price'
        },
        {
          title: '数量/支',
          key: 'quantity'
        },
        // {
        //   title: '下单时间',
        //   key: 'creatTime',
        //   minWidth: 130
        // },
        // {
        //   title: '支付时间',
        //   key: 'paitTime',
        //   minWidth: 130
        // },
        {
          title: '应收金额/元',
          key: 'receivableAmount'
        },
        {
          title: '实收金额/元',
          key: 'receivedAmount'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(
              h('Button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.exportOperationDetail(params.row.goodsId, params.row.price);
                  }
                }
              }, '导出明细')
            );
            return h('div', action);
          }
        }
      ]
    };
  },
  methods: {
    exportOperationDetail (goodsId, price) {
      const data = this.filter;
      data.goods_id = goodsId;
      data.price = price;
      EXOperationDetail(data);
    }
  }

};
</script>
<style>
.salesReport .ivu-table-footer{
  border-top: 1px solid #e8eaec;
  box-sizing: border-box;
  padding-left: 30px;
}
.salesReport .tabFooter span{
  margin-right: 10px;
}
</style>
