
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
          <FormItem label='投放计划名'>
            <Input
            type="text"
            v-model="filterObj.deliveryPlanName"
            placeholder="请输入投放计划名称"
            clearable>
            </Input>
        </FormItem>
        <FormItem  label='投放日期' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.deliveryTime"
          type="datetimerange"
          placeholder="投放日期"
          style="width: 300px"
          @on-clear="setUploadTime"></DatePicker>
        </FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
            <ZBtn @click="addItem">新增投放</ZBtn>
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
        deliveryPlanName: '',
        deliveryTime: getZeroTimeLastWeek()
      }
    };
  },
  mounted () {
  },
  methods: {
    handleSubmit () {
      const time = this.$formatTime(this.filterObj.deliveryTime);
      this.filterData({
        advert_id: this.advertisingId,
        advert_plan_name: this.filterObj.deliveryPlanName,
        start_time: time[0],
        end_time: time[1]
      });
    },
    reset () {
      this.filterObj = {
        deliveryPlanName: '',
        deliveryTime: getZeroTimeLastWeek()
      };
      const time = this.$formatTime(this.filterObj.deliveryTime);
      this.filterData({
        advert_id: this.advertisingId,
        start_time: time[0],
        end_time: time[1]
      });
    },
    // 清空时间
    setUploadTime () {
      this.$nextTick(() => {
        this.filterObj.deliveryTime = [];
      });
    },
    handleRefresh () {
      this.reload();
    }
  },
  watch: {
    // 监听广告ID
    advertisingId (val) {
      if (val) {
        // 无到有时加载此页面数据
        this.handleSubmit();
      } else {
        // 有到无重置筛选表单
        this.filterObj = {
          deliveryPlanName: '',
          deliveryTime: getZeroTimeLastWeek()
        };
      }
    }
  }
};
</script>
