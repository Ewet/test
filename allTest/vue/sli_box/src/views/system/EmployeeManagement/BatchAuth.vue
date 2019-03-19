<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="员工账号">
            <label for="">{{selectedItems.map(x => x.loginAccount).join(',')}}</label>
        </FormItem>
        <FormItem label="选择角色权限" prop="roleItems">
            <Button icon="ios-add" type="dashed" size="small" @click="handleAddRole">添加角色</Button>
            <div class="role-list">
              <div class="role-item" v-for="(item,roleIndex) in formValidate.roleItems" :key="item.value">
                  <h3>角色</h3>
                  <Tag :name="item.value" closable @on-close="handleCloseRole(roleIndex)">{{item.name}}</Tag>
                  <h3>地区</h3>
                  <Tag v-for="(item, areaIndex) in item.areaItems" :key="item.value" :name="item.value" closable @on-close="handleCloseArea(roleIndex, areaIndex)">{{item.name}}</Tag>
                  <Button icon="ios-add" type="dashed" size="small" @click="handleAddArea(roleIndex)">添加地区</Button>
              </div>
            </div>
        </FormItem>
        <FormItem label="选择所属部门" prop="department">
           <Select v-model="formValidate.department" placeholder="选择部门" style="width: 100px">
                <Option
                v-for="(item,index) in departmentOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <!-- <FormItem label="选择所属地区" prop="areaItems">
            <Tag v-for="item in formValidate.areaItems" :key="item.value" :name="item.value" closable @on-close="handleCloseArea">{{item.name}}</Tag>
            <Button icon="ios-add" type="dashed" size="small" @click="handleAddArea">添加地区</Button>
        </FormItem> -->
        <FormItem>
            <Button type="primary" @click="save('formValidate')">保存</Button>
        </FormItem>
        </Form>
</template>
<script>
import { setRole } from './model';
import vuexMixins from 'mixins/module-map';
import { getList as getDepartmentList } from 'views/system/DepartmentManagement/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({
    moduleName: STORE_NAME,
    mutation: ['setRoleModal', 'setAreaModal', 'setBatchAuth'],
    state: ['batchForm']
  })],
  name: 'EmployeeManagementBatchEdit',
  data () {
    return {
      formValidate: {
        department: '',
        areaItems: [],
        roleItems: []
      },
      ruleValidate: {
        roleItems: [
          {
            required: true, type: 'array', min: 1, message: '只少选择一个角色', trigger: 'change'
          }
        ],
        department: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        areaItems: [
          {
            required: true, type: 'array', min: 1, message: '只少选择一个区域', trigger: 'change'
          }
        ]
      },
      id: '',
      departmentOptions: [],
      currentRoleIndex: null
    };
  },
  created () {
    this.$g_on('roleSelect', this.roleSelect);
    this.$g_on('areaSelect', this.areaSelect);
  },
  beforeDestroy () {
    this.$g_off('roleSelect', this.roleSelect);
    this.$g_off('areaSelect', this.areaSelect);
  },
  mounted () {
    this.loadDepartment();
    // this.loadArea();
  },
  methods: {
    roleSelect (row) {
      const roleItems = this.formValidate.roleItems;
      if (!roleItems.some(x => x.value === row.value)) {
        roleItems.push({ ...row, areaItems: [] });
        this.$success('添加成功');
      } else {
        this.$error('重复添加');
      }
    },
    areaSelect (row) {
      const areaItems = this.formValidate.roleItems[this.currentRoleIndex].areaItems;
      if (!areaItems.some(x => x.value === row.value)) {
        areaItems.push(row);
        this.$success('添加成功');
      } else {
        this.$error('重复添加');
      }
    },
    save (name) {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          setRole({
            adminIdArr: this.selectedItems.map(x => x.id),
            roleAreaRelation: this.formValidate.roleItems.map(x => ({
              auth_role_id: x.value,
              areaIdArr: x.areaItems.map(e => e.value)
            })),
            auth_department_id: this.formValidate.department
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setBatchAuth(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
          this.$error('表单验证不正确');
        }
      });
    },
    handleReset (name) {
      this.$refs.formValidate.resetFields();
    },
    async loadDepartment () {
      const { success, data } = await getDepartmentList();
      if (success) {
        this.departmentOptions = data.items.map(x => ({
          name: x.departmentName,
          value: x.id
        }));
      }
    },
    handleAddArea (index) {
      this.currentRoleIndex = index;
      this.setAreaModal(true);
    },
    handleAddRole () {
      this.setRoleModal(true);
    },
    handleCloseRole (roleIndex) {
      this.formValidate.roleItems.splice(roleIndex, 1);
    },
    handleCloseArea (roleIndex, areaIndex) {
      this.formValidate.roleItems[roleIndex].areaItems.splice(areaIndex, 1);
    }
  },
  watch: {
    batchForm (val) {
      this.formValidate.roleItems = [];
    }
    // 'batchForm.roleItems' (val) {
    // //   console.log('batchForm.roleItems', val);
    //   this.formValidate.roleItems = val.map(x => Object.assign({}, x, {areaItems: []}));
    // }
  }
};
</script>
<style lang="less" scoped>
.role-list {
  max-height:300px;
  overflow: auto;
}
.role-item {
  border: 1px dashed;
  padding: 5px 10px;
  margin: 10px auto;
}
</style>
