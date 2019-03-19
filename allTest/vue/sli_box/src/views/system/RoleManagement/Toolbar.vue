
<template>
  <Form inline class="toolBarForm">
            <RefreshBtn @click="handleRefresh"/>
        <FormItem label='角色名称'>
            <Input type="text" v-model="filterObj.username" placeholder="角色名称">
            </Input>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="reset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RoleManagementToolbar',
  data () {
    return {
      filterObj: {
        username: '',
        area: ''
      },
      areaOptions: []
    };
  },
  methods: {
    handleSubmit () {
      this.filterData({
        role_name: this.filterObj.username,
        area_id: this.filterObj.area
      });
    },
    reset () {
      this.filterObj = {
        username: '',
        area: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
