
<template>
    <Form inline class="toolBarForm">
        <FormItem  label='添加日期' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.addTime"
          type="datetimerange"
          placeholder="添加日期"
          style="width: 300px"
          @on-clear="setAddTime"></DatePicker>
        </FormItem>
        <FormItem label="状态">
            <Select :clearable="true" v-model="filterObj.status" placeholder="状态" >
                <Option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
            <!-- <ZBtn @click="dividedRuleEdit('')">新增投放</ZBtn> -->
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getZeroTimeLastWeek } from 'utils/date';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DeliverySettingsToolbar',
  data () {
    return {
      filterObj: {
        status: null,
        addTime: getZeroTimeLastWeek()
      },
      statusOptions: [
        {
          value: 1,
          name: '待生效'
        },
        {
          value: 2,
          name: '已生效'
        },
        {
          value: 3,
          name: '已终止'
        },
        {
          value: 4,
          name: '已过期'
        }
      ]
    };
  },
  mounted () {
  },
  methods: {
    handleSubmit () {
      const time = this.$formatTime(this.filterObj.addTime, 'ymd');
      this.filterData({
        merchant_id: this.merchantId,
        status: this.filterObj.status,
        start_time: time[0],
        end_time: time[1]
      });
    },
    reset () {
      this.filterObj = {
        status: null,
        addTime: getZeroTimeLastWeek()
      };
      const time = this.$formatTime(this.filterObj.addTime, 'ymd');
      this.filterData({
        merchant_id: this.merchantId,
        start_time: time[0],
        end_time: time[1]
      });
    },
    // 清空时间
    setAddTime () {
      this.$nextTick(() => {
        this.filterObj.addTime = [];
      });
    },
    handleRefresh () {
      this.reload();
    }
  },
  watch: {
    // 监听广告ID
    merchantId (val) {
      if (val) {
        // 无到有时加载此页面数据
        this.handleSubmit();
      } else {
        // 有到无重置筛选表单
        this.filterObj = {
          status: null,
          addTime: getZeroTimeLastWeek()
        };
      }
    }
  }
};
</script>
