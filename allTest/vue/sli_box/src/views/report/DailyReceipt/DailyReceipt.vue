<template>
    <div style="min-height:420px">
      <ModuleHeader title="日收款汇总">
      </ModuleHeader>
      <Toolbar />
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
      <Modal
        :title= "`销售明细(${boxNo})`"
        v-model="showSaleDetailModal"
        :footer-hide = "true"
        style="z-index:1001;"
        fullscreen
       >
        <SaleDetailList
        :items="detailItems"
        @viewOrderDetail="viewOrderDetail"
        />
        <div style="float: right;margin-top:10px">
          <Page
            :current="detailPage"
            :total="detailTotal"
            :show-total="true"
            @on-change="num => setdetailPage(num)"
          ></Page>
        </div>
    </Modal>
    <OrderDetailModal
      :orderSn="orderSn"
      v-model="showOrder">
    </OrderDetailModal>
    </div>
</template>
<script>
import SaleDetailList from '../SalesDetail/ListView';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import { getList as getSalesDetail } from 'views/report/SalesDetail/model';
// import fecha from 'fecha';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    SaleDetailList,
    Toolbar
  },
  name: 'DailyReceiptIndex',
  data () {
    return {
      columns: [
        {
          title: '商户',
          key: 'merchantName',
          minWidth: 120
        },
        {
          title: '编号',
          key: 'boxNo',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '优惠券(元)',
          key: 'couponDeduction',
          minWidth: 80
        },
        {
          title: '随机减(元)',
          key: 'randomDeduction',
          minWidth: 80
        },
        {
          title: '退款(元)',
          key: 'refundedTotal',
          minWidth: 80
        },
        {
          title: '实收(元)',
          key: 'paidAmount',
          minWidth: 80
        },
        {
          title: '收款时间',
          key: 'paidTimeFormatted',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 120,
          align: 'center',
          render: (h, params) => h('div', [
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.viewSaleDetail(params.row);
                }
              }
            }, '查看详情')
          ])
        }
      ],
      orderSn: '',
      showOrder: false,
      showSaleDetailModal: false,
      detailItems: [],
      boxNo: '',
      boxId: '',
      merchantId: '',
      detailPage: 1,
      detailTotal: null,
      starTime: '',
      endTime: ''

    };
  },
  mounted () {
    // this.pageChange(1);
  },
  methods: {
    viewOrderDetail (orderSn) {
      this.showOrder = true;
      this.orderSn = orderSn;
    },
    setdetailPage (num) {
      this.detailPage = num;
      this.getSalesDetailItems(num);
    },
    async viewSaleDetail (val) {
      this.boxId = val.boxId;
      this.boxNo = val.boxNo;
      this.merchantId = val.merchantId;
      // let time = this.$formatTime(val.paidTime);
      this.starTime = `${val.paidTimeFormatted} 00:00:00`;
      this.endTime = `${val.paidTimeFormatted} 23:59:59`;
      this.showSaleDetailModal = true;
      this.getSalesDetailItems(1);
      // let { success, data, msg } = await getSalesDetail({
      //   'box_no': val.boxNo,
      //   'time_pricing_begin': this.starTime,
      //   'time_pricing_end': this.endTime,
      //   'pagination[page]': this.detailPage,
      //   'pagination[page_size]': 10
      // });
      // if (success) {
      //   console.log(data);
      //   this.detailItems = data.items;
      //   this.detailPage = data.pageNum;
      //   this.detailTotal = data.total;
      // } else {
      //   this.$error(msg);
      // }
    },
    async getSalesDetailItems (page) {
      const { success, data, msg } = await getSalesDetail({
        box_id: this.boxId,
        merchant_id: this.merchantId,
        time_pricing_begin: this.starTime,
        time_pricing_end: this.endTime,
        'pagination[page]': page,
        'pagination[page_size]': 10
      });
      if (success) {
        this.detailItems = data.items;
        this.detailPage = data.pageNum;
        this.detailTotal = data.total;
      } else {
        this.$error(msg);
      }
    }
    // refresh () {
    //   this.reload();
    // }
  },
  watch: {
    showSaleDetailModal: (val) => {
      if (!val) {
        this.boxNo = '';
        this.boxId = '';
        this.detailPage = 1;
        this.detailTotal = null;
        this.starTime = '';
        this.endTime = '';
      }
    }
  }

};
</script>
<style lang="less">
.red{
  color:red;
}
.qrcode{
  width:300px;
  margin:20px auto;
  text-align: center;
  h3{
    font-size: 24px;
  }
  img{
    width: 300px;
    height: 300px;
  }
  span{
    line-height: 30px;
  }
}
</style>
