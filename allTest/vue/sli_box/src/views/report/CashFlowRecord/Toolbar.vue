<!--工具栏-->
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='起止时间' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.time"
          type="datetimerange"
          placeholder="起止时间"
          />
        </FormItem>
        <FormItem label='会员id'>
            <Input type="text" v-model="filterObj.memberId" placeholder="会员id">
            </Input>
        </FormItem>
        <FormItem label='商户名称'>
            <span @click="merchantClick($event)">
              <Input @on-click.stop  placeholder="请输入商户" readonly clearable v-model="filterObj.merchant">
              </Input>
            </span>
            <!-- <div class="ivu-input-wrapper ivu-input-type" @click="showModal=true">
                <span class="ivu-input" style="color:#dddee1;width:150px">
                  <span v-if='!filterObj.merchant'>请输入商户</span>
                  <span v-else style="color:#495060;">{{filterObj.merchant}}</span>
                </span>
                <Icon type="ios-close" />
             </div> -->
        </FormItem>
        <FormItem label='盒子编号'>
            <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编号"></Input>
        </FormItem>
        <FormItem label='奖励类别'>
          <Select v-model="filterObj.rewardType" placeholder="奖励类别">
                <Option
                v-for="(item,index) in rewardOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportReportBtn @click="handleExport"/>
        </FormItem>
        <Modal
        v-model="showMerchantModal"
        width="62.5%"
       :footerHide="true"
        >
        <MerchantSelect @itemSelect="itemSelect"/>
      </Modal>
    </Form>
</template>
<script>
import fecha from 'fecha';
import vuexMixins from 'mixins/module-map';
import { exportList } from 'views/report/CashFlowRecord/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CashFlowRecordToolbar',
  data () {
    return {
      filterObj: {
        time: [],
        memberId: '',
        boxNo: '',
        merchant: '',
        rewardType: ''
      },
      showMerchantModal: false,
      rewardOptions: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '会员奖励',
          value: '0'
        },
        {
          name: '代购奖励',
          value: '1'
        },
        {
          name: '股东奖励',
          value: '2'
        },
        {
          name: '抽奖奖励',
          value: '3'
        }
      ]
    };
  },
  methods: {
    handleRefresh () {
      this.reload();
    },
    filterClear () {
      this.filterObj = {
        time: [],
        memberId: '',
        boxNo: '',
        merchant: '',
        rewardType: ''
      };
    },
    handleSubmit (name) {
      this.filterData(this.getFilterObj());
    },
    getPayRange () {
      let startTime = '';
      let endTime = '';
      const time = this.filterObj.time;
      if (time.length && time.every(x => !!x) > 0) {
        startTime = fecha.format(time[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(time[1], 'YYYY-MM-DD HH:mm:ss');
      }
      return {
        start_time: startTime,
        end_time: endTime
      };
    },
    handleExport () {
      exportList(this.getFilterObj());
    },
    handleReset () {
      this.filterObj = {
        time: [],
        memberId: '',
        merchant: '',
        boxNo: '',
        rewardType: ''
      };
      this.clearFilter();
    },
    getFilterObj () {
      return {
        ...this.getPayRange(),
        user_id: this.filterObj.memberId,
        merchant_name: this.filterObj.merchant,
        box_no: this.filterObj.boxNo,
        type_status: this.filterObj.rewardType
      };
    },
    itemSelect (row) {
      this.filterObj.merchant = row.merchantName;
      this.showMerchantModal = false;
    },
    merchantClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    }
  },
  watch: {
    showMerchantModal (val) {
      if (val === false) {
        this.$Bus.$emit('refreshMerchantList');
      }
    }
  }
};
</script>
