<template>
  <div>
    <ModuleHeader title="盒子关联RFID"></ModuleHeader>
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
        width="900"
        :value="showModal"
        title="商品详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)">
        <GoodsList/>
    </Modal>
    <Modal
        width="900"
        :value="showQuantityModal"
        title="库存详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setQuantityModal(false)">
        <QuantityList/>
    </Modal>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import GoodsList from './GoodsList';
import QuantityList from './QuantityList';

import { STORE_NAME } from './store';

export default {
  name: 'BoxToRFIDIndex',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Toolbar,
    GoodsList,
    QuantityList
  },
  mounted () {
    this.pageChange(1);
  },
  data () {
    return {
      columns: [
        {
          title: '盒子编号',
          key: 'boxNo'
        },
        {
          title: '商品库存',
          key: 'quantity'
        },
        {
          title: '商品列表',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.viewGoodsDetail(params.row.boxId);
                  // this.setModal(true);
                }
              }
            }, '查看详情'));
            return h('div', action);
          }
        }
      ]
    };
  }
};
</script>
