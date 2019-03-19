
<template>
    <div>
        <Form inline class="toolBarForm">
            <FormItem label='商户名称'>
                <MerchantSelectInput keyName='merchantName'  v-model="filterObj.merchantName"></MerchantSelectInput>
            </FormItem>
            <FormItem label='盒子编号'>
                <span @click="boxNoClick($event)">
                  <Input type="text" v-model="filterObj.boxNo" clearable readonly placeholder="请输入盒子编号"></Input>
                </span>
              </FormItem>
            <FormItem>
                <SearchBtn @click="handleSubmit"/>
                <ResetBtn @click="handleReset"/>
                <ExportReportBtn @click="handleExport"/>
            </FormItem>
      </Form>
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
import vuexMixins from 'mixins/module-map';
import { exportList } from './model';
import { STORE_NAME } from './store';
import { findComponentDownward } from 'utils/assist';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      showBoxModal: false,
      filterObj: {
        merchantName: '',
        boxNo: ''
      }
    };
  },
  methods: {
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showBoxModal = true;
    },
    setBoxModal () {
      this.showBoxModal = false;
    },
    boxNoSelect (row) {
      this.filterObj.boxNo = row.boxNo;
      this.showBoxModal = false;
    },
    resetMerchant () {
      const child = findComponentDownward(this, 'MerchantSelectInput');
      if (child) {
        child.resetText();
      }
    },
    // 重置
    handleReset () {
      this.resetMerchant();
      this.filterObj = {
        merchantName: '',
        boxNo: ''
      };
      this.clearFilter();
    },
    // 刷新
    handleRefresh () {
      this.reload();
    },
    // 导出
    handleExport () {
      exportList({
        box_no: this.filterObj.boxNo,
        name: this.filterObj.merchantName
      });
    },
    // 搜索
    handleSubmit () {
      this.filterData({
        box_no: this.filterObj.boxNo,
        name: this.filterObj.merchantName
      });
    }
  }
};
</script>
