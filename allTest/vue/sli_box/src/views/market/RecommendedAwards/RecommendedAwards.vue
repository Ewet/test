<!--优惠劵列表-->
<template>
 <div class="coupon-list">
   <ModuleHeader title="推荐有奖">
     <Button type="primary" slot="right" @click="addItem">新建活动</Button>
    </ModuleHeader>
    <Toolbar />
    <List slot="content" style="height:100%;overflow:auto"/>
     <Modal
        :value="showModal"
        :title="itemId? '活动编辑' : '新建活动'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)"
        width="800"
        >
        <Edit/>
    </Modal>
    <Modal
        :value="showInfoModal"
        :title="activityName+`微信推荐有礼`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setInfoModal(false)"
        width="800"
        >
        <Info/>
    </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import Edit from './Edit';
import Info from './Info';
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
    Info
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
