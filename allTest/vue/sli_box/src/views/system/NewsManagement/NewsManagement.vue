
<template>
 <div class="order-list">
    <ModuleHeader title="新闻列表">
        <Button  type="primary" slot="right" @click="addItem">新增新闻信息</Button>
      </ModuleHeader>
    <Toolbar slot="searchbar"/>
    <List slot="content" style="height:100%;overflow:auto"/>

    <Modal
        :value="showModal"
        :title="itemId? '编辑新闻信息' : '新增新闻信息'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        width="700"
        >
        <Edit/>
    </Modal>

    <Modal
      title="图片预览"
      :footerHide= "true"
      :value="visible"
      @on-cancel="setVisible(false)"
      >
      <img :src="visibleUrl" v-if="visible" style="width: 100%">
    </Modal>

 </div>
</template>
<script>
import List from './List';
import Toolbar from './Toolbar';
import Edit from './Edit';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'NewsListIndex',
  data () {
    return {
    };
  },
  components: {
    List,
    Toolbar,
    Edit
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
