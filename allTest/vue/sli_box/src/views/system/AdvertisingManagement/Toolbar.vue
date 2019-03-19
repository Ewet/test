
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
          <FormItem label='所属广告商'>
            <Input
            type="text"
            v-model="filterObj.advertiser"
            placeholder="请输入所属广告商"
            clearable>
            </Input>
        </FormItem>
        <FormItem label='广告名称'>
            <Input
            type="text"
            v-model="filterObj.adName"
            placeholder="请输入广告名称"
            clearable
            >
            </Input>
        </FormItem>
        <FormItem  label='上传时间' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.uploadTime"
          type="datetimerange"
          placeholder="上传时间"
          style="width: 300px"
          @on-clear="setUploadTime"></DatePicker>
        </FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getLastWeek } from 'utils/date';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AdvertisingManagementToolbar',
  data () {
    return {
      filterObj: {
        advertiser: '',
        adName: '',
        uploadTime: getLastWeek({ returnType: 'string' })
      }
    };
  },
  mounted () {
    this.handleSubmit();
  },
  methods: {
    handleSubmit () {
      const time = this.$formatTime(this.filterObj.uploadTime);
      this.filterData({
        advert_merchants_name: this.filterObj.advertiser,
        advert_name: this.filterObj.adName,
        created_time_start: time[0],
        created_time_end: time[1]
      });
    },
    reset () {
      this.filterObj = {
        advertiser: '',
        adName: '',
        uploadTime: getLastWeek({ returnType: 'string' })
      };
      const time = this.$formatTime(getLastWeek({ returnType: 'string' }));
      this.filterData({
        created_time_start: time[0],
        created_time_end: time[1]
      });
    },
    // 清空时间
    setUploadTime () {
      this.$nextTick(() => {
        this.filterObj.uploadTime = [];
      });
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
