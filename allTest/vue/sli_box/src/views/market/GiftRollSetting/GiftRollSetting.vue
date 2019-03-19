<template>
   <div class="gift-roll-setting">
    <ModuleHeader title="分享发劵">
    </ModuleHeader>
     <Tabs :value="0" type="card">
       <TabPane :key="index"
       v-for="(item, index) in items"
       :label="item.name"
       :name="item.name"><Delivery :data="item"/></TabPane>
        <!-- <TabPane  :label="label1"  name="1"><VoluntaryDelivery/></TabPane>
        <TabPane :label="label2"  name="2"><InvitedDelivery/></TabPane> -->
    </Tabs>
   </div>
</template>
<script>
import Delivery from './Delivery';
import { getList } from './model';

export default {
  name: 'BaseSettingIndex',
  data () {
    return {
      items: []
    };
  },
  mounted () {
    getList().then((result) => {
      this.$fetchCB(result, (data) => {
        this.items = data.items;
      });
    });
  },
  components: {
    Delivery
  }
};
</script>
<style lang="less">
.gift-roll-setting {
    .ivu-tabs-nav .ivu-tabs-tab{
        padding-top: 15px;
        .ivu-badge {
            top:-8px;
            left:5px;
        }
    }
}
</style>
