<template>
   <div class="supplyOrder">
        <Form :rules='ruleValidate' ref="filterObj" :model="filterObj" :label-width='86'>
          <RefreshBtn @click="reload()"/>
          <FormItem label='盒子编号' prop="boxNum">
            <span @click="boxNoClick($event)">
              <Input type="text" v-model="filterObj.boxNum" clearable readonly placeholder="请选择盒子编号"></Input>
            </span>
          </FormItem>
          <div class="cargoArea">
            <FormItem label="货区" prop="cargoAreaId">
              <Select
                style="width: 200px;"
                v-model="filterObj.cargoAreaId"
                :disabled='cargoSelectDisable'
                placeholder="请选择盒子编号后再选择货区"
                @on-change="handleSelect">
                <Option
                v-for="(item,index) in cargoAreaOptions"
                :key="index"
                :value="item.layerId"
                >{{item.layerNo}}</Option>
              </Select>
            </FormItem>
            <FormItem label="商品">
              <Input type="text" v-model="filterObj.goodsName" :disabled='goodsNameDisable' readonly placeholder="商品名称"></Input>
            </FormItem>
            <FormItem label="数量">
              <InputNumber
                :disabled='numDisable'
                :max='999'
                :min='1'
                clearable
                v-model="filterObj.num"
                @on-focus="$event.target.select()"
                >
              </InputNumber>
            </FormItem>
            <IncreaseBtn @click="handleIncrease" :disabled='increaseDisable' style="margin-left: 12px;margin-top: 1px;"/>
          </div>
          <FormItem prop="supplyOrderItems" label="商品列表">
            <Table
              border
              height="240"
              :columns="columns"
              :data="filterObj.supplyOrderItems">
              <div slot="footer" class='table_footer' style="border-top: 1px solid #e8eaec;padding-left: 6px;">
                <p style="padding-left: 6px;">合计： <span>{{allTotals}}</span> 元</p>
              </div>
            </Table>
          </FormItem>
          <FormItem label='订单类型' prop="orderType">
            <Select v-model="filterObj.orderType" clearable placeholder="请选择订单类型" @on-change='orderTypeSelect'>
                <Option
                v-for="(item,index) in orderTypeOptions"
                :key="index"
                :value="item.emitId"
                >{{item.emitName}}</Option>
              </Select>
          </FormItem>
          <FormItem :label='phoneType' prop="phone">
            <Input @on-blur='handlePhoneBlur' :maxlength="11" v-model="filterObj.phone" placeholder="请输入客户电话"></Input>
          </FormItem>
          <FormItem label="下单时间" prop="orderDate">
            <!-- @on-clear='handleClear' -->
            <DatePicker
            clearable
            type="datetime"
            placeholder="请选择日期"
            v-model="filterObj.orderDate">
           </DatePicker>
          </FormItem>
          <FormItem>
            <ZBtn @click="handleSubmission" :loading='submissionLoading'>
              {{submissionLoading ? '提交中' : '立即提交'}}
            </ZBtn>
            <ResetBtn @click="handleReset"/>
          </FormItem>
        </Form>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getCargoArea, submitOrder } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'SupplyOrder',
  components: {
  },
  data () {
    return {
      cargoSelectDisable: true,
      goodsNameDisable: true,
      numDisable: true,
      increaseDisable: true,
      filterObj: {
        boxNum: '',
        boxId: '',
        cargoAreaId: '',
        layerNo: '',
        goodsName: '',
        price: null,
        num: 1,
        orderType: null,
        phone: '',
        supplyOrderItems: [],
        orderDate: new Date()
      },
      allTotals: '0.00',
      phoneType: '客户电话',
      cargoAreaOptions: [],
      columns: [
        {
          title: '货区',
          key: 'layerNo',
          minWidth: 50
        },
        {
          title: '商品',
          key: 'goodsName',
          minWidth: 120
        },
        {
          title: '单价',
          key: 'price',
          minWidth: 80
        },
        {
          title: '数量',
          key: 'numbers',
          minWidth: 60
        },
        {
          title: '小计',
          key: 'total',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'active',
          minWidth: 100,
          render: (h, params) => h('DelBtn', {
            on: {
              click: () => {
                this.filterObj.supplyOrderItems.splice(params.row._index, 1);
                this.computedTotal();
                this.$refs.filterObj.validateField('supplyOrderItems');
              }
            }
          })
        }
      ],
      orderTypeOptions: [
        {
          emitId: 2,
          emitName: '代购订单'
        },
        {
          emitId: 3,
          emitName: '挂单订单'
        }
      ],
      ruleValidate: {
        boxNum: this.$rulesChange('请输入盒子编号'),
        // cargoAreaId: this.$rulesChange('请选择一个货区'),
        orderType: this.$rulesChange('请选择一种订单类型', 'number'),
        phone: this.$rulesBlur('请输入手机号码'),
        orderDate: this.$rulesBlur('请选择日期'),
        supplyOrderItems: this.$rulesChange('商品列表不能为空', 'array')
      },
      submissionLoading: false
    };
  },
  created () {
    this.$g_on('supplyOrderBoxNoSelect', this.supplyOrderBoxNoSelect);
    this.$g_on('clearSupplyOrderModal', this.handleReset);
  },
  beforeDestroy () {
    this.$g_off('supplyOrderBoxNoSelect', this.supplyOrderBoxNoSelect);
    this.$g_off('clearSupplyOrderModal', this.handleReset);
  },
  methods: {
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.setBoxModal(true);
    },
    // 选择盒子编号
    supplyOrderBoxNoSelect (row) {
      this.filterObj.boxNum = row.boxNo;
      this.filterObj.boxId = row.id;
      this.setBoxModal(false);
      this.getCargoAreaOptions(row.id);
    },
    // 查询货区列表
    getCargoAreaOptions (boxId) {
      const changeData = this.filterObj;
      getCargoArea(boxId).then(({ success, data, msg }) => {
        if (success) {
          this.cargoAreaOptions = data;
          changeData.cargoAreaId = '';
          changeData.layerNo = '';
          changeData.goodsName = '';
          changeData.num = 1;
          changeData.orderType = null;
          changeData.phone = '';
          changeData.orderDate = new Date();
          changeData.supplyOrderItems = [];
          this.allTotals = '0.00';
        } else {
          this.$error(msg);
        }
      });
    },
    // 添加货区
    handleIncrease () {
      const haveAreaId = this.filterObj.cargoAreaId;
      if (!haveAreaId) {
        this.$error('请选择一个货区');
      } else {
        const that = this.filterObj;
        const haveSome = that.supplyOrderItems.some(x => x.layerId === that.cargoAreaId);
        if (haveSome) {
          this.$error('商品已加入表格，不能加入');
          return false;
        }
        const tableList = {
          layerId: that.cargoAreaId,
          layerNo: that.layerNo,
          goodsName: that.goodsName,
          price: that.price,
          numbers: that.num,
          total: (that.price * that.num).toFixed(2)
        };
        that.supplyOrderItems.push(tableList);
        this.computedTotal();
        this.$refs.filterObj.validateField('supplyOrderItems');
      }
    },
    // 计算合计
    computedTotal () {
      let allMoney = 0;
      this.filterObj.supplyOrderItems.map((x) => {
        allMoney += Number(x.total);
      });
      this.allTotals = allMoney.toFixed(2);
    },
    handleSelect (val) {
      this.cargoAreaOptions.map((v) => {
        if (v.layerId === val) {
          this.filterObj.goodsName = v.goodsName;
          this.filterObj.price = v.price;
          this.filterObj.layerNo = v.layerNo;
          this.filterObj.num = 1;
        }
      });
    },
    orderTypeSelect (val) {
      val === 2 ? this.phoneType = '代购员电话' : this.phoneType = '客户电话';
    },
    handlePhoneBlur (event) {
      const myreg = /^(([1][3,4,5,6,7,8,9][0-9]{9})|([9][2,8][0-9]{9}))$/;
      const val = event.target.value.trim();
      const tempVal = parseFloat(val);
      if (isNaN(tempVal)) {
        this.filterObj.phone = '';
      } else if (!myreg.test(tempVal)) {
        this.filterObj.phone = '';
        this.$error('手机号码格式不对');
      } else {
        this.filterObj.phone = tempVal;
      }
    },
    async handleSubmission () {
      this.$refs.filterObj.validate(async (valid) => {
        if (valid) {
          const that = this.filterObj;
          const reData = that.supplyOrderItems.map(v => ({
            layer_id: v.layerId,
            quantity: v.numbers
          }));
          this.submissionLoading = true;
          const { success, data, msg } = await submitOrder({
            box_id: that.boxId,
            order_type: that.orderType,
            mobile: that.phone.toString(),
            created_time: this.$formatTime(that.orderDate),
            details: reData
          });
          if (success) {
            this.$success('添加订单成功！');
            this.handleReset();
            this.setSupplyOrderModal(false);
            this.reload();
            setTimeout(() => {
              this.$openOrderDetail({
                orderSn: data.order_sn
              });
            }, 1000);
          } else {
            this.$error(msg);
          }
          this.submissionLoading = false;
        }
      });
    },
    handleReset () {
      this.filterObj = {
        boxNum: '',
        boxId: '',
        cargoAreaId: '',
        layerNo: '',
        goodsName: '',
        price: null,
        num: 1,
        orderType: null,
        phone: '',
        supplyOrderItems: [],
        orderDate: new Date()
      };
      this.cargoAreaOptions = [];
      this.allTotals = '0.00';
      this.$refs.filterObj.resetFields();
    }
  },
  watch: {
    'filterObj.boxNum': function (val) {
      if (!val) {
        this.handleReset();
        this.cargoSelectDisable = true;
        this.goodsNameDisable = true;
        this.numDisable = true;
        this.increaseDisable = true;
      } else {
        this.cargoSelectDisable = false;
        this.goodsNameDisable = false;
        this.numDisable = false;
        this.increaseDisable = false;
      }
    }
  }
};
</script>

<style lang='less'>
.supplyOrder{
  .cargoArea{
    .ivu-form-item{
      display: inline-block;
    }
  }
  ::-webkit-input-placeholder{
      color:#c5c8ce;
  }
  ::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:#c5c8ce;
  }
  :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:#c5c8ce;
  }
  :-ms-input-placeholder{  /* Internet Explorer 10-11 */
      color:#c5c8ce;
  }
}
</style>
