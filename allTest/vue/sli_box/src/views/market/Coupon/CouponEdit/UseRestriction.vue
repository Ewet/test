<template>
<Form ref="formInline" :label-width="150">
    <Spin size="large" fix v-show="loading"></Spin>
    <!-- <FormItem label="选择商品分类">
        <Input :max="999999" :min="1" v-model="goodsCate"></Input>
    </FormItem>
    <FormItem label="商品使用限制" >
        <RadioGroup v-model="useLimit">
            <Radio :label="1">可以</Radio>
            <Radio :label="0">不可以</Radio>
        </RadioGroup>
    </FormItem> -->
    <FormItem label="填写商品bom码">
        <Input :max="999999" :min="1" v-model="bomCode"></Input>
        <p>多个bom码请用英文“,”分隔开</p>
    </FormItem>
    <FormItem label="指定可用盒子id">
        <Input :max="999999" :min="1" v-model="storeCode"></Input>
        <p>多个盒子id请用英文“,”分隔开</p>
    </FormItem>
    <FormItem>
        <Button type="primary" @click="save">保存</Button>
        <Button type="primary" @click="setModal(false)">返回列表</Button>
    </FormItem>
</Form>
</template>
<script>
import { saveRestriction, getRestriction } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'UseRestriction',
  data () {
    return {
      bomCode: '',
      storeCode: '',
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
        // 商品ID串
        goods_id_str: this.bomCode,
        // 盒子ID串
        box_id_str: this.storeCode
      };
      saveRestriction(data).then(({ success, data, msg }) => {
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
    itemId (val) {
      if (!val) {
        this.bomCode = '';
        this.storeCode = '';
      } else {
        this.loading = true;
        getRestriction(val).then(({ success, data, msg }) => {
          if (success) {
            this.bomCode = data.goodsIdSet.length > 0 ? data.goodsIdSet.join(',') : '';
            this.storeCode = data.boxIdSet.length > 0 ? data.boxIdSet.join(',') : '';
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
