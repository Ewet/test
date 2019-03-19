
<template>
    <Form inline class="toolBarForm">
      <!-- <FormItem> -->
        <RefreshBtn @click="handleRefresh"/>
        <!-- </FormItem> -->
          <FormItem label='盒子编号'>
            <Input
            type="text"
            v-model="filterObj.boxNo"
            placeholder="请输入盒子编号"
            clearable>
            </Input>
        </FormItem>
        <FormItem label='商户名称'>
            <Input
            type="text"
            v-model="filterObj.merchantName"
            placeholder="请输入商户名称"
            clearable
            >
            </Input>
        </FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
            <ExportTable @click="handleExport"/>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { exportTable } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxManagementToolbar',
  data () {
    return {
      filterObj: {
        boxNo: '',
        merchantName: ''
      }
    };
  },
  methods: {
    // 导出表格
    handleExport () {
      exportTable({
        box_no: this.filterObj.boxNo,
        merchant_name: this.filterObj.merchantName
      });
    },
    handleSubmit () {
      this.filterData({
        box_no: this.filterObj.boxNo,
        merchant_name: this.filterObj.merchantName
      });
    },
    reset () {
      this.filterObj = {
        boxNo: '',
        merchantName: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
