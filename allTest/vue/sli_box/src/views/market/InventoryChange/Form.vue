<template>
   <Form inline style="text-align:left">
      <RefreshBtn @click="handleRefresh"/>
      <FormItem label='订单编号'>
        <Input type="text" v-model="filterObj.orderNum" clearable placeholder="订单编号"></Input>
      </FormItem>
      <FormItem label='盒子编号'>
        <Input type="text" v-model="filterObj.boxNum" clearable placeholder="请输入盒子编号"></Input>
      </FormItem>
      <FormItem label='货区编号'>
          <Input type="text" v-model="filterObj.layerNo" clearable placeholder="货区编号"></Input>
      </FormItem>
      <FormItem label='商品名称'>
          <Input v-model="filterObj.nameSelect" clearable filterable placeholder="搜索"></Input>
      </FormItem>
      <FormItem label='记录时间' style="width: 400px;">
          <DatePicker style="width: 300px;" type="datetimerange" placeholder="请选择起始记录时间" v-model="filterObj.dateChange"></DatePicker>
      </FormItem>
      <FormItem label='操作类型'>
          <Select v-model="filterObj.typeSelect" clearable filterable placeholder="所有类型">
                <Option v-for="item in typeList" :value="item.enum_id" :key="item.value">{{ item.enum_name }}</Option>
          </Select>
      </FormItem>
      <FormItem>
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="handleReset"/>
      </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import apiGetList from './api/get-typeList';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'InventoryForm',
  // mixins: [vuexMixins({moduleName: 'inventoryChange'})],
  mounted () {
    apiGetList({
      param_key: 'wd_box_inventory_log_type'
    }).then((res) => {
      const data = res.data;
      this.typeList = data;
    });
  },
  data () {
    return {
      filterObj: {
        orderNum: '',
        boxNum: '',
        layerNo: '',
        nameSelect: '',
        dateChange: ['', ''],
        typeSelect: ''
      },
      typeList: []
    };
  },
  methods: {
    // 刷新
    handleRefresh () {
      this.reload();
    },
    handleSubmit () {
      if (this.filterObj.dateChange[0] || this.filterObj.dateChange[1]) {
        this.filterData({
          order_sn: this.filterObj.orderNum,
          box_no: this.filterObj.boxNum,
          layer_no: this.filterObj.layerNo,
          goods_name: this.filterObj.nameSelect,
          start_time: this.$formatTime(this.filterObj.dateChange[0], 'ymd-hms'),
          end_time: this.$formatTime(this.filterObj.dateChange[1], 'ymd-hms'),
          type: this.filterObj.typeSelect
        });
      } else {
        this.filterData({
          order_sn: this.filterObj.orderNum,
          box_no: this.filterObj.boxNum,
          layer_no: this.filterObj.layerNo,
          goods_name: this.filterObj.nameSelect,
          type: this.filterObj.typeSelect
        });
      }
    },
    handleReset () {
      this.filterObj = {
        orderNum: '',
        boxNum: '',
        layerNo: '',
        nameSelect: '',
        dateChange: ['', ''],
        typeSelect: ''
      };
      this.clearFilter();
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
