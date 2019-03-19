<template>
    <div >
      <table border="0" cellspacing="0" cellpadding="0" style="width:100%;text-align:left;" class="infoBox">
        <tr class="infoRow">
          <th class="infoCol w25">创建时间</th>
          <td class="infoCol w25">{{this.formValidate.creatTime}}</td>
          <th  class="infoCol w25">活动时间</th>
          <td class="infoCol w25 noRight" v-html="this.formValidate.activityTime"></td>
        </tr>
        <tr class="infoRow">
          <th class="infoCol">活动状态</th>
          <td class="infoCol w25">{{this.formValidate.activityState}}</td>
          <th  class="infoCol">创建人</th>
          <td class="infoCol w25 noRight" v-html="this.formValidate.rounder"></td>
        </tr>
        <tr class="infoRow">
          <th class="infoCol">红包金额</th>
          <td class="infoCol noRight" colspan="3">{{this.formValidate.money}}</td>
        </tr>
        <tr class="infoRow">
          <th class="infoCol noBottom">奖励限制</th>
          <td class="infoCol noBottom noRight" colspan="3">{{this.formValidate.restrictions}}</td>
        </tr>
      </table>
      <Row style="text-align:right;">
        <Col span="24"><Button class="closeBtn" type="primary" @click="setInfoModal(false)" >关闭</Button></Col>
     </Row>

    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      formValidate: {
        creatTime: '', // 创建时间
        activityName: '', // 活动名称
        activityTime: '', // 活动时间
        activityState: '', // 活动状态
        rounder: '', // 创建人
        rounderId: '', // 创建人ID
        money: null, // 红包金额/ 奖励金额
        restrictions: null, // 奖励限制
        activityId: ''
      }

    };
  },
  mounted () {
  },
  methods: {
  },
  watch: {
    activityData (val) {
      if (Object.keys(val).length > 0) {
        this.formValidate.activityId = this.activityData.activityId;//   活动名称Id
        this.formValidate.activityName = this.activityData.activityName;//   活动名称
        this.formValidate.activityTime = `${this.activityData.startTime}<br/>${this.activityData.endTime}`;//   活动时间
        this.formValidate.money = parseFloat(this.activityData.amount);// 奖励金额
        this.formValidate.restrictions = parseInt(this.activityData.limit);// 奖励限制次数
        this.formValidate.rounderId = this.activityData.rounderId;// 活动创建人ID
        this.formValidate.rounder = this.activityData.rounder;// 活动创建人名称
        this.formValidate.creatTime = this.activityData.creatTime;// 活动创建时间
        this.formValidate.activityState = this.activityData.activityState;// 活动状态
      } else {
        this.formValidate = {
          creatTime: '', // 创建时间
          activityName: '', // 活动名称
          activityTime: '', // 活动时间
          activityState: '', // 活动状态
          rounder: '', // 创建人
          rounderId: '', // 创建人ID
          money: null, // 红包金额/ 奖励金额
          restrictions: null, // 奖励限制
          activityId: ''
        };
      }
    }
  },
  components: {

  },
  computed: {

  }
};
</script>
<style lang="less">
.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #fff;
}
</style>
<style lang="less" scoped>
.infoBox{
  border-color:#e9eaec;
  border-collapse: collapse;
}
.infoRow{
  border-bottom:1px solid #e9eaec;
}

.infoCol{
  padding:15px;
}
td,th{
  border:1px solid  #e9eaec;
}
.w5{
  width: 50%;
}
.w25{
  width: 25%;
}
.closeBtn{
  margin:20px 0 0 0;
}

</style>
