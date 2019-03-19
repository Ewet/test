<template>
    <div style="min-height:300px;">
      <!-- <Table  border :columns="columns" :data="items" :loading = isLoading ></Table> -->
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
  components: {
  },
  data () {
    return {
      columns: [
        {
          title: '运营商',
          key: 'operator',
          minWidth: 100
        },
        {
          title: '商户',
          key: 'merchantName',
          minWidth: 80
        },
        {
          title: '编号',
          key: 'boxNo',
          minWidth: 80
        },
        {
          title: '类型',
          key: 'orderType',
          minWidth: 80
        },
        {
          title: '单号',
          key: 'orderSn',
          minWidth: 80
        },
        {
          title: '订单总额(元)',
          key: 'orderAmount',
          minWidth: 80
        },
        {
          title: '优惠劵(元)',
          key: 'couponAmount',
          minWidth: 80
        },
        {
          title: '随机减(元)',
          key: 'randomreduction',
          minWidth: 80
        },
        {
          title: '退款(元)',
          key: 'refund',
          minWidth: 80
        },
        {
          title: '实收(元)',
          key: 'paidAmount',
          minWidth: 80
        },
        {
          title: '订单状态',
          key: 'orderStatus',
          minWidth: 80
        },
        {
          title: '支付方式',
          key: 'paymentMethod',
          minWidth: 80
        },
        {
          title: '下单时间',
          key: 'orderTime',
          minWidth: 80
        },
        {
          title: '支付时间',
          key: 'paymentTime',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 120,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  console.log(params.row.orderSn);
                  this.$openOrderDetail({
                    orderSn: `${params.row.orderSn}`
                  });
                }
              }
            }, '查看详情')
          ])
        }
      ]
    };
  },
  mounted () {
    const createdTime = this.initTime();
    this.setFilter({
      created_time_begin: createdTime[0], // 下单时间-起始
      created_time_end: createdTime[1] // 下单时间-结束
    });
    this.pageChange(1);
  },
  methods: {
    // 初始化时间
    initTime () {
      const now = new Date().getTime();
      const timeDifference = now - (7 * 24 * 60 * 60 * 1000);
      const startTiem = this.$formatTime(new Date(timeDifference), 'ymd-hms');
      const endTime = this.$formatTime(new Date(now), 'ymd-hms');
      return [startTiem, endTime];
    }
  }

};
</script>

<style lang="less">
.red{
  color: red;
}
</style>
