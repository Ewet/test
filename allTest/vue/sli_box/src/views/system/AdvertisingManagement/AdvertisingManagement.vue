<template>
 <div class="coupon-list">
   <ModuleHeader title="广告管理">
       <ZBtn slot="right" @click="addItem">上传广告</ZBtn>
    </ModuleHeader>
   <Toolbar></Toolbar>
    <List slot="content" style="height:100%;overflow:auto"/>
    <Modal
        :value="showModal"
        :title="itemId? '广告编辑' : '广告新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        :width="800"
        >
        <AdEdit/>
      </Modal>
      <!-- 投放设置 -->
      <Modal
        :value="showModalDeliveryIndex"
        :title="'投放设置'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="offDeliveryIndex()"
        width="70%"
        >
        <DeliveryIndex :adId="itemId" :isShow="showModalDeliveryIndex"/>
    </Modal>
    <!-- 计划新增、编辑 -->
    <Modal
        :value="showModalDeliveryEdit"
        :title="isEdit? '编辑' : '新增投放'"
        :footerHide="true"
        @on-cancel="setModalDeliveryEdit(false)"
        :width="800"
        >
        <DeliveryEdit
          :isShowEdit="showModalDeliveryEdit"
          @emitShow="viewDeliveryEdit"
          @emitShowBox="val => viewBoxList(val)"
          />
    </Modal>
    <Modal
      title="选择盒子"
      :value="showBoxModal"
      :footer-hide = "true"
      style="z-index:1001;"
      fullscreen
      @on-cancel="setModalBox(false);"
      >
      <BoxSelect
        @itemSelect="sendBoxNo"
        :checkedBoxList1="checkedList2"
        :show="showBoxModal"
        />
    </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import AdEdit from './Edit';
import Toolbar from './Toolbar';
import DeliveryIndex from './DeliverySettings/DeliveryIndex';
import DeliveryEdit from './DeliverySettings/DeliveryEdit';
import BoxSelect from './DeliverySettings/BoxSelect';
import { findComponentDownward } from 'utils/assist';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'AdvertisingManagementIndex',
  data () {
    return {
      isEdit: true, // 投放计划新增还是编辑
      checkedList2: []
    };
  },
  methods: {
    // 把已选择盒子列表（从计划编辑界面接收的）转发到盒子选择页面
    sendBoxNo (row) {
      const child = findComponentDownward(this, 'DeliverySettingsEdit');
      if (child) {
        child.boxNoSelect(row);
        this.setModalBox(false);
      }
    },
    // 弹出盒子选择，并从计划编辑界面接收已选盒子列表
    viewBoxList (val) {
      this.setModalBox(val.isShow);
      this.checkedList2 = val.checkedList1;
    },
    viewDeliveryEdit (val) { // 是否弹出投放编辑
      this.setModalDeliveryEdit(val.isShow);
      this.isEdit = val.isEdit;
    }
  },
  components: {
    List,
    AdEdit,
    Toolbar,
    DeliveryIndex,
    DeliveryEdit,
    BoxSelect
  },
  watch: {
    // 监听盒子显示状态，弹出时触发选择盒子页面刷新数据事件
    showBoxModal (val) {
      if (val) {
        this.$Bus.$emit('refreshBoxList');
      }
    }
  }
};
</script>
