<template>
    <div style="min-height:420px">
      <ModuleHeader title="成本录入">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
      />
    </div>
</template>
<script>
import { updateCost } from 'views/market/Goods/model';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  // mixins: [vuexMixins({moduleName: 'cost'})],
  components: {
    Toolbar
  },
  name: 'CostIndex',
  data () {
    return {
    //   containerHeight: 0,
      columns: [
        {
          title: '商品名称',
          key: 'goodsName',
          minWidth: 80
        },
        {
          title: '商品分类',
          key: 'gcateName',
          minWidth: 80
        },
        {
          title: '商品BOM码',
          key: 'barcode',
          minWidth: 80
        },
        {
          title: '市场价(元)',
          key: 'marketPrice',
          minWidth: 80
        },
        {
          title: '建议售价(元)',
          key: 'suggestPrice',
          minWidth: 80
        },
        {
          title: '成本价(元)',
          key: 'cost',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 150,
          align: 'center',
          render: (h, params) => h('div', [
            h('CostInputBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.edit(params.row);
                }
              }
            }, '成本录入')
          ])
        }
      ],
      goodsName: '',
      showGoodsQrCode: false,
      costEdit: null
    };
  },
  mounted () {
    this.setInternalFilter();
    this.pageChange(1);
    // this.loadData();
  },
  methods: {
    refresh () {
      this.reload();
    },
    edit (params) {
      this.costEdit = params.cost;
      this.$Modal.confirm({
        width: 250,
        render: h => h('InputNumber', {
          props: {
            value: this.costEdit,
            max: 999999.99,
            min: 0,
            autofocus: true,
            placeholder: '请录入成本'
          },
          style: {
            width: '100%'
          },
          on: {
            input: (val) => {
              this.costEdit = val;
            }
          }
        }),
        onOk: () => {
          if (this.costEdit) {
            this.costEdit = Number(this.costEdit.toFixed(2));
          }
          updateCost({
            goods_id: params.goodsId,
            cost: this.costEdit || 0
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('操作成功!');
              this.costEdit = null;
              this.reload();
            } else if (msg) {
              this.$error({
                content: msg
              });
            }
          });
        }
      });
    }
  }

};
</script>
<style lang="less">
.qrcode{
  width:300px;
  margin:20px auto;
  text-align: center;
  h3{
    font-size: 24px;
  }
  img{
    width: 300px;
    height: 300px;
  }
  span{
    line-height: 30px;
  }
}
</style>
