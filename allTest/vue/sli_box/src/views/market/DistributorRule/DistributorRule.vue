<template>
  <div>
    <ModuleHeader title="分销规则">
       <Button type="primary" slot="right" @click="addItem">添加等级</Button>
    </ModuleHeader>
    <p class="text">
      提示：没有设置等级的分销商将按默认设置计算提成。商品指定的佣金金额的优先级仍是最高的，也就是说只要商品指定了佣金金额按商品的佣金金额来算，不受等级影响。
    </p>
    <List slot="content" style="height:100%;overflow:auto"/>
  </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  // mixins: [vuexMixins({moduleName: 'distributorRule'})],
  name: 'DistributorRuleRule',
  components: {
    List
  }
};
</script>
<style lang="less" scoped>
 .text {
   padding: 15px 10px;
   background: #d9edf6;
   color: #397d95;
   border-radius:2px;
   margin-bottom: 20px;
 }
</style>
