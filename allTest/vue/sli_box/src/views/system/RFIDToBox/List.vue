<template>
    <div style="min-height:420px">
      <ZTable
          :height="'500'"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="20"
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
  name: 'RFIDToBoxList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: 'RFID标识',
          key: 'RFIDIdentification',
          minWidth: 150
        },
        {
          title: '商品名称',
          key: 'goodName',
          minWidth: 180
        },
        {
          title: 'bom码',
          key: 'bomSn',
          minWidth: 200
        },
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 200
        },
        {
          title: '状态',
          key: 'state',
          minWidth: 200
        },
        {
          title: '入库时间',
          key: 'enterLibraryTime',
          minWidth: 200
        },
        {
          title: '出库时间',
          key: 'outLibraryTime',
          minWidth: 200
        }
      ]
    };
  },
  mounted () {
    const time = this.getTime();
    this.filterData({
      checkin_time_start: time[0], // 入库时间
      checkin_time_end: time[1], // 入库时间
      checkout_time_start: time[0], // 出库时间
      checkout_time_end: time[1], // 出库时间
      state: '' // 状态
    });
  },
  methods: {
    // 获取最近一周时间
    getTime () {
      const nowTime = new Date().setHours(0, 0, 0, 0);
      const tomorrowTime = nowTime + 24 * 60 * 60 * 1000;
      const lastTime = nowTime - 7 * 24 * 60 * 60 * 1000;
      return [this.$formatTime(lastTime), this.$formatTime(tomorrowTime)];
    },
    // 转时间戳
    timeStamp (str) {
      const time = new Date(str);
      return time.getTime();
    }
  }
};
</script>

<style lang="less">
  .red{
    color:#ff0000;
  }
</style>
