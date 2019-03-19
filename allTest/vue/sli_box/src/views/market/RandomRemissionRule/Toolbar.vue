<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WithdrawListToolbar',
  methods: {
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
