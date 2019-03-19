<template>
<div class='form'>
    <Form inline>
      <FormItem style="width: 470px;">
        <Select selected='time1' style="width: 140px;margin-right: 10px;" v-model="filterObj.timeStyle" filterable>
              <Option name='time1' value='0'>支付时间</Option>
              <Option name='time2' value='1'>下单时间</Option>
        </Select>
        <DatePicker style="width: 300px;" type="datetimerange" placeholder="请选择时间" v-model="filterObj.dateChange"></DatePicker>
      </FormItem>
      <FormItem style="width: 140px;">
              <Checkbox v-model="filterObj.checkSelectFirst" checked label="3">已挂单</Checkbox>
              <Checkbox v-model="filterObj.checkSelectSecond" label="20">已支付</Checkbox>
      </FormItem>
      <FormItem label='商户名称'>
        <span @click="merchantNameClick($event)">
          <Input type="text" v-model="filterObj.nameSelect" clearable readonly placeholder="请输入商户名称"></Input>
        </span>
          <!-- <Select v-model="filterObj.nameSelect" clearable filterable placeholder="搜索">
                <Option value="beijing">lsjdjsdjksdjksd</Option>
          </Select> -->
      </FormItem>
      <FormItem label='盒子编号'>
        <span @click="boxNoClick($event)">
          <Input type="text" v-model="filterObj.boxNum" clearable readonly placeholder="请输入盒子编号"></Input>
        </span>
          <!-- <Select v-model="filterObj.boxNum" clearable filterable placeholder="搜索">
                <Option value="beijing">lsjdjsdjksdjksd</Option>
          </Select> -->
      </FormItem>
      <FormItem style="width: 320px;">
        <Button type="primary" @click="handleSubmit">查询</Button>&nbsp;
        <Button type="primary" @click="reset">重置</Button>&nbsp;
        <Button type="primary" @click='saleExport'>导出</Button>&nbsp;
        <Button type="primary" @click='saleExportDetail'>导出明细</Button>
      </FormItem>
   </Form>
   <Modal
      title="选择盒子"
      v-model="showBoxModal"
      :footer-hide = "true"
      style="z-index:1001;"
      width=800
      >
      <BoxSelect @itemSelect="boxNoSelect"/>
    </Modal>
    <Modal
      title="选择商户"
      v-model="showMerchantModal"
      :footer-hide = "true"
      style="z-index:1001;"
      >
      <MerchantSelect @itemSelect="merchantNameSelect"/>
    </Modal>
</div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { EXDetail, saleExportList } from './model';
import { STORE_NAME } from './store';
import { getLastWeek } from 'utils/date';

export default {
  name: 'SalesReportIndex',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      showBoxModal: false,
      showMerchantModal: false,
      filterObj: {
        timeStyle: '1',
        dateChange: getLastWeek({ returnType: 'string' }),
        nameSelect: '',
        boxNum: '',
        checkSelectFirst: false,
        checkSelectSecond: true
      }
    };
  },
  components: {
  },
  mounted () {
    const that = this.filterObj;
    this.filterData({
      created_time_start: this.$formatTime(that.dateChange[0]),
      created_time_end: this.$formatTime(that.dateChange[1]),
      plf_order_time_type: this.filterObj.timeStyle,
      paid_status: '20',
      merchant_name: '',
      box_no: '',
      order_type: '',
      'pagination[page_size]': 10000
    });
  },
  methods: {
    EXJudgeData () {
      const filterItem = this.filterObj;
      let orderType = filterItem.checkSelectFirst;
      let paidStatus = filterItem.checkSelectSecond;
      if (!orderType && !paidStatus) {
        this.$error('已挂单和已支付选项请至少选择一项！');
        return false;
      }
      orderType = orderType ? '3' : '';
      paidStatus = paidStatus ? '20' : '';
      const noTimeForm = {
        merchant_name: filterItem.nameSelect,
        box_no: filterItem.boxNum,
        order_type: orderType,
        paid_status: paidStatus,
        plf_order_time_type: filterItem.timeStyle
      };
      if (filterItem.timeStyle === '0') {
        if (filterItem.dateChange[0] || filterItem.dateChange[1]) {
          noTimeForm.paid_time_start = this.$formatTime(filterItem.dateChange[0]);
          noTimeForm.paid_time_end = this.$formatTime(filterItem.dateChange[1]);
          return noTimeForm;
        }
        this.$error('支付时间必填');
      } else if (filterItem.timeStyle === '1') {
        if (filterItem.dateChange[0] || filterItem.dateChange[1]) {
          noTimeForm.created_time_start = this.$formatTime(filterItem.dateChange[0]);
          noTimeForm.created_time_end = this.$formatTime(filterItem.dateChange[1]);
          return noTimeForm;
        }
        this.$error('下单时间必填');
      }
    },
    saleExport () {
      if (this.EXJudgeData()) {
        saleExportList(this.EXJudgeData());
      } else {
        return false;
      }
    },
    saleExportDetail () {
      if (this.EXJudgeData()) {
        EXDetail(this.EXJudgeData());
      } else {
        return false;
      }
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
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    merchantNameSelect (row) {
      this.filterObj.nameSelect = row.merchantName;
      this.showMerchantModal = false;
    },
    handleSubmit () {
      const timeForm = this.EXJudgeData();
      if (timeForm) {
        this.filterData(
          timeForm
        );
      } else {
        return false;
      }
    },
    reset () {
      this.filterObj = {
        timeStyle: '1',
        nameSelect: '',
        dateChange: getLastWeek({ returnType: 'string' }),
        boxNum: '',
        checkSelectFirst: false,
        checkSelectSecond: true
      };
      this.filterData({
        created_time_start: this.$formatTime(this.filterObj.dateChange[0]),
        created_time_end: this.$formatTime(this.filterObj.dateChange[1]),
        plf_order_time_type: '1',
        order_type: '',
        paid_status: '20'
      });
    }
  },
  watch: {
    showBoxModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshBoxList');
      }
    },
    showMerchantModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshMerchantList');
      }
    }
  }
};
</script>

<style scoped>
.ivu-form-item{
  width: 240px;
}
.ivu-form-item-label{
  width: 30%;
}
.ivu-input-wrapper{
  width: 70%;
}
.ivu-select{
  width: 70%;
}
</style>
