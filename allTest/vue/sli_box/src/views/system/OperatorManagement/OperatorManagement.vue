<!--运营商列表-->
<template>
 <div class="coupon-list">
   <ModuleHeader title="运营商列表">
     <ZBtn slot="right" @click="addItem">新增运营商</ZBtn>
    </ModuleHeader>
    <Toolbar />
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
     <Modal
        :value="showModal"
        :title="itemId? '编辑运营商' : '新增运营商'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        width="500"
        >
        <Edit/>
    </Modal>
    <Modal
        :value="showSettingModal"
        :title="'登录设置'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setSettingModal(false)"
        width="500"
        >
        <EditSetting/>
    </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import Edit from './Edit';
import EditSetting from './EditSetting';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
    };
  },
  methods: {
  },
  components: {
    List,
    Toolbar,
    Edit,
    EditSetting
  },
  watch: {
  }
};
</script>
<style scoped lang="less">
.coupon-list {
  header {
    position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    button {
      position: absolute;
      right: 0;
      top:0;
    }
  }
}
.remark {
    padding: 5px 10px;
    background: skyblue;
    color: #fff;
    margin: 10px auto;
}
</style>
