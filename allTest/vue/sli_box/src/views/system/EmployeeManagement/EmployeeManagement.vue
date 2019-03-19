<!--优惠劵列表-->
<template>
 <div class="coupon-list">
   <ModuleHeader title="员工列表">
     <ZBtn slot="right" @click="addItem">添加员工</ZBtn>
    </ModuleHeader>
    <Toolbar />
    <div style="margin-bottom:10px;">
        <ZBtn size="small" @click="handleRemoveAccount">批量删除账号</ZBtn>
        <ZBtn size="small" @click="handleEditRole">批量修改角色</ZBtn>
        <p class="remark">注：Administrator 是超级管理员账号，不允许修改角色，修改密码，或删除账号。</p>
    </div>
    <List slot="content" style="height:100%;overflow:auto"/>
    <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div> -->
    <Modal
        :value="showModal"
        :title="itemId? '员工编辑' : '员工新增'"
        :footerHide= "true"
        @on-cancel="setModal(false)"
        >
        <EmployeeManagementEdit/>
    </Modal>
    <Modal
        :value="showBatchAuthModal"
        title= "员工批量编辑"
        :footerHide= "true"
        @on-cancel="setBatchAuth(false)"
        >
        <!-- <EmployeeManagementEdit/> -->
        <BatchAuth/>
    </Modal>
     <Modal
        :value="showAreaModal"
        width="62.5%"
        :footerHide="true"
        @on-cancel="setAreaModal(false)">
        <AreaSelect @itemSelect="areaSelect"/>
      </Modal>
       <Modal
          :value="showRoleModal"
          width="62.5%"
          :footerHide="true"
          @on-cancel="setRoleModal(false)">
        <RoleSelect @itemSelect="roleSelect"/>
      </Modal>
 </div>
</template>
<script>
import List from './List';
import vuexMixins from 'mixins/module-map';
import Toolbar from './Toolbar';
import EmployeeManagementEdit from './Edit';
import BatchAuth from './BatchAuth';
import { delItem } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({
    moduleName: STORE_NAME,
    state: ['showAreaModal', 'showRoleModal', 'showBatchAuthModal'],
    mutation: ['setRoleModal', 'setAreaModal', 'assignFormData', 'addAreaItem', 'addRoleItem', 'setBatchAuth']
  })],
  name: 'EmployeeManagementIndex',
  data () {
    return {
    };
  },
  methods: {
    validateHasSelectedRows () {
      if (this.selectedItems.length === 0) {
        this.$error('没有选中任何记录!');
        return false;
      }
      return true;
    },
    handleRemoveAccount () {
      if (!this.validateHasSelectedRows()) {
        return false;
      }
      this.$Modal.confirm({
        title: '确定删除以下员工吗？',
        content: this.selectedItems.map(x => x.employeeName).join(','),
        onOk: () => {
          delItem(this.selectedItems.map(x => x.id).join(',')).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    },
    handleEditRole () {
      if (!this.validateHasSelectedRows()) {
        return false;
      }
      this.setBatchAuth(true);
    },
    areaSelect (item) {
      // this.addAreaItem({
      //   name: item.districtName,
      //   value: item.districtId
      // });
      this.$g_emit('areaSelect', {
        name: item.districtName,
        value: item.districtId
      });
    },
    roleSelect (item) {
      this.$g_emit('roleSelect', {
        name: item.roleName,
        value: item.id
      });
      // this.addRoleItem({
      //   name: item.roleName,
      //   value: item.id
      // });
    }
  },
  components: {
    List,
    Toolbar,
    EmployeeManagementEdit,
    BatchAuth
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
