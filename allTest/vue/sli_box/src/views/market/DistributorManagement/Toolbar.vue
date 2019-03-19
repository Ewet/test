<template>
    <Form ref="formInline" inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label="昵称/姓名/手机" style="width:300px;">
            <Input type="text" v-model="filterObj.column_value" clearable placeholder="昵称/姓名/手机"></Input>
        </FormItem>
        <FormItem class="datePicker" label="开通时间">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.openingTime"
          type="datetimerange"
          placeholder="会员开通时间">
          </DatePicker>
        </FormItem>
        <FormItem label="会员类型">
            <Select
            v-model="filterObj.memberType"
            multiple
            clearable
            placeholder="请选择会员类型">
              <Option v-for="item in memberTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
          <ExportReportBtn @click="showExport"/>
        </FormItem>

    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getTypeList } from 'views/personnel/Member/model';
import fecha from 'fecha';
import { exportList } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DistributorManagementToolbar',
  data () {
    return {
      filterObj: {
        column_value: '',
        memberType: [],
        openingTime: []
      },
      memberTypeOption: []
    };
  },
  methods: {
    handleSubmit () {
      this.filterData(this.getFilterObj());
    },
    handleRefresh () {
      this.reload();
    },
    handleReset () {
      this.filterObj = { column_value: '', memberType: [], openingTime: [] };
      this.clearFilter();
    },
    loadMemberType () {
      getTypeList().then((result) => {
        this.$fetchCB(result, (data) => {
          this.memberTypeOption = data.map(x => ({
            label: x.name,
            value: x.value
          }));
        });
      });
    },
    getFilterObj () {
      const obj = {
        type_keys: this.filterObj.memberType.join(','),
        column_value: this.filterObj.column_value
      };
      const openingTime = this.filterObj.openingTime;
      if (openingTime.length && openingTime.every(x => !!x) > 0) {
        obj.member_create_time_start = fecha.format(openingTime[0], 'YYYY-MM-DD HH:mm:ss');
        obj.member_create_time_end = fecha.format(openingTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      return this.$filterParams(obj);
    },
    showExport () {
      exportList(this.getFilterObj());
    }
  },
  mounted () {
    this.loadMemberType();
  }
};
</script>
