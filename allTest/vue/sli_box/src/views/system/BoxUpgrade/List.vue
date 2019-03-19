<template>
    <div style="min-height:420px">
      <!-- <Table @on-selection-change="selectionChange" border :columns="columns" :data="items" ></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
          @on-selection-change="selectionChange"
      />
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '盒子编号',
          key: 'boxNo'
        },
        {
          title: '盒子型号',
          key: 'boxStyle'
        },
        {
          title: '运营商',
          key: 'operator'
        },
        {
          title: '地区',
          key: 'address'
        },
        {
          title: '硬件程序',
          key: 'hardwareVersion'
        },
        {
          title: '客户端主程序',
          key: 'clientMainVersion'
        },
        {
          title: '监控助手',
          key: 'clientMonitorVersion'
        },
        {
          title: '程序守卫',
          key: 'clentDaemonVersion'
        },
        {
          title: '广告程序',
          key: 'clientAdvVersion'
        },
        {
          title: '最近升级',
          key: 'time',
          width: 150
        },
        {
          title: '升级者',
          key: 'upgradePeople'
        }],
      isloading: true
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    selectionChange (val) {
      console.log('111');
      const arr = [];
      val.forEach((item) => {
        arr.push(item.id);
      });
      this.setBoxIdArr(arr);
    },
    // 固件信息
    showInfo (boxNo, Id) {
      this.setBoxNo(boxNo);
      this.editItem(Id);
    }
  }
};
</script>
