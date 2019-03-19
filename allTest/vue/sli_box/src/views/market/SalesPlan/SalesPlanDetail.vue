<template>
    <div class='salesPlanDetail'>
      <div class='content'>
        <p>货架编号：<span>{{formData.shelfNo}}</span></p>
        <p>货区编号：<span>{{formData.layerNo}}</span></p>
        <p>在售商品：<span>{{formData.layerGoodsName}}</span></p>
        <p><pre>库       存：</pre><span>{{formData.quantity}}</span></pre>
        <p><pre>价       格：</pre><span>{{formData.layerPriceFormat}}</span></p>
        <i class='line'/>
        <h3>计划信息</h3>
        <p>创建时间：<span>{{formData.createdTimeFormat}}</span></p>
        <p>计划类型：<span>{{formData.planTypeFormat}}</span></p>
        <p>计划时间：<span>{{formData.plannedTimeFormat}}</span></p>
        <p>商品名称：<span>{{formData.planGoodsName}}</span></p>
        <p><pre>价       格：</pre><span>{{formData.planPriceFormat}}</span></p>
        <p><pre>状       态：</pre><span>{{formData.statusFormat}}</span></p>
      </div>
      <Button style='float:right;margin:40px 0 10px' @click="cancel">关闭</Button>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'SalesPlanDetail',
  data () {
    return {};
  },
  methods: {
    cancel () {
      this.setViewModal(false);
    }
  }
};
</script>
<style scoped lang='less'>
.salesPlanDetail{
  clear: both;
  overflow: hidden;
  .content{
    p{
      font-size: 14px;
      line-height: 26px;
      color: #707070;
      pre{
        display: inline;
        margin: 0;
        font-family: '微软雅黑';
        font-size: 14px;
        color: #707070;
      }
    }
    i.line{
      display: block;
      height: 1px;
      width: 100%;
      background: #DDD;
      margin: 20px 0;
    }
  }
}
</style>
