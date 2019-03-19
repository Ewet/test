<template>
 <div class="order-list">
      <ZTable
          :columns="columns"
          :items="recordItems"
          :loading="isLoading"
          :showPageBar="false"
          :height="600"
        >
      </ZTable>
 </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';
import { getRecord } from './model';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DividedSettingsOperationRecord',
  data () {
    return {
      // title: ''
      columns: [
        {
          title: '时间',
          key: 'operationTimeformatted',
          minWidth: 120
        },
        {
          title: '操作者',
          key: 'operator',
          minWidth: 80
        },
        {
          title: '操作类型',
          key: 'operationTypeFormatted',
          minWidth: 120
        },
        {
          title: '历史数据',
          key: 'historicalData',
          minWidth: 120
        },
        {
          title: '最新数据',
          key: 'latestData',
          minWidth: 120
        }
      ],
      recordItems: []
    };
  },
  methods: {
    loadData () {
      this.spinShow = true;
      getRecord({
        merchant_id: this.merchantId,
        rule_id: this.itemId
      }).then((result) => {
        // console.log('result', result);
        if (result.success) {
          this.recordItems = result.data;
        } else if (result.msg) {
          this.$error({
            content: `获取数据失败${result.msg}`
          });
        }
        this.spinShow = false;
      });
    }
  },
  watch: {
    showOperationRecordModal (val) {
      if (val) {
        this.loadData();
      }
    }
  },
  components: {
  }
};
</script>
<style scoped lang="less">
.order-list {
  header {
    position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    button {
      position: absolute;
      right: 0;
      top:0;
    }
  }
}
</style>
