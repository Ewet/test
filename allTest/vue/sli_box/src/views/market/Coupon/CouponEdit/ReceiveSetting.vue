<template>
<Form ref="formInline" :label-width="150">
     <Spin size="large" fix v-show="loading"></Spin>
     <FormItem label="是否创建直接领取链接" >
            <RadioGroup v-model="attachable">
                <Radio label="1">可以</Radio>
                <Radio label="0">不可以</Radio>
            </RadioGroup>
            <p>会员是否可以通过链接直接获取优惠劵。注意！！！此功能无法与支付与积分兑换优惠劵功能同时使用！！！</p>
        </FormItem>
         <FormItem label="加入领劵中心" >
            <RadioGroup v-model="couponCenterVisible">
                <Radio label="1">可以</Radio>
                <Radio label="0">不可以</Radio>
            </RadioGroup>
            <p会员是否可以在领劵中心直接领取或者购买></p>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button type="primary" @click="setModal(false)">返回列表</Button>
        </FormItem>
</Form>
</template>
<script>
import { saveReceive, getReceive } from '../model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'ReceiveSetting',
  data () {
    return {
      attachable: '0',
      couponCenterVisible: '0',
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
        // 是否可由链接领取( 0否, 1是)
        attachable: this.attachable,
        // 是否用户中心可见( 0否, 1是 )
        coupon_center_visible: this.couponCenterVisible
      };
      saveReceive(data).then(({ success, data, msg }) => {
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
        this.attachable = '0';
        this.couponCenterVisible = '0';
      } else {
        this.loading = true;
        getReceive(val).then(({ success, data, msg }) => {
          if (success) {
            this.attachable = data.attachable;
            this.couponCenterVisible = data.couponCenterVisible;
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
