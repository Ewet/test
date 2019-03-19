<template>
    <div>
    <ModuleHeader title="基础设置">
    </ModuleHeader>
    <Tabs value="2" type="card">
        <!-- <TabPane label="基础" name="1"><Basic/></TabPane> -->
        <TabPane label="上下线关系及分销资格" name="2"><Relation/></TabPane>
        <TabPane label="结算" name="3"><Settlement/></TabPane>
    </Tabs>
    </div>
</template>
<script>
import Relation from './Relation';
import Settlement from './Settlement';

export default {
  name: 'BaseSettingIndex',
  components: {
    Relation,
    Settlement
  }
};
</script>
