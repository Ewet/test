<template>
    <div style="min-height:420px">
      <ModuleHeader title="微信抽奖活动列表">
        <!-- <Button type="primary" slot="right" @click="addItem">新建活动</Button> -->
        <AddActivityBtn slot="right" @click="addItem"></AddActivityBtn>
      </ModuleHeader>
      <RefreshBtn @click="reload"/>
      <List></List>
      <Modal
        :value="showModal"
        title="基础设置"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="offModal"
        :width="800"
        >
        <Edit/>
      </Modal>
      <Modal
        :value="showAwardModal"
        title="奖项设置"
        :footerHide= "true"
        @on-cancel="setAwardModal(false)"
        :width="1000"
      >
        <WeChatprizeSettings />
      </Modal>
      <Modal
        :value="showPrizeEditModal"
        title="奖品设置"
        :footerHide= "true"
        @on-cancel="setPrizeEditModal(false)"
        :width="600"
        >
        <WeChatprizeSettingsEdit />
      </Modal>
      <Modal
        :value="showWeChatDrawDetailModal"
        :title="detailData.activityName+' - 周期（'+detailData.activeCycle+'单）'"
        :footerHide= "true"
        @on-cancel="setWeChatDrawDetailModal(false)"
        :width="800"
        >
        <Detail/>
      </Modal>
    </div>
</template>
<script>
import WeChatprizeSettings from './PrizeSettings';
import WeChatprizeSettingsEdit from './PrizeSettings/Edit';
import vuexMixins from 'mixins/module-map';
import List from './List';
import Edit from './Edit';
import Detail from './Detail';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatDraw',
  components: {
    List,
    Edit,
    WeChatprizeSettings,
    WeChatprizeSettingsEdit,
    Detail
  },
  methods: {
    offModal () {
      this.$g_emit('clearEditModal');
    },
    refresh () {
      this.reload();
    }
  },
  data () {
    return {

    };
  }
};
</script>
