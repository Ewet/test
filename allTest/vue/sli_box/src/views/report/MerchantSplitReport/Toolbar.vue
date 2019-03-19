<template>
   <div class="merchantSplitReportForm">
     <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='下单日期' class="datePicker">
            <DatePicker type="datetimerange" v-model="filterObj.orderTime" placeholder="请输入下单日期"></DatePicker>
        </FormItem>
        <FormItem label='商户名称'>
          <span @click="merchantNameClick($event)">
            <Input type="text" v-model="filterObj.ownedMerchant" clearable readonly placeholder="请输入商户名称"></Input>
          </span>
        </FormItem>
        <FormItem label='盒子编号'>
          <span @click="boxNoClick($event)">
            <Input type="text" v-model="filterObj.boxNum" clearable readonly placeholder="请输入盒子编号"></Input>
          </span>
        </FormItem>
        <FormItem label='状态'>
          <Select v-model="filterObj.styleSelect" placeholder="请选择">
                <Option v-for="item in styleList" :value="item.enum_id" :key="item.enum_id">{{item.enum_name}}</Option>
          </Select>
        </FormItem>
        <FormItem style="width: 310px;">
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportOrderBtn @click="handleExportOrderBtn"/>
          <ExportGoods @click="handleExportMerchantBtn"/>
        </FormItem>
    </Form>
    <Modal
      title="选择商户"
      v-model="showMerchantModal"
      :footer-hide = "true"
      style="z-index:1001;"
      >
      <MerchantSelect @itemSelect="merchantNameSelect"/>
    </Modal>
    <Modal
          title="选择盒子"
          :value="showBoxModal"
          :footer-hide = "true"
          style="z-index:1001;"
          width=800
          @on-cancel="setBoxModal">
          <BoxSelect @itemSelect="boxNoSelect"/>
        </Modal>
   </div>
</template>

<script>
import { getZeroTimeNextWeek } from 'utils/date';
import vuexMixins from 'mixins/module-map';
import { ExportOrder, ExportMerchant } from 'views/report/MerchantSplitReport/model';

export default {
  mixins: [vuexMixins({ moduleName: 'merchantSplitReport' })],
  name: 'MerchantSplitReportForm',
  components: {
  },
  data () {
    return {
      showMerchantModal: false,
      showBoxModal: false,
      filterObj: {
        orderTime: getZeroTimeNextWeek(),
        ownedMerchant: '',
        boxNum: '',
        styleSelect: '1'
      },
      styleList: [
        {
          enum_id: '0',
          enum_name: '未分成'
        },
        {
          enum_id: '1',
          enum_name: '已分成'
        }
      ]
    };
  },
  mounted () {
    this.filterData(this.loadData());
  },
  methods: {
    loadData () {
      const that = this.filterObj;
      let params = {
        name: that.ownedMerchant,
        box_no: that.boxNum,
        type: that.styleSelect
      };
      if (that.orderTime.length && that.orderTime.every(x => !!x)) {
        params = {
          ...params,
          created_time_begin: this.$formatTime(that.orderTime[0]),
          created_time_end: this.$formatTime(that.orderTime[1])
        };
      }
      return params;
    },
    handleRefresh () {
      this.reload();
    },
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    merchantNameSelect (row) {
      this.filterObj.ownedMerchant = row.merchantName;
      this.showMerchantModal = false;
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
    setBoxModal () {
      this.showBoxModal = false;
    },
    handleSubmit () {
      this.filterData(this.loadData());
    },
    handleReset () {
      this.filterObj = {
        orderTime: getZeroTimeNextWeek(),
        ownedMerchant: '',
        boxNum: '',
        styleSelect: '1'
      };
      this.$nextTick((x) => {
        this.filterData(this.loadData());
      });
    },
    handleExportOrderBtn () {
      const data = this.loadData();
      ExportOrder(data);
    },
    handleExportMerchantBtn () {
      const data = this.loadData();
      ExportMerchant(data);
    }
  }
};
</script>

<style scoped lang='less'>
</style>
