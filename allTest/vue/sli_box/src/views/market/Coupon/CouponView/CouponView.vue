<template>
   <div class="coupon-view" v-if="Object.keys(formData).length">
    <Spin size="large" fix v-show="itemLoading"></Spin>
    <h3>基本</h3>
    <Form ref="formInline" :label-width="150">
        <FormItem label="排序：">{{formData.basic.sort}}</FormItem>
        <FormItem label="优惠劵名称：">{{formData.basic.couponName}}</FormItem>
        <FormItem label="使用条件：">{{formData.basic.conditionFormatted}}</FormItem>
        <FormItem label="使用时间限制：">{{formData.basic.effectiveTime}}</FormItem>
        <FormItem label="优惠方式：">{{formData.basic.couponTypeFormatted}}</FormItem>
        <!-- <FormItem label="是否可叠加：">{{formData.basic.superposableFormatted}}</FormItem> -->
        <FormItem label="每人领取最大数：">{{formData.basic.maxCount}}</FormItem>
        <FormItem label="发放总数：">{{formData.basic.stock === -1 ? '不限' : formData.basic.stock}}</FormItem>
    </Form>
    <h3>领取设置</h3>
    <Form ref="formInline" :label-width="150">
        <FormItem label="是否创建直接领取链接：">{{formData.receive.attachableFormatted}}</FormItem>
        <FormItem label="加入领劵中心：">{{formData.receive.couponCenterVisibleFormatted}}</FormItem>
    </Form>
    <h3>使用限制</h3>
    <Form ref="formInline" :label-width="150">
        <FormItem label="商品bom码：">{{formData.restriction.goodsIdSet.length > 0 ? formData.restriction.goodsIdSet.join(',') :  '无限制'}}</FormItem>
        <FormItem label="门店编号：">{{formData.restriction.boxIdSet.length > 0 ? formData.restriction.boxIdSet.join(',') :  '无限制'}}</FormItem>
    </Form>
    <h3>使用说明</h3>
    <Form ref="formInline" :label-width="150">
        <FormItem label="是否使用统一说明：">{{formData.instruction.isUddiFormatted}}</FormItem>
        <FormItem label="内容：">
            <p v-html="formData.instruction.description"></p>
        </FormItem>
    </Form>
   </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CouponDetailIndex'
};
</script>
<style lang="less" >
.coupon-view {
    img {
        width: 100%;
    }
}
</style>
<style lang="less" scoped>
.coupon-view {
    max-height: 500px;
    overflow: auto;
    h3 {
        border-bottom: 2px solid #eee;
        line-height: 3;
        margin:10px 0;
    }
}

</style>
