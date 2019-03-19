<template>
   <div class="member"  >
        <ModuleHeader title="销售计划">
        </ModuleHeader>
        <Form inline class="toolBarForm">
            <RefreshBtn @click="handleRefresh"/>
            <FormItem label='盒子编号'>
              <span @click="boxNoClick($event)">
                <Input type="text" v-model="filterObj.boxNum" clearable readonly placeholder="请输入盒子编号"></Input>
              </span>
            </FormItem>
            <FormItem>
                <SearchBtn @click="handleSubmit"/>
                <ResetBtn @click="handleReset"/>
            </FormItem>
        </Form>
        <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
        <Modal
          title="选择盒子"
          :value="showBoxModal"
          :footer-hide = "true"
          style="z-index:1001;"
          width=800
          @on-cancel="setBoxModal">
          <BoxSelect @itemSelect="boxNoSelect"/>
        </Modal>
        <Modal
            width='500'
            :value="showModal"
            title="添加计划"
            :footerHide= "true"
            :mask-closable="false"
            @on-cancel="offPlanModal">
            <Edit/>
        </Modal>
        <Modal
          title="选择商品"
          :value="showGoodsModal"
          :footer-hide = "true"
          style="z-index:1001;"
          @on-cancel="setGoodsModal(false)">
          <GoodsSelect @itemSelect="goodsNameSelect"/>
        </Modal>
        <Modal
          width="25%"
          :value="viewModal"
          title="销售计划详情"
          :footerHide= "true"
          :mask-closable="false"
          @on-cancel="setViewModal(false)">
          <salesPlanDetail/>
        </Modal>
        <Modal
          :value="showQrcode"
          title="商品二维码"
          :mask-closable="false"
          @on-cancel="showQrcode=false"
          :scrollable= "true"
          ok-text='打印'
          @on-ok="printfQr"
          >
          <div class="qrcode" id="myDiv" ref="print">
            <h3>商品名称：{{qrGoodsName}}</h3><br/>
            <img :src="qrCodeUrl">
            <br/>
            <span>商品二维码<a :href="qrCodeUrl">[下载]</a></span>
          </div>

        </Modal>
   </div>
</template>

<script>
import Edit from './Edit';
import SalesPlanDetail from './SalesPlanDetail';
import vuexMixins from 'mixins/module-map';
import { cancelPlans } from './model';// getSalesPlanQr

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'SalesPlan',
  components: {
    Edit,
    SalesPlanDetail
  },
  data () {
    return {
      showBoxModal: false,
      showQrcode: false,
      qrCodeUrl: '',
      qrGoodsName: '',
      filterObj: {
        boxNum: ''
      },
      columns: [
        {
          title: '货区编号',
          width: 120,
          key: 'areaNo'
        },
        {
          title: '在售商品',
          key: 'saleShop'
        },
        {
          title: '盒子编号',
          key: 'boxNum'
        },
        {
          title: '库存/支',
          width: 80,
          key: 'stock'
        },
        {
          title: '价格/元',
          width: 100,
          key: 'price'
        },
        {
          title: '当前计划',
          key: 'planing'
        },
        {
          title: '状态',
          width: 120,
          key: 'style'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 250,
          width: 250,
          align: 'center',
          render: (h, params) => {
            const action = [];
            const status = params.row.status;
            action.push(h(status === 10 ? 'CancelPlanBtn' : 'AddPlanBtn', {
              props: {
                type: status === 10 ? 'warning' : 'primary',
                size: 'small'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: () => {
                  status === 10 ? this.cancelPlan(params.row.planId) : this.addPlan({ layerId: params.row.layerId, planId: params.row.planId, goodsId: params.row.goodsId });
                }
              }
            }, status === 10 ? '取消计划' : '添加计划'));
            if (status === 10) {
              action.push(h('ViewDetailsBtn', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.qrGoodsName = params.row.saleShop;
                    this.viewItem(params.row.planId);
                  }
                }
              }, '查看详情'));
            }
            // action.push(h('Button', {
            //   props: {
            //     type: 'primary',
            //     size: 'small'
            //   },
            //   on: {
            //     click: () => {
            //       this.viewQrcode(params.row.goodsId);
            //     }
            //   }
            // }, '二维码'));
            return h('div', action);
          }
        }
      ]
    };
  },
  mounted () {
    // this.pageChange(1);
  },
  methods: {
    // 刷新
    handleRefresh () {
      if (this.filterObj.boxNum === '') {
        this.$error('请选择盒子编号再进行查询');
      } else {
        this.reload();
      }
    },
    offPlanModal () {
      this.$g_emit('clearSalesPlanForm');
    },
    setBoxModal () {
      this.showBoxModal = false;
    },
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showBoxModal = true;
    },
    boxNoSelect (row) {
      this.filterObj.boxNum = row.boxNo;
      this.showBoxModal = false;
    },
    handleSubmit () {
      const num = this.filterObj.boxNum;
      if (num === '') {
        this.$error('请选择盒子编号再进行查询');
      } else {
        this.filterData({
          box_no: this.filterObj.boxNum
        });
      }
    },
    handleReset () {
      this.filterObj = {
        boxNum: ''
      };
      console.log(this.items);
      this.setItems({ items: [], pageNum: 1, total: 0 });
    },
    goodsNameSelect (row) {
      this.setGoodsName(row.goodsName);
      this.setGoodsId(row.goodsId);
      this.setGoodsModal(false);
      console.log('goodsNameSelect', row);
      this.setGoodsPrice(row.marketPrice);
    },
    cancelPlan (planId) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要取消该销售计划吗?</p>',
        onOk: () => {
          cancelPlans({
            plan_id: planId
          }).then((res) => {
            if (res.success === true) {
              this.$success('取消成功！');
            } else {
              this.$error({ content: res.msg });
            }
            this.pageChange(this.page);
          });
        }
      });
    },
    // viewQrcode (goodsId) {
    //   this.showQrcode = true;
    //   getSalesPlanQr(goodsId).then(({success, data, msg}) => {
    //     if (success) {
    //       this.qrCodeUrl = data.code_url;
    //     }
    //   });
    // },
    printfQr () {
      this.$print(this.$refs.print);
      this.showQrcode = false;
    }
  },
  watch: {
    showBoxModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshBoxList');
      }
    },
    showGoodsModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshGoodsList');
      }
    }
  }

};
</script>

<style scoped lang='less'>
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
