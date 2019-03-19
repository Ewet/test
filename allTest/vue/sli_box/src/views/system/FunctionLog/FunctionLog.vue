<template>
    <div class="page"  >
        <ModuleHeader title="功能调用日志记录"></ModuleHeader>
        <Form inline class="toolBarForm">
                <RefreshBtn @click="handleRefresh"/>
            <FormItem label="操作时间" class="datePicker">
                <DatePicker type="datetimerange" v-model="filterObj.operateTime" placeholder="操作时间"></DatePicker>
            </FormItem>
            <FormItem label="操作员姓名">
                <Input type="text" v-model="filterObj.operaterName" placeholder="操作员姓名"></Input>
            </FormItem>
            <FormItem>
                <SearchBtn @click="handleSubmit"/>
                <ResetBtn @click="handleReset"/>
            </FormItem>
        </Form>
        <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
    </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'FunctionLog',
  mounted () {
    this.pageChange(1);
  },
  components: {
  },
  methods: {
    handleSubmit () {
      if (this.filterObj.operateTime[0] || this.filterObj.operateTime[1]) {
        this.filterData({
          optime_start: this.$formatTime(this.filterObj.operateTime[0], 'ymd-hms'),
          optime_end: this.$formatTime(this.filterObj.operateTime[1], 'ymd-hms'),
          work_name: this.filterObj.operaterName
        });
      } else {
        this.filterData({
          work_name: this.filterObj.operaterName
        });
      }
    },
    handleRefresh () {
      this.reload();
    },
    handleReset () {
      this.filterObj = {
        operateTime: ['', ''],
        operaterName: ''
      };
      this.clearFilter();
    }
  },
  data () {
    return {
      filterObj: {
        operateTime: ['', ''],
        operaterName: ''
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '操作员',
          key: 'operater'
        },
        {
          title: '操作地址',
          key: 'operaterAddress'
        },
        {
          title: '操作功能',
          key: 'operaterFunction'
        },
        {
          title: '操作时间',
          key: 'operaterTiem'
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
