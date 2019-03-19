<template>
   <div>
     <Form inline class="toolBarForm">
        <FormItem>
          <ExportBtn @click="handleExport"/>
        </FormItem>
    </Form>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { exportList } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MerchantShareDetailsTlbar',
  components: {
  },
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
    handleExport () {
      exportList({
        rule_id: this.ruleId,
        merchant_id: this.merchantId
      });
    }
  }
};
</script>

<style scoped lang='less'>
</style>
