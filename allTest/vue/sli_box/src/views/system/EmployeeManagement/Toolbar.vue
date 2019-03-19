
<template>
    <Form inline class="toolBarForm">
      <!-- <FormItem > -->
            <!-- <Button type="primary" @click="handleRefresh">刷新</Button> -->
        <RefreshBtn @click="handleRefresh"/>
        <!-- </FormItem> -->
        <FormItem  label='登录账户'>
            <Input type="text" v-model="filterObj.username" placeholder="请输入登录账户或员工姓名">
            </Input>
        </FormItem>
         <FormItem label='部门'>
            <Select v-model="filterObj.department" placeholder="选择部门">
                <Option
                v-for="(item,index) in departmentOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
          <FormItem label='角色'>
            <Select v-model="filterObj.role" placeholder="选择角色">
                <Option
                v-for="(item,index) in roleOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
          <FormItem label='区域'>
            <Select v-model="filterObj.area" placeholder="选择区域">
                <Option
                v-for="(item,index) in areaOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="reset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getList as getAreaList } from 'views/system/RegionalManagement/model';
import { getList as getRoleList } from 'views/system/RoleManagement/model';
import { getList as getDepartmentList } from 'views/system/DepartmentManagement/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'EmployeeManagementToolbar',
  data () {
    return {
      filterObj: {
        username: '',
        department: '',
        role: '',
        area: ''
      },
      departmentOptions: [],
      roleOptions: [],
      areaOptions: []
    };
  },
  methods: {
    handleSubmit () {
      this.filterData({
        login_name: this.filterObj.username,
        auth_department_id: this.filterObj.department,
        role_id: this.filterObj.role,
        district_id: this.filterObj.area
      });
    },
    reset () {
      this.filterObj = {
        username: '',
        department: '',
        role: '',
        area: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    },
    async loadDepartment () {
      const { success, data } = await getDepartmentList();
      if (success) {
        this.departmentOptions = data.items.map(x => ({
          name: x.departmentName,
          value: x.id
        }));
        this.departmentOptions.unshift({
          name: '全部',
          value: ''
        });
      }
    },
    async loadRole () {
      const { success, data } = await getRoleList();
      if (success) {
        this.roleOptions = data.items.map(x => ({
          name: x.roleName,
          value: x.id
        }));
        this.roleOptions.unshift({
          name: '全部',
          value: ''
        });
      }
    },
    async loadArea () {
      const { success, data } = await getAreaList();
      if (success) {
        this.areaOptions = data.items.map(x => ({
          name: x.districtName,
          value: x.districtId
        }));
        this.areaOptions.unshift({
          name: '全部',
          value: ''
        });
      }
    }
  },
  mounted () {
    this.loadDepartment();
    this.loadRole();
    this.loadArea();
  }
};
</script>
