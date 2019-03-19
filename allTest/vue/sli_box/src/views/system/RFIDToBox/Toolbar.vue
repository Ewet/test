<template>
    <Form inline class="toolBarForm toolBarFormStyle">
       <FormItem label="盒子编号">
            <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编号">
            </Input>
       </FormItem>
       <FormItem label="商品bom码">
            <Input type="text" v-model="filterObj.bomSn" placeholder="商品bom号">
            </Input>
       </FormItem>
       <FormItem label='入库时间' class="datePicker">
            <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.enterLibraryTime"
          type="datetimerange"
          placeholder="入库时间"
          ></DatePicker>
       </FormItem>
       <FormItem label='出库时间' class="datePicker">
            <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.outLibraryTime"
          type="datetimerange"
          placeholder="出库时间"
          ></DatePicker>
       </FormItem>

       <FormItem label="状态">
            <RadioGroup v-model="filterObj.state">
                <Radio label="">全部</Radio>
                <Radio label="1">在售</Radio>
                <Radio label="0">已售</Radio>
            </RadioGroup>
       </FormItem>
       <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
       </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RFIDToBoxToolbar',
  data () {
    return {
      filterObj: {
        boxNo: '', // 盒子编号
        bomSn: '', // 商品bom号
        enterLibraryTime: [], // 入库时间
        outLibraryTime: [], // 出库时间
        state: '' // 状态
      }
    };
  },
  mounted () {
    const time = this.getTime();
    this.filterObj = {
      boxNo: '', // 盒子编号
      bomSn: '', // 商品bom号
      enterLibraryTime: time, // 入库时间
      outLibraryTime: time, // 出库时间
      state: '' // 状态
    };
  },
  methods: {
    // 查询
    handleSubmit () {
      console.log(this.filterObj.operationTime);
      let startTimeEnter = '';
      let endTimeEnter = '';
      let startTimeOut = '';
      let endTimeOut = '';
      if (this.filterObj.enterLibraryTime[0] && this.filterObj.enterLibraryTime[1]) {
        startTimeEnter = this.$formatTime(this.filterObj.enterLibraryTime[0]);
        endTimeEnter = this.$formatTime(this.filterObj.enterLibraryTime[1]);
      }
      if (this.filterObj.outLibraryTime[0] && this.filterObj.outLibraryTime[1]) {
        startTimeOut = this.$formatTime(this.filterObj.outLibraryTime[0]);
        endTimeOut = this.$formatTime(this.filterObj.outLibraryTime[1]);
      }

      this.filterData({
        box_no: this.filterObj.boxNo, // 盒子编号
        bom_code: this.filterObj.bomSn, // 商品bom号
        status: this.filterObj.state, // 状态
        checkin_time_start: startTimeEnter, // 入库时间
        checkin_time_end: endTimeEnter, // 入库时间
        checkout_time_start: startTimeOut, // 出库时间
        checkout_time_end: endTimeOut // 出库时间
      });
    },
    // 转时间戳
    timeStamp (str) {
      const time = new Date(str);
      return time.getTime();
    },
    // 重置
    handleReset () {
      const time = this.getTime();
      this.filterObj = {
        boxNo: '', // 盒子编号
        bomSn: '', // 商品bom号
        enterLibraryTime: time, // 入库时间
        outLibraryTime: time, // 出库时间
        state: '' // 状态
      };
      this.filterData({
        checkin_time_start: time[0], // 入库时间
        checkin_time_end: time[1], // 入库时间
        checkout_time_start: time[0], // 出库时间
        checkout_time_end: time[1], // 出库时间
        state: '' // 状态
      });
    },
    // 获取最近一周时间
    getTime () {
      const nowTime = new Date().setHours(0, 0, 0, 0);
      const tomorrowTime = nowTime + 24 * 60 * 60 * 1000;
      const lastTime = nowTime - 7 * 24 * 60 * 60 * 1000;
      return [this.$formatTime(lastTime), this.$formatTime(tomorrowTime)];
    }

  }
};
</script>

<style lang="less">
  .toolBarFormStyle{
    .ivu-radio-wrapper{
      padding-bottom: 4px !important;
    }
  }
</style>
