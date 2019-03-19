<template>
<Form ref="formInline" :label-width="150">
    <Spin size="large" fix v-show="loading"></Spin>
    <FormItem label="是否使用统一说明" >
        <RadioGroup v-model="isUddi">
            <Radio label="1">使用</Radio>
            <Radio label="0">不使用</Radio>
        </RadioGroup>
        <p>统一说明在【基础设置】中设置，如果使用统一说明，则在优惠劵说明前面显示统一说明</p>
    </FormItem>
    <FormItem label="使用说明">
        <ZRichText v-model="description"/>
    </FormItem>
    <FormItem>
        <Button type="primary" @click="save">保存</Button>
        <Button type="primary" @click="setModal(false)">返回列表</Button>
    </FormItem>
</Form>
</template>
<script>
// import UE from 'common/UE.vue';
import { saveInstruction, getInstruction } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'UseInstruction',
  data () {
    return {
      isUddi: '1',
      description: '',
      loading: false
    };
  },
  methods: {
    save () {
      if (!this.itemId) {
        this.$error('请先保存基础设置');
        return false;
      }
      const data = {
        // 优惠券模版ID
        coupon_id: this.itemId,
        // 统一说明开关 ( 0否, 1是)
        is_uddi: this.isUddi,
        // 富文本编辑内容
        description: this.description
      };
      saveInstruction(data).then(({ success, data, msg }) => {
        if (success) {
          this.$success('保存成功');
          this.reload();
        } else {
          this.$error(msg);
        }
      });
    }
  },
  watch: {
    itemId (val, oldVal) {
      if (!val) {
        this.isUddi = '1';
        this.description = '';
      } else {
        this.loading = true;
        getInstruction(val).then(({ success, data, msg }) => {
          if (success) {
            this.isUddi = data.isUddi;
            this.description = data.description;
            this.loading = false;
          } else {
            this.$error(msg);
          }
        });
      }
    }
  }
};
</script>
