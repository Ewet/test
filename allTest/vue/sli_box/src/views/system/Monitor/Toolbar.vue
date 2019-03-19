
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click='handleSubmit'/>
        <FormItem label='盒子编号'>
            <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编号">
            </Input>
        </FormItem>
        <FormItem label='进入时间' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.entryTime"
          type="datetimerange"
          placeholder="进入时间"></DatePicker>
           </FormItem>
        <FormItem label='离开时间' class="datePicker">
            <DatePicker
              format="yyyy-MM-dd HH:mm:ss"
              v-model="filterObj.departureTime"
              type="datetimerange"
              placeholder="离开时间"
              ></DatePicker>
        </FormItem>
        <FormItem style="width:270px">
          <Checkbox
            v-model="filterObj.isOrder"
          >订单</Checkbox>
        <!-- </FormItem>
        <FormItem> -->
          <Checkbox
            v-model="filterObj.isLocationChange"
          >货位变动</Checkbox>
        <!-- </FormItem>
        <FormItem> -->
          <Checkbox
            v-model="filterObj.isInventoryChange"
          >库存变动</Checkbox>
        <!-- </FormItem>
        <FormItem> -->
          <Checkbox
            v-model="filterObj.isUnread"
          >未读</Checkbox>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RoleManagementToolbar',
  data () {
    return {
      filterObj: {
        boxNo: '',
        entryTime: [],
        departureTime: [],
        isOrder: false,
        isLocationChange: false,
        isInventoryChange: false,
        isUnread: false
      },
      areaOptions: []
    };
  },
  methods: {
    handleSubmit () {
      const filterParams = {
        box_no: this.filterObj.boxNo
      };
      if (this.filterObj.isUnread) {
        filterParams.is_read = 0;
      }
      if (this.filterObj.isOrder) {
        filterParams.exists_event_id = 1;
      }
      if (this.filterObj.isInventoryChange) {
        filterParams.exists_is_change_goods = 1;
      }
      if (this.filterObj.isLocationChange) {
        filterParams.exists_is_changed_sensors = 1;
      }
      const entryTime = this.filterObj.entryTime;
      const departureTime = this.filterObj.departureTime;
      if (entryTime.length && entryTime.every(x => !!x) > 0) {
        filterParams.entry_time_start = this.$formatTime(entryTime[0], 'ymd-hms');
        filterParams.entry_time_end = this.$formatTime(entryTime[1], 'ymd-hms');
      }
      if (departureTime.length && departureTime.every(x => !!x) > 0) {
        filterParams.departure_time_start = this.$formatTime(departureTime[0], 'ymd-hms');
        filterParams.departure_time_end = this.$formatTime(departureTime[1], 'ymd-hms');
      }

      this.filterData(filterParams);
    },
    reset () {
      this.filterObj = {
        boxNo: '',
        entryTime: [],
        departureTime: [],
        isOrder: false,
        isLocationChange: false,
        isInventoryChange: false,
        isUnread: false
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
