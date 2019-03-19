<template>
   <div class="addRefunds">
      <Form  @submit.native.prevent inline class="toolBarForm">
        <RefreshBtn @click="reload()"/>
        <FormItem label="订单号">
            <Input type="text" v-model="filterObj.orderSn" placeholder="请输入订单号"></Input>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
        </FormItem>
      </Form>
      <Table
        border
        :columns="columns"
        :data="orderList"
        height='520'>
      </Table>
      <p class="remark">备注：</p>
      <p class="remark">1.如商品需补款，则在”金额“输入框输入正数，如需退款，则在输入框输入负数；</p>
      <p class="remark">2.商品金额不输入或为零，则该商品置换记录将不会保存，订单纠正列表内不显示该操作记录。</p>
      <ZBtn @click="handleDetermine" :loading='determineLoading'>{{determineLoading ? '加载中' : '确定'}}</ZBtn>
      <CancelBtn @click="handleCancel"/>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getGoodsList, confirmItem } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AddRefunds',
  components: {
  },
  data () {
    return {
      determineLoading: false,
      filterObj: {
        orderSn: ''
      },
      columns: [
        {
          title: '商品名称',
          key: 'goodsName',
          minWith: 100
        },
        {
          title: '商品BOM',
          key: 'goodsBom',
          minWith: 100
        },
        {
          title: '数量',
          key: 'num'
        },
        {
          title: '单价',
          key: 'money'
        },
        {
          title: '实付金额',
          key: 'realMoney',
          minWith: 100
        },
        {
          title: '置换',
          key: 'change',
          width: 130,
          render: (h, params) => {
            const actions = [];
            actions.push(
              h('ChangeBtn', {
                on: {
                  click: () => {
                    this.setGoodsModal(true);
                    this.setSelectIndex(params.index);
                  }
                }
              }),
              h('EmptyBtn', {
                on: {
                  click: () => {
                    this.orderList[params.index].changeGoods = '';
                    this.orderList[params.index].changeGoodsPrice = '';
                    this.orderList[params.index].changeGoodsId = '';
                    this.orderList[params.index].amountMoney = null;
                    this.orderList[params.index].remarks = '';
                  }
                }
              })
            );
            return h('div', actions);
          }
        },
        {
          title: '置换商品',
          key: 'changeGoods',
          minWith: 120
        },
        {
          title: '置换商品单价',
          key: 'changeGoodsPrice',
          minWith: 140
        },
        {
          title: '金额',
          key: 'amountMoney',
          render: (h, params) => {
            const action = [];
            action.push(
              h('Input', {
                props: {
                  value: params.row.amountMoney,
                  maxlength: 7
                },
                style: {

                },
                on: {
                  input: (value) => {
                    params.row.amountMoney = value;
                  },
                  'on-blur': (evt) => {
                    const val = evt.target.value;
                    const tempVal = parseFloat(val);
                    if (isNaN(tempVal)) {
                      params.row.amountMoney = '';
                    } else {
                      params.row.amountMoney = tempVal.toFixed(2);
                    }
                    this.orderList[params.index].amountMoney = params.row.amountMoney;
                  }
                }
              })
            );
            return h('div', action);
          }
        },
        {
          title: '备注',
          key: 'remarks',
          width: 140,
          render: (h, params) => h('Input', {
            props: {
              value: params.row.remarks,
              maxlength: 50
            },
            style: {

            },
            on: {
              'on-blur': (event) => {
                this.orderList[params.index].remarks = event.target.value;
              }
            }
          })
        }
      ],
      orderList: []
    };
  },
  created () {
    this.$g_on('orderCorrectionChangeGoods', this.orderCorrectionChangeGoods);
  },
  beforeDestroy () {
    this.$g_off('orderCorrectionChangeGoods', this.orderCorrectionChangeGoods);
  },
  methods: {
    async loadData () {
      const orderSn = this.filterObj.orderSn.trim();
      if (orderSn === '') {
        this.$error('请输入订单号再查询！');
        return false;
      }
      const { success, data, msg } = await getGoodsList(orderSn);
      if (success) {
        this.orderList = data;
      } else {
        this.$error(msg);
      }
    },
    // 搜索
    handleSubmit () {
      this.loadData();
    },
    // 重置
    handleReset () {
      this.filterObj = {
        orderSn: ''
      };
      this.orderList = [];
    },
    // 确定
    async handleDetermine () {
      if (this.orderList.length <= 0) {
        this.$error('列表没有数据！');
        return false;
      }
      const orderId = this.orderList[0].orderId;
      const db = this.orderList;
      const data = [];
      const relData = [];
      for (const dex in db) {
        // !db[dex].changeGoods && !db[dex].changeGoodsPrice && !db[dex].amountMoney && !db[dex].remarks
        if (!db[dex].changeGoods && !db[dex].changeGoodsPrice && !db[dex].amountMoney && !db[dex].remarks) {
          continue;
        }
        data.push({
          detail_id: db[dex].detailId,
          replace_goods_id: db[dex].changeGoodsId,
          replace_price: db[dex].changeGoodsPrice,
          replace_amount: db[dex].amountMoney,
          remarks: db[dex].remarks
        });
      }
      for (const dex in data) {
        if (!data[dex].replace_amount || data[dex].replace_amount === '0.00') {
          continue;
        }
        relData.push({
          detail_id: db[dex].detailId,
          replace_goods_id: db[dex].changeGoodsId,
          replace_price: db[dex].changeGoodsPrice,
          replace_amount: db[dex].amountMoney,
          remarks: db[dex].remarks
        });
      }
      if (data.length <= 0) {
        this.$error('数据未做修改！');
        return false;
      }
      if (relData.length <= 0) {
        this.handleCancel();
        return false;
      }
      let reTotal = 0;
      for (const dex in relData) {
        reTotal += Number(relData[dex].replace_amount);
      }
      if (reTotal.toFixed(2) === '0.00') {
        this.handleCancel();
        return false;
      }
      this.determineLoading = true;
      const { success, msg } = await confirmItem({
        order_id: orderId,
        orders_correction_detail: relData
      });
      if (success) {
        this.$success('添加成功！');
        this.handleCancel();
        console.log(1);
        this.$g_emit('setFilterAddRefunds'); // 重置主页列表
      } else {
        console.log(2);
        this.$error(msg);
        // 报错的话就把填入的信息清空；
        // this.orderList.map(x => {
        //   let firstId = x.detailId;
        //   relData.map(d => {
        //     let secondId = d.detail_id;
        //     if (firstId === secondId) {
        //       x.changeGoods = '';
        //       x.changeGoodsPrice = null;
        //       x.changeGoodsId = null;
        //       x.amountMoney = null;
        //       x.remarks = '';
        //     }
        //   });
        // });
      }
      this.determineLoading = false;
    },
    // 取消
    handleCancel () {
      this.filterObj = {
        orderSn: ''
      };
      this.orderList = [];
      this.setAddRefundsModal(false);
    },
    orderCorrectionChangeGoods (data) {
      this.$Bus.$emit('refreshGoodsList');
      this.setGoodsModal(false);
      this.orderList[this.selectIndex].changeGoods = data.name;
      this.orderList[this.selectIndex].changeGoodsPrice = data.pirce;
      this.orderList[this.selectIndex].changeGoodsId = data.goodsId;
    }
  },
  watch: {
    showAddRefundsModal (val) {
      if (!val) {
        this.filterObj = {
          orderSn: ''
        };
        this.orderList = [];
      }
    }
  }
};
</script>

<style lang='less'>
.addRefunds{
  .ivu-input-number-handler-wrap{
    width: 0;
  }
  .remark{
    margin: 10px 0;
  }
}
</style>
