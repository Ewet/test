<template>
 <div class="coupon-list">
   <ModuleHeader title="部门列表">
       <ZBtn slot="right" @click="addItem">添加部门</ZBtn>
    </ModuleHeader>
    <Form inline style="text-align:left">
        <RefreshBtn @click="handleRefresh"/>
    </Form>
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
    <Modal
        :value="showModal"
        :title="itemId? '部门编辑' : '部门新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        >
        <DepartmentManagementEdit/>
      </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import DepartmentManagementEdit from './Edit';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DepartmentManagementIndex',
  data () {
    return {
    };
  },
  methods: {
    handleRefresh () {
      this.reload();
    }
  },
  components: {
    List,
    DepartmentManagementEdit
  },
  watch: {
  }
};
</script>
