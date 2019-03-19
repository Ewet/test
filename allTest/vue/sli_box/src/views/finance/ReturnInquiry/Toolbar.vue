
<template>
    <Form inline class="toolBarForm">

        <RefreshBtn @click="handleRefresh"/>
        <FormItem class="datePicker" label="退货日期">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.refundTime"
          type="datetimerange"
          placeholder="退货日期"
          ></DatePicker>
        </FormItem>
        <FormItem label="会员Id">
            <Input type="text" v-model="filterObj.userId" placeholder="会员Id">
            </Input>
        </FormItem>
        <FormItem label="订单号">
            <Input type="text" v-model="filterObj.orderId" placeholder="订单号">
            </Input>
        </FormItem>
        <FormItem label="退货单号">
            <Input type="text" v-model="filterObj.refundSn" placeholder="退货单号">
            </Input>
        </FormItem>
         <FormItem label="状态">
            <Select v-model="filterObj.refundStatus" clearable placeholder="状态">
                <Option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
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
import { getStatus } from 'views/finance/PendingConfirmed/model';
import fecha from 'fecha';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RefundInquiryToolbar',
  data () {
    return {
      filterObj: {
        refundTime: [],
        userId: '',
        orderId: '',
        refundSn: '',
        refundStatus: ''
      },
      statusOptions: []
    };
  },
  methods: {
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      const refundTime = this.filterObj.refundTime;
      if (refundTime.length && refundTime.every(x => !!x) > 0) {
        startTime = fecha.format(refundTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(refundTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      this.filterData(Object.assign({
        // 'refund_time': this.filterObj.couponName,
        user_id_fuzzy: this.filterObj.userId,
        order_sn_fuzzy: this.filterObj.orderId,
        refund_sn_fuzzy: this.filterObj.refundSn,
        refund_status: this.filterObj.refundStatus,
        // 'refund_status': this.filterObj.refundStatus === '-1' ? '' : this.filterObj.refundStatus,
        refund_time_start: startTime,
        refund_time_end: endTime
      }));
    },
    handleReset () {
      this.filterObj = {
        refundTime: [],
        userId: '',
        orderId: '',
        refundSn: '',
        refundStatus: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    },

    loadStatus () {
      getStatus().then((result) => {
        if (result.success) {
          this.statusOptions = result.data;
        }
      });
    }

  },
  mounted () {
    this.loadStatus();
  }
};
</script>
