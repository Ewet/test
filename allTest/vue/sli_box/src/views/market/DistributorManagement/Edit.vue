<template>
  <div class="dm-detail">
        <Spin size="large" fix v-show="itemLoading"></Spin>
        <Form :label-width="150">
        <FormItem label="姓名">
            {{traderData.name}}
        </FormItem>
        <FormItem label="手机">
            {{traderData.mobile}}
        </FormItem>
        <FormItem label="分销商规则">
            <Select style="width:200px" v-model="traderData.ruleId" placeholder="请选择规则">
              <Option value="-1">无</Option>
              <Option v-for="item in ruleList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="">
             <SaveBtn @click="handleSave"/>
        </FormItem>
        </Form>
  </div>
</template>
<script>
import { updateItem } from './model';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DistributorManagementDetailIndex',
  data () {
    return {
      spinShow: false,
      ruleList: [],
      traderData: {}
    };
  },
  methods: {
    loadData () {
      this.spinShow = true;
    },
    handleSave (val) {
      updateItem({
        trader_id: this.traderData.id,
        rule_id: this.traderData.ruleId
      })
        .then(({ success, msg }) => {
          if (success) {
            this.$success('保存成功!');
            this.setModal(false);
            this.reload();
          } else {
            this.$error(msg);
          }
        });
    }
  },
  watch: {
    formData (val) {
      this.ruleList = val.ruleList;
      this.traderData = Object.assign({}, { ...val });
    }
  }
};
</script>

<style lang="less">
.order-detail {
  position: relative;
    line-height: 3;
    .ivu-col:nth-child(1) {
        text-align:right;
    }
}
</style>
