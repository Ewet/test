<template>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleSubmit"/>
       <FormItem label="商品BOM码">
            <Input type="text" v-model="filterObj.bom_code" placeholder="商品BOM码">
            </Input>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingRulesToolbar',
  data () {
    return {
      filterObj: {
        bom_code: ''
      }
    };
  },
  methods: {
    handleSubmit () {
      this.filterData(Object.assign({ ...this.filterObj }));
    },
    handleReset () {
      this.filterObj = {
        bom_code: ''
      };
      this.clearFilter();
    }
  }
};
</script>
