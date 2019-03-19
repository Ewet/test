<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="refresh" />
       <FormItem label='用户名称'>
            <Input type="text" v-model="filterObj.realname" placeholder="用户名称">
            </Input>
        </FormItem>
        <FormItem label='奖品类型'>
            <Select v-model="filterObj.prizeType" clearable placeholder="奖品类型">
                <Option
                v-for="(item,index) in prizeOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem label='发放状态'>
            <Select v-model="filterObj.status" clearable placeholder="发放状态">
                <Option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
         <FormItem label='中奖时间' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.wonTime"
          type="datetimerange"
          placeholder="中奖时间"
          />
        </FormItem>
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="handleReset"/>
        <ExportTable @click="handleExport"/>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { exportTable } from 'views/report/WeChatwinningRecord/model';
import fecha from 'fecha';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatwinningRecordToolbar',
  data () {
    return {
      filterObj: {
        realname: '',
        prizeType: '',
        status: '',
        wonTime: []
      },
      prizeOptions: [
        {
          value: 1,
          name: '奖金'
        },
        {
          value: 2,
          name: '优惠券'
        },
        {
          value: 3,
          name: '实物'
        }
      ],
      statusOptions: [
        {
          value: 0,
          name: '待发放'
        },
        {
          value: 10,
          name: '已发放'
        }
      ]
    };
  },
  mounted () {
  },
  methods: {
    // 导出表格
    handleExport () {
      let startTime = '';
      let endTime = '';
      const wonTime = this.filterObj.wonTime;
      if (wonTime.length && wonTime.every(x => !!x) > 0) {
        startTime = fecha.format(wonTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(wonTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      exportTable({
        nickname: this.filterObj.realname,
        prize_type: this.filterObj.prizeType,
        won_time_start: startTime,
        won_time_end: endTime,
        status: this.filterObj.status
      });
    },
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      const wonTime = this.filterObj.wonTime;
      if (wonTime.length && wonTime.every(x => !!x) > 0) {
        startTime = fecha.format(wonTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(wonTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      this.filterData(Object.assign({
        nickname: this.filterObj.realname,
        prize_type: this.filterObj.prizeType,
        won_time_start: startTime,
        won_time_end: endTime,
        status: this.filterObj.status
      }));
    },
    handleReset () {
      this.filterObj = {
        realname: '',
        prizeType: '',
        status: '',
        wonTime: []
      };
      this.clearFilter();
    },
    refresh () {
      this.reload();
    }
  }
};
</script>
