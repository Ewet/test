<template>
   <div class="gift-roll-setting">
    <ModuleHeader title="发放设置">
    </ModuleHeader>
     <Tabs value="1" type="card">
        <TabPane label="发送消息设置"  name="1"><SendMessageSetting/></TabPane>
        <TabPane label="客服消息设置"  name="2"><CustomerServiceMessageSetting/></TabPane>
        <TabPane label="模版消息设置"  name="3"><TemplateMessageSetting/></TabPane>
    </Tabs>
   </div>
</template>
<script>
import SendMessageSetting from './SendMessageSetting';
import CustomerServiceMessageSetting from './CustomerServiceMessageSetting';
import TemplateMessageSetting from './TemplateMessageSetting';

export default {
  name: 'ReleaseSettingIndex',
  components: {
    SendMessageSetting,
    CustomerServiceMessageSetting,
    TemplateMessageSetting
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
