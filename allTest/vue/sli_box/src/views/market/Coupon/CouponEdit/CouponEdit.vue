<template>
   <div>
    </Spin>
     <Tabs v-model="tabActive" type="card">
        <TabPane label="基本" name="1"><Basic/></TabPane>
        <TabPane label="领取设置" name="2"><ReceiveSetting/></TabPane>
        <TabPane label="使用限制" name="3"><UseRestriction/></TabPane>
        <TabPane label="使用说明" name="4"><UseInstruction/></TabPane>
    </Tabs>
    </div>
</template>
<script>
import Basic from './Basic';
import ReceiveSetting from './ReceiveSetting';
import UseInstruction from './UseInstruction';
import UseRestriction from './UseRestriction';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BaseSettingIndex',
  components: {
    Basic,
    ReceiveSetting,
    UseInstruction,
    UseRestriction
  },
  data () {
    return {
      tabActive: '1'
    };
  },
  watch: {
    showModal (val, oldVal) {
      if (!val) {
        this.tabActive = '1';
      }
    }
  }
};
</script>
