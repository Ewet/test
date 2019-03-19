<template>
    <div class='salesPlanEdit'>
      <Form ref="salesPlanForm" :model="salesPlanForm" :rules='ruleValidate' class='content' :label-width="86">
        <FormItem label='计划类型' prop='planType'>
          <Select v-model="salesPlanForm.planType" clearable placeholder="计划类型" @on-change='change'>
                <Option v-for="item in planTypeList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
          </Select>
        </FormItem>
        <div v-show="isUpdown">
          <div v-show='isChangePrice'>
            <FormItem label='商品' prop='goodsName'>
              <span @click="goodsNameClick($event)">
                <Input @on-click.stop  placeholder="请输入商品名称" readonly clearable :value="goodsName" @input="updateMessage"></Input>
              </span>
            </FormItem>
          </div>
          <FormItem label='商品售价' prop='goodsPrice'>
              <InputNumber
              @on-focus="$event.target.select()"
              :max="100000" v-model="salesPlanForm.goodsPrice" clearable placeholder="请输入商品售价"></InputNumber >
          </FormItem>
        </div>
        <FormItem label='执行时间' prop='dateChange'>
          <DatePicker type="datetime" :options="timeLega" placeholder="请选择起始记录时间" v-model="salesPlanForm.dateChange"></DatePicker>
        </FormItem>
      </Form>
      <Button style='float:right;margin:40px 0 10px' @click="cancel('salesPlanForm')">关闭</Button>
      <Button style='float:right;margin:40px 10px 10px 0' @click="addOk('salesPlanForm')">确定</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getDictionary } from 'model/dictionary';
import { addPlans } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'SalesPlan',
  data () {
    return {
      isUpdown: true,
      isChangePrice: true,
      timeLega: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      salesPlanForm: {
        planType: '',
        goodsPrice: null,
        dateChange: ''
      },
      planTypeList: [],
      ruleValidate: {
        planType: [
          { required: true, validator: this.validatePlanType, trigger: 'change' }
        ],
        goodsName: [
          { required: true, validator: this.validateGoodsName, trigger: 'change' }
        ],
        goodsPrice: [
          { required: true, trigger: 'blur', validator: this.validateneGoodsPrice }
        ],
        dateChange: [
          { required: true, validator: this.validateDateChange, trigger: 'change' }
        ]
      }
    };
  },
  created () {
    this.$g_on('clearSalesPlanForm', this.clearSalesPlanForm);
  },
  beforeDestroy () {
    this.$g_off('clearSalesPlanForm', this.clearSalesPlanForm);
  },
  methods: {
    change (val) {
      if (val === '3') {
        this.setGoodsId(this.SaleGoodsId);
        this.isUpdown = false;
        this.isChangePrice = false;
      } else if (val === '2') {
        this.setGoodsId(this.SaleGoodsId);
        this.isUpdown = true;
        this.isChangePrice = false;
        // 调价清空价格
        this.setGoodsPrice(null);
      } else {
        this.setGoodsName('');
        this.setGoodsPrice(null);
        this.isUpdown = true;
        this.isChangePrice = true;
      }
    },
    validatePlanType (rule, value, callback) {
      if (!value) {
        callback(new Error('请选择一种计划类型'));
      } else {
        callback();
      }
    },
    validateGoodsName (rule, value, callback) {
      if (!this.goodsName) {
        callback(new Error('商品不能为空'));
      } else {
        callback();
      }
    },
    validateneGoodsPrice (rule, value, callback) {
      if (value === null) {
        callback(new Error('售价不能为空'));
      } else {
        callback();
      }
    },
    validateDateChange (rule, value, callback) {
      if (!value) {
        callback(new Error('时间不能为空'));
      } else {
        callback();
      }
    },
    updateMessage () {
      this.setGoodsName('');
      this.setGoodsPrice(null);
    },
    clearSalesPlanForm () {
      this.cancel('salesPlanForm');
    },
    goodsNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.setGoodsModal(true);
    },
    async addPlansApi () {
      const { success, msg } = await addPlans({
        layer_id: this.layerId,
        plan_type: this.salesPlanForm.planType,
        goods_id: this.goodsId,
        price: this.salesPlanForm.goodsPrice,
        planned_time: this.$formatTime(new Date(this.salesPlanForm.dateChange), 'ymd-hms')
      });
      if (success) {
        this.$success('计划添加成功！');
      } else {
        this.$error(`计划添加失败！${msg}`);
      }
      this.cancel('salesPlanForm');
      this.pageChange(this.page);
    },
    addOk (name) {
      if (this.isUpdown && this.isChangePrice) {
        // 全部
        this.$refs[name].validate((valid) => {
          if (valid) {
            // true
            // 请求接口
            this.addPlansApi();
          }
        });
      } else if (this.isUpdown && !this.isChangePrice) {
        // 调价
        this.$refs[name].validateField('planType', (type) => {
          if (type === '') {
            this.$refs[name].validateField('goodsPrice', (price) => {
              if (price === '') {
                this.$refs[name].validateField('dateChange', (val) => {
                  if (val === '') {
                    this.addPlansApi();
                  }
                });
              }
            });
          }
        });
      } else {
        // 下架
        this.$refs[name].validateField('planType', (valid) => {
          if (valid === '') {
            this.$refs[name].validateField('dateChange', (val) => {
              if (val === '') {
                this.addPlansApi();
              }
            });
          }
        });
      }
    },
    cancel (name) {
      this.$refs[name].resetFields();
      this.setGoodsName('');
      this.setGoodsId('');
      this.setModal(false);
      this.setGoodsPrice(null);
    }
  },
  mounted () {
    getDictionary({
      param_key: 'wd_box_selling_plan_type'
    }).then((res) => {
      if (res.msg === 'success') {
        this.planTypeList = res.data;
      }
    });
  },
  watch: {
    goodsPrice (val) {
      this.salesPlanForm.goodsPrice = val;
    }
  }

};
</script>
<style lang='less'>
.salesPlanEdit{
  clear: both;
  overflow: hidden;
  .img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .content{
    height: 440px;
  }
  .content .ivu-form-item{
    margin-bottom: 24px;
  }
  label.ivu-form-item-label,.ivu-input-number-input-wrap,
  .ivu-input-number-input,.ivu-input,.ivu-select-input,
  .ivu-input-icon,.ivu-select-single .ivu-select-selection{
    height: 38px;
  }
  .content .ivu-select,.ivu-input-wrapper,.ivu-input-number{
    width: 90%;
    height: 38px;
  }
  .ivu-date-picker{
    width: 100%;
  }
  .ivu-input-number-handler-wrap{
    width: 0px;
  }
  .ivu-select-dropdown{
    z-index: 999;
  }
  ::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:#999;
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:#999;
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
  }
}
</style>
