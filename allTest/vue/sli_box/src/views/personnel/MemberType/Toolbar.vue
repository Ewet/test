<template>
    <Form inline style="text-align:left">
        <RefreshBtn  @click="refresh" />
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MmberTypeToolbar',
  methods: {
    refresh () {
      this.reload();
    }
  }
};
</script>
