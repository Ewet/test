<template>
   <div class="OperationRecord">
      <Table
            border
            :columns="operationRecordColumns"
            :data="operationRecordData"
            :loading="operationRecordDataLoadings"
        >
      </Table>
   </div>
</template>

<script>
import { getOperationRecordData } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'OperationRecord',
  components: {
  },
  data () {
    return {
      operationRecordData: [],
      operationRecordDataLoadings: false,
      operationRecordColumns: [
        {
          title: '操作员',
          key: 'operator',
          minWidth: 100
        },
        {
          title: '时间',
          key: 'time',
          minWidth: 160
        },
        {
          title: '动作',
          key: 'action',
          minWidth: 120
        }
      ]
    };
  },
  methods: {
    async loadData () {
      this.operationRecordDataLoadings = true;
      let { success, data, msg } = await getOperationRecordData(this.limitRuleId);
      if (success) {
        this.operationRecordData = data.items;
      } else {
        this.$error(msg);
      }
      this.operationRecordDataLoadings = false;
    }
  },
  watch: {
    showOperationRecordModal (val) {
      if (val) {
        this.loadData();
      } else {
        this.operationRecordData = [];
      }
    }
  }
};
</script>

<style scoped lang='less'>
</style>
