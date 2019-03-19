
<template>
    <Form inline class="toolBarForm">
            <RefreshBtn @click='handleRefresh'/>
        <FormItem label='商户名称'>
            <Input type="text" v-model="filterObj.merchantName" placeholder="请输入商户名称">
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
  name: 'MerchantManagementToolbar',
  data () {
    return {
      filterObj: {
        merchantName: ''
      }
    };
  },
  methods: {
    handleSubmit () {
      this.filterData({
        name: this.filterObj.merchantName
      });
    },
    reset () {
      this.filterObj = {
        merchantName: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
