
<template>
  <div class="VerificationRecorToobar">
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label="姓名">
            <Input type="text" v-model="filterObj.name" clearable placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="手机号码">
            <Input type="text" v-model="filterObj.phone" clearable placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label='申请时间' class="datePicker">
          <DatePicker style="width: 300px" type="datetimerange" clearable placeholder="请选择起始记录时间" v-model="filterObj.date"></DatePicker>
        </FormItem>
        <FormItem label='所属商户'>
          <span @click="merchantNameClick($event)">
            <Input type="text" v-model="filterObj.ownedMerchant" clearable readonly placeholder="请输入所属商户"></Input>
          </span>
        </FormItem>
        <FormItem style="width: 280px;">
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <DataExport @click="handleExport"/>
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
  </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getLastWeek } from 'utils/date';
import { dataExport } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'VerificationRecorToobar',
  components: {
  },
  data () {
    return {
      showMerchantModal: false,
      filterObj: {
        name: '',
        phone: '',
        date: getLastWeek({ returnType: 'string' }),
        ownedMerchant: '',
        merchantId: ''
      }
    };
  },
  mounted () {
    this.filterData(this.loadData());
  },
  methods: {
    merchantNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showMerchantModal = true;
    },
    merchantNameSelect (row) {
      this.filterObj.merchantId = row.id;
      this.filterObj.ownedMerchant = row.merchantName;
      this.showMerchantModal = false;
    },
    handleRefresh () {
      this.reload();
    },
    loadData () {
      const that = this.filterObj;
      if (that.ownedMerchant === '') {
        that.merchantId = '';
      }
      let params = {
        name: that.name,
        mobile: that.phone,
        merchant_id: that.merchantId
      };
      if (that.date.length && that.date.every(x => !!x)) {
        params = {
          ...params,
          start_time: this.$formatTime(that.date[0]),
          end_time: this.$formatTime(that.date[1])
        };
      }
      return params;
    },
    handleSubmit () {
      this.filterData(this.loadData());
    },
    handleReset () {
      this.filterObj = {
        name: '',
        phone: '',
        ownedMerchant: '',
        merchantId: '',
        date: getLastWeek({ returnType: 'string' })
      };
      this.filterData(this.loadData());
    },
    async handleExport () {
      const { success, msg } = await dataExport(this.loadData());
      if (success) {
        this.$success('导出成功!');
      } else {
        this.$error(msg);
      }
    }
  }
};
</script>
