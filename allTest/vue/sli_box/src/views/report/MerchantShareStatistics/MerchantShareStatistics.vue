<!--商户分成统计-->
<template>
 <div class="order-list">
    <ModuleHeader :title="title">
    </ModuleHeader>
    <Toolbar/>
    <List slot="content" style="height:100%;overflow:auto"/>

    <!-- 分成详情 -->
    <Modal
        :value="showMerchantShareDetails"
        :title="'分成详情'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setMerchantShareDetails(false)"
        width="80%"
        >
        <MerchantShareDetails/>
    </Modal>

 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import vuexMixins from 'mixins/module-map';
import MerchantShareDetails from '../MerchantShareDetails';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantShareStatisticsIndex',
  data () {
    return {
      title: '商户分成统计'
    };
  },
  components: {
    List,
    Toolbar,
    MerchantShareDetails
  }
};
</script>
<style scoped lang="less">
.order-list {
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
</style>
