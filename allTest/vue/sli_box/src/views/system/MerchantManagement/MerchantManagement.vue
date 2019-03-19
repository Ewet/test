<template>
 <div class="coupon-list">
   <ModuleHeader title="商户管理列表">
       <ZBtn slot="right" @click="addItem">添加商户</ZBtn>
    </ModuleHeader>
    <Toolbar></Toolbar>
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
    <!-- <Modal
        :value="showModal"
        :title="itemId? '商户编辑' : '商户新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        >
        <MerchantManagementEdit/>
    </Modal> -->
    <!-- <Modal
        :value="showDividedModal"
        title="分成设置"
        :footerHide= "true"
        @on-cancel="setDividedModal(false)"
        :width="1000"
      >
        <DividedSettings />
      </Modal> -->
      <!-- <Modal
        :value="showDividedRuleModal"
        title="分成规则设置"
        :footerHide= "true"
        @on-cancel="setDividedRuleModal(false)"
        :width="600"
        >
        <DividedRuleEdit />
      </Modal> -->
      <!-- <Modal
        :value="showOperationRecordModal"
        title="操作记录"
        :footerHide= "true"
        @on-cancel="setOperationRecordModal(false)"
        :width="800"
        >
        <OperationRecord />
      </Modal> -->
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
// import MerchantManagementEdit from './Edit';
// import DividedSettings from './DividedSettings';
// import DividedRuleEdit from './DividedSettings/Edit';
// import OperationRecord from './DividedSettings/OperationRecord';
import Toolbar from './Toolbar';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantManagementIndex',
  data () {
    return {
    };
  },
  methods: {
  },
  components: {
    List,
    // MerchantManagementEdit,
    Toolbar
    // DividedSettings,
    // DividedRuleEdit,
    // OperationRecord
  },
  watch: {
  }
};
</script>
