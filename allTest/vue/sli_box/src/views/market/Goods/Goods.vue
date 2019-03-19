<template>
    <div style="min-height:420px">
      <ModuleHeader title="商品列表">
        <Button  type="primary" slot="right" @click="addItem">添加</Button>
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
      <Modal
        :value="showModal"
        :title="Object.keys(formData).length === 0 ? '新增' : '编辑'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        width=800
        :scrollable= "true"
        >
        <Edit/>
      </Modal>
      <GoodsQrCode
        v-model="showGoodsQrCode"
        :goodsName="goodsName"
        :qrCodeUrl="qrCodeUrl"
      />
    </div>
</template>
<script>
import { delItem, getItem } from './model';
import Edit from './Edit';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar,
    Edit
  },
  name: 'GoodsIndex',
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
        // {
        //   title: '成本价(元)',
        //   key: 'cost',
        //   minWidth: 80
        // },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 250,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.goodsId);
                }
              }
            }, '编辑'),
            h('QRCodeBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.viewQrcode(params.row.goodsId);
                }
              }
            }, '二维码'),
            h('DelBtn', {
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.goodsId);
                }
              }
            }, '删除')
          ])
        }
      ],
      qrCodeUrl: '',
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
    async viewQrcode (goodsId) {
      const { success, data, msg } = await getItem(goodsId);
      if (success) {
        this.showGoodsQrCode = true;
        this.qrCodeUrl = data.qrCodeUrl;
        this.goodsName = data.goodsName;
      } else {
        this.$error(msg);
      }
    },
    del (goodsId) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        content: '',
        onOk: () => {
          delItem(goodsId).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    }
    // edit (params) {
    //   this.costEdit = params.cost;
    //   this.$Modal.confirm({
    //     width: 250,
    //     render: (h) => {
    //       return h('InputNumber', {
    //         props: {
    //           value: this.costEdit,
    //           max: 999999.99,
    //           min: 0,
    //           autofocus: true,
    //           placeholder: '请录入成本'
    //         },
    //         style: {
    //           width: '100%'
    //         },
    //         on: {
    //           input: (val) => {
    //             this.costEdit = val;
    //           }
    //         }
    //       });
    //     },
    //     onOk: () => {
    //       if (this.costEdit) {
    //         this.costEdit = Number(this.costEdit.toFixed(2));
    //       }
    //       updateCost({
    //         goods_id: params.goodsId,
    //         cost: this.costEdit || 0
    //       }).then(({success, msg}) => {
    //         if (success) {
    //           this.$success('操作成功!');
    //           this.costEdit = null;
    //           this.reload();
    //         } else if (msg) {
    //           this.$error({
    //             content: msg
    //           });
    //         }
    //       });
    //     }
    //   });
    // }
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
