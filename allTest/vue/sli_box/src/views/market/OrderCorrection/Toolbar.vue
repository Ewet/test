<template>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleSubmit"/>
       <FormItem label="盒子编码">
            <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编码">
            </Input>
       </FormItem>
       <FormItem label='操作时间' class="datePicker">
            <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.operationTime"
          type="datetimerange"
          placeholder="操作时间"
          ></DatePicker>
       </FormItem>
       <FormItem label="订单号">
            <Input type="text" v-model="filterObj.orderSn" placeholder="订单号">
            </Input>
       </FormItem>
       <FormItem label="操作类型">
            <Select  v-model="filterObj.operationType"  placeholder="操作类型" clearable>
                <Option value="0">收款</Option>
                <Option value="1">退款</Option>
            </Select>
       </FormItem>
       <FormItem label="操作状态">
            <Select  v-model="filterObj.operationState"  placeholder="操作状态" clearable>
                 <Option value="0">退款中</Option>
                 <Option value="1">退款成功</Option>
                 <Option value="2">退款失败</Option>
                 <Option value="3">收款中</Option>
                 <Option value="4">收款成功</Option>
                 <Option value="6">关闭</Option>
            </Select>
       </FormItem>

            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
            <ZBtn
              @click="handleExport"
            >
              结果导出
            </ZBtn>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { exportReport } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'OrderCorrectionToolbar',
  data () {
    return {
      filterObj: {
        boxNo: '',
        operationTime: [],
        orderSn: '',
        operationType: '',
        operationState: ''
      }
    };
  },
  mounted () {
    const time = this.getTime();
    this.filterObj = {
      boxNo: '',
      operationTime: time,
      orderSn: '',
      operationType: '',
      operationState: ''
    };
  },
  created () {
    this.$g_on('setFilterAddRefunds', this.filterAddRefunds);
  },
  beforeDestroy () {
    this.$g_off('setFilterAddRefunds', this.filterAddRefunds);
  },
  methods: {
    // 结果导出
    handleExport () {
      let startTime = '';
      let endTime = '';
      if (this.filterObj.operationTime[0] && this.filterObj.operationTime[1]) {
        startTime = this.$formatTime(this.filterObj.operationTime[0]);
        endTime = this.$formatTime(this.filterObj.operationTime[1]);
      }
      exportReport({
        box_no: this.filterObj.boxNo,
        created_time_begin: startTime,
        created_time_end: endTime,
        order_sn: this.filterObj.orderSn,
        op_type: this.filterObj.operationType,
        status: this.filterObj.operationState
      });
    },
    // 刷新
    handleRefresh () {
      this.reload();
    },
    // 查询
    handleSubmit () {
      console.log(this.filterObj.operationTime);
      let startTime = '';
      let endTime = '';
      if (this.filterObj.operationTime[0] && this.filterObj.operationTime[1]) {
        startTime = this.$formatTime(this.filterObj.operationTime[0]);
        endTime = this.$formatTime(this.filterObj.operationTime[1]);
      }

      this.filterData({
        box_no: this.filterObj.boxNo,
        created_time_begin: startTime,
        created_time_end: endTime,
        order_sn: this.filterObj.orderSn,
        op_type: this.filterObj.operationType,
        status: this.filterObj.operationState
      });
    },
    // 新增完的刷新页面
    filterAddRefunds () {
      const time = this.getTime();
      this.filterObj = {
        operationTime: time
      };
      this.handleSubmit();
    },
    // 重置
    handleReset () {
      const time = this.getTime();
      this.filterObj = {
        boxNo: '',
        operationTime: time,
        orderSn: '',
        operationType: '',
        operationState: ''
      };
      this.filterData({
        created_time_begin: time[0],
        created_time_end: time[1]
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
