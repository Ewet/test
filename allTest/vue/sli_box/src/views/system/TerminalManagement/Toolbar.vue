<template>
   <Form inline class="toolBarForm">
        <FormItem label='商户名称'>
            <Input type="text" v-model="filterObj.merchantName" placeholder="商户名称">
            </Input>
        </FormItem>
        <FormItem label='盒子编号'>
            <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编号">
            </Input>
        </FormItem>

      <FormItem label='状态'>
          <Select v-model="filterObj.status" clearable filterable placeholder="搜索">
                <Option v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label }}</Option>
          </Select>
      </FormItem>
      <FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="reset"/>
          <ExportReportBtn @click="exportReport"/>
        </FormItem>
      </FormItem>
   </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { reportExport } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {},
  data () {
    return {
      statusList: [
        { label: '在线', value: 2 },
        { label: '离线', value: 1 }
      ],
      filterObj: {
        merchantName: '', // 商户名称
        boxNo: '', // 盒子编号
        status: '' // 状态
      }
    };
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    // 导出报表
    exportReport () {
      reportExport({
        name: this.filterObj.merchantName, // 商户名称
        box_no: this.filterObj.boxNo, // 盒子编号
        status: this.filterObj.status // 状态
      });
    },

    // 重置
    reset () {
      this.filterObj = {
        merchantName: '', // 商户名称
        boxNo: '', // 盒子编号
        status: '' // 状态
      };
      this.filterData({});
    },

    // /查询
    handleSubmit () {
      this.filterData({
        name: this.filterObj.merchantName, // 商户名称
        box_no: this.filterObj.boxNo, // 盒子编号
        status: this.filterObj.status // 状态
      });
    }

  }
};
</script>
