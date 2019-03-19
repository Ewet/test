<template>
    <div style="min-height:420px">
      <ModuleHeader title="全局查询-订单报表">
      </ModuleHeader>
      <Toolbar
        @setTabArr="setTabData"
      />
      <List/>
      <Modal
        title="选择商户"
        :value="showMerchantModal"
        :footer-hide = "true"
        style="z-index:1001;"
        @on-cancel="setMerchantModal(false)">
        <MerchantSelect @itemSelect="merchantNameSelect"/>
      </Modal>
        <Modal
          :value="showReportForm"
          :footer-hide = "true"
          style="z-index:1001;"
          :width="800"
          @on-cancel="setReportFormModal(false)"
        >
          <ExportReport
            :filterItems="filterItems"
            @export="handleExport"
          />
        </Modal>

    </div>
</template>
<script>
import Toolbar from './Toolbar';
import List from './List';
import vuexMixins from 'mixins/module-map';
import { exportReport } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar,
    List
  },
  name: 'OrderReportIndex',
  data () {
    return {
      qrCodeUrl: '',
      goodsName: '',
      showGoodsQrCode: false,
      filterItems: []
    };
  },
  mounted () {
  },
  methods: {
    merchantNameSelect (row) {
      this.setMerchantName(row.merchantName);
      this.setMerchantModal(false);
    },
    setTabData (tabArr) {
      this.filterItems = tabArr;
    },
    refresh () {
      this.reload();
    },
    async handleExport (data) {
      const parameter = {};
      data.items.forEach((item) => {
        const nameArr = item.name.split(':');
        if (nameArr.length === 2) {
          const valArr = item.value.split(',');
          parameter[nameArr[0]] = valArr[0];
          parameter[nameArr[1]] = valArr[1];
        } else {
          parameter[item.name] = item.value;
        }
      });
      parameter.box_no = data.boxSn.trim();
      exportReport(this.$filterParams(parameter));
      this.$g_emit('export_report_clear');
      this.setReportFormModal(false);
    }
  }
};
</script>
<style lang="less">
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
