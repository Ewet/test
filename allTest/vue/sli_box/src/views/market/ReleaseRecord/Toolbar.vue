<template>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleRefresh"/>
      <FormItem class="datePicker" label="获得时间">
         <DatePicker
         v-model="filterObj.getTime"
         type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
         placeholder="获得时间"
         ></DatePicker>
          </FormItem>
        <FormItem label="使用时间" class="datePicker" >
         <DatePicker
         v-model="filterObj.useTime"
         type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
         placeholder="使用时间"
         ></DatePicker>
          </FormItem>
        <FormItem label="获得方式">
            <Select v-model="filterObj.getMethod" placeholder="获得方式">
                <Option
                v-for="(item,index) in getMethodOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
         <FormItem label="状态">
            <Select v-model="filterObj.status" placeholder="状态">
                <Option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <!-- <FormItem label="关键字">
            <Input type="text" v-model="filterObj.column_value" placeholder="请输入关键字">
            </Input>
        </FormItem> -->
        <FormItem label="手机号码">
              <Input type="text" v-model="filterObj.mobile" placeholder="请输入手机号码">
            </Input>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
            <ExportReportBtn @click="handleExport"/>
        </FormItem>
    </Form>
</template>
<script>
// import { getUserStatus, getGender } from 'model/enum';
import vuexMixins from 'mixins/module-map';
import fecha from 'fecha';
import { exportList } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ReleaseRecordToolbar',
  data () {
    return {
      filterObj: {
        column_value: '',
        getTime: [],
        useTime: [],
        getMethod: '',
        status: '',
        mobile: ''
      },
      getMethodOptions: [{
        name: '全部',
        value: '-1'
      }, {
        name: '主动领取',
        value: '1'
      },
      {
        name: '兑换',
        value: '2'
      },
      {
        name: '赠送',
        value: '3'
      },
      {
        name: '后台发放',
        value: '4'
      }],
      statusOptions: [{
        name: '全部',
        value: '-1'
      }, {
        name: '未使用',
        value: '0'
      },
      {
        name: '已使用',
        value: '1'
      }],
      overdueOptions: [{
        name: '全部',
        value: '-1'
      }, {
        name: '未过期',
        value: '0'
      },
      {
        name: '已过期',
        value: '1'
      }]
    };
  },
  mounted () {
  },
  methods: {
    // 刷新
    handleRefresh () {
      this.reload();
    },
    getTimeRange (val) {
      if (val.length && val.every(x => !!x) > 0) {
        const startTime = fecha.format(val[0], 'YYYY-MM-DD HH:mm:ss');
        const endTime = fecha.format(val[1], 'YYYY-MM-DD HH:mm:ss');
        return [startTime, endTime];
      }
      return [];
    },
    handleSubmit () {
      this.filterData(this.getFilterObj());
    },
    handleReset () {
      this.filterObj = {
        column_value: '',
        getTime: [],
        useTime: [],
        getMethod: '',
        status: '',
        mobile: ''
      };
      this.clearFilter();
    },
    getFilterObj () {
      const filterObj = this.filterObj;
      let getMethod = filterObj.getMethod;
      let status = filterObj.status;
      if (!getMethod || getMethod === '-1') {
        getMethod = '';
      }
      if (!status || status === '-1') {
        status = '';
      }
      const obj = {
        create_type: getMethod,
        use_status: status,
        name: filterObj.column_value,
        mobile: filterObj.mobile
      };
      const _getTimeRanage = this.getTimeRange(filterObj.getTime);
      const _useTimeRanage = this.getTimeRange(filterObj.useTime);
      if (_getTimeRanage.length) {
        obj.create_time_start = _getTimeRanage[0];
        obj.create_time_end = _getTimeRanage[1];
      }
      if (_useTimeRanage.length) {
        obj.use_time_start = _useTimeRanage[0];
        obj.use_time_end = _useTimeRanage[1];
      }
      return obj;
    },
    handleExport () {
      exportList(this.getFilterObj());
    }
  }
};
</script>
