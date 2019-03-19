
<template>
    <Form inline class="toolBarForm">
            <RefreshBtn @click='handleRefresh'/>
        <FormItem label='员工姓名'>
            <Input type="text" v-model="filterObj.name" placeholder="请输入员工姓名">
            </Input>
        </FormItem>
        <FormItem label="部门">
            <Select clearable v-model="filterObj.department" placeholder="部门">
                <Option
                v-for="item in departmentOptions"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
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
import { getList } from 'views/system/DepartmentManagement/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageSettingsToolbar',
  data () {
    return {
      departmentOptions: [], // 部门列表
      filterObj: {
        name: '',
        department: ''
      }
    };
  },
  mounted () {
    this.getDepartmentList();
  },
  methods: {
    // 获取部门列表
    async getDepartmentList () {
      const { success, data, msg } = await getList({
        'pagination[page]': 1,
        'pagination[page_size]': 1000000
      });
      if (success) {
        this.departmentOptions = data.items;
      } else {
        return msg;
      }
    },
    handleSubmit () {
      this.filterData({
        work_name: this.filterObj.name,
        auth_department_id: this.filterObj.department
      });
    },
    reset () {
      this.filterObj = {
        name: '',
        department: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
