<template>
    <div class="page" style="margin:10px;">
        <ModuleHeader title="客服消息发送"></ModuleHeader>
        <SendForm/>
          <ZTable
          height="500"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
    </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';

import SendForm from './SendForm';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageSend',
  mounted () {
    this.pageChange(1);
  },
  components: {
    SendForm
  },
  methods: {
    refresh () {
      this.reload();
    }
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '电话号码',
          key: 'phone'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '发送时间',
          key: 'time'
        },
        {
          title: '发送人',
          key: 'operater'
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
