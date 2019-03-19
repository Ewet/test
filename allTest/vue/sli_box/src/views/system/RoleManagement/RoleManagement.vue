<!--优惠劵列表-->
<template>
 <div class="coupon-list">
   <ModuleHeader title="角色列表">
     <ZBtn slot="right" @click="addItem">添加角色</ZBtn>
    </ModuleHeader>
    <Toolbar />
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
     <Modal
        :value="showModal"
        :title="itemId? '角色编辑' : '角色新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        width="800"
        >
        <RoleManagementEdit/>
    </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import RoleManagementEdit from './Edit';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RoleManagementIndex',
  data () {
    return {
    };
  },
  methods: {
  },
  components: {
    List,
    Toolbar,
    RoleManagementEdit
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
