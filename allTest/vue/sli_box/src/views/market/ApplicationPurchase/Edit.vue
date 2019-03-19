<template>
    <div class='applicationPurchaseEdit'>
      <Form>
        <FormItem label="备注">
          <Input type="textarea" :rows='4' :maxlength='255' v-model="remark" placeholder="请输入备注"></Input>
        </FormItem>
        <FormItem style="margin-left: 36px;">
          <PassBtn @click="handlePass(2)" :size='"default"'/>
          <NoPassBtn @click="handlePass(3)" :size='"default"'/>
        </FormItem>
      </Form>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';
import { pass } from './model';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ApplicationPurchaseEdit',
  data () {
    return {
      remark: ''
    };
  },
  methods: {
    async handlePass (status) {
      const { success, msg } = await pass({
        purchasing_apply_id: this.itemId,
        auditing_status: status,
        auditing_remark: this.remark
      });
      if (success) {
        this.$success(status === 2 ? '审核通过成功！' : '审核不通过成功！');
        this.setViewModal(false);
        this.remark = '';
        this.reload();
      } else {
        this.$error(msg);
      }
    }
  }
};
</script>
<style scoped>
.applicationPurchaseEdit .ivu-input-wrapper{
  width: 84%;
}
</style>
