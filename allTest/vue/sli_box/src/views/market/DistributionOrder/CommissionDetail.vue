<template>
  <div class="commission-detail">
         <Row>
            <Col span="5">订单金额</Col>
            <Col span="18" offset="1">{{formData.orderTotal}}</Col>
        </Row>
        <Row>
            <Col span="5">分销会员</Col>
            <Col span="18" offset="1">{{formData.user}}</Col>
        </Row>
         <Row>
            <Col span="5">佣金</Col>
            <Col span="18" offset="1">{{formData.commission}}</Col>
        </Row>
         <Row>
            <Col span="5">物流状态</Col>
            <Col span="18" offset="1">{{formData.shipStatus}}</Col>
        </Row>
        <Row>
            <Col span="5">创建时间</Col>
            <Col span="18" offset="1">{{formData.createTime}}</Col>
        </Row>
         <Row>
            <Col span="5">完成时间</Col>
            <Col span="18" offset="1">{{formData.finishedTime}}</Col>
        </Row>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  //   mixins: [vuexMixins({moduleName: 'distributionOrder'})],
  name: 'DistributionOrderCommissionDetail'
};
</script>
<style lang="less" scoped>
.commission-detail {
    position: relative;
    line-height: 3;
    .ivu-col:nth-child(1) {
        text-align:right;
    }
}

</style>
