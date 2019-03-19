<template>
    <Form inline class="toolBarForm">
       <RefreshBtn @click="handleRefresh"/>
      <FormItem label="创建时间" class="datePicker">
         <DatePicker
         v-model="filterObj.create_time"
         type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
         placeholder="创建时间"
         style="width: 300px"></DatePicker>
          </FormItem>
       <FormItem label="领劵中心">
          <Select v-model="filterObj.coupon_center_visible" placeholder="领劵中心" :clearable="true">
            <Option
            label="显示"
            value="1"
            ></Option>
            <Option
            label="不显示"
            value="0"
            ></Option>
          </Select>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="filterObj.coupon_type" placeholder="类型" :clearable="true">
            <Option
            label="满减"
            value="1"
            ></Option>
            <Option
            label="折扣"
            value="2"
            ></Option>
          </Select>
        </FormItem>
        <FormItem label="优惠劵名称">
         <Input type="text" v-model="filterObj.couponName" placeholder="优惠劵名称">
          </Input>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import fecha from 'fecha';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CouponToolbar',
  data () {
    return {
      filterObj: {
        coupon_center_visible: '',
        coupon_type: '',
        couponName: '',
        create_time: []
      }
    };
  },
  methods: {
    // 刷新
    handleRefresh () {
      this.reload();
    },
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      const createTime = this.filterObj.create_time;
      if (createTime.length && createTime.every(x => !!x) > 0) {
        startTime = fecha.format(createTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(createTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      this.filterData(Object.assign({
        name: this.filterObj.couponName,
        coupon_center_visible: this.filterObj.coupon_center_visible,
        coupon_type: this.filterObj.coupon_type,
        create_time_start: startTime,
        create_time_end: endTime
      }));
    },
    handleReset () {
      this.filterObj = {
        coupon_center_visible: '',
        coupon_type: '',
        couponName: '',
        create_time: []
      };
      this.clearFilter();
    }
  }
};
</script>
