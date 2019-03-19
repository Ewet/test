<template>
   <Form ref="formInline" :label-width="120">
        <h3>上下线关系设置</h3>
        <FormItem label="成为下线条件">
            <RadioGroup v-model="subordinate">
               <Radio :key="item.value" :label="item.value" v-for="item in subordinateOptions">{{item.name}}</Radio>
            </RadioGroup>
            <p>首次点击分享链接：可以自由设置分销商条件<br/>
            首次下单/首次付款：无条件不可用
            </p>
        </FormItem>
         <!-- <FormItem label="分销内购" >
            <RadioGroup v-model="purchase">
                <Radio :label="1">关闭</Radio>
                <Radio :label="2">开启</Radio>
            </RadioGroup>
        </FormItem> -->
        <h3>分销资格设置</h3>
        <FormItem label="成为分销商条件" >
            <RadioGroup v-model="trader">
                <Radio :key="item.value" :label="item.value" v-for="item in traderOptions">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="是否需要审核" >
            <RadioGroup v-model="audit">
                <Radio label="1">需要</Radio>
                <Radio label="0">不需要</Radio>
            </RadioGroup>
        </FormItem>
        <!-- <FormItem label="分销商必须完善资料" >
            <RadioGroup v-model="level">
                <Radio :label="1">需要</Radio>
                <Radio :label="2">不需要</Radio>
            </RadioGroup>
            <p>分销商在分销或者提现是是否必须完善资料</p>
        </FormItem> -->
    <FormItem>
        <Button type="primary" @click="save">确定</Button>
    </FormItem>
   </Form>
  </div>
</template>
<script>
import { getRelation, updateRelation } from './model';
import { getSubordinateCondition, getTraderCondition } from 'model/enum';

export default {
  name: 'BaseSettingRelation',
  data () {
    return {
      subordinate: -1,
      trader: -1,
      audit: -1,
      subordinateOptions: [],
      traderOptions: []
    };
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      getRelation().then(({ success, msg, data }) => {
        if (success) {
          this.subordinate = data.subordinate;
          this.trader = data.trader;
          this.audit = data.audit;
        } else {
          this.$error(msg);
        }
      });
      getSubordinateCondition().then(({ success, msg, data }) => {
        if (success) {
          this.subordinateOptions = data;
        } else {
          this.$error(msg);
        }
      });
      getTraderCondition().then(({ success, msg, data }) => {
        if (success) {
          this.traderOptions = data;
        } else {
          this.$error(msg);
        }
      });
    },
    save () {
      updateRelation({
        tobe_subordinate: this.subordinate,
        tobe_trader: this.trader,
        tobe_trader_audi: this.audit
      }).then(({ success, msg }) => {
        if (success) {
          this.$success('保存成功!');
        } else {
          this.$error(msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
    border-bottom: 1px solid #dddee1;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
</style>

</style>
