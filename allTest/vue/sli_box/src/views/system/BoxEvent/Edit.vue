<template>
    <div class='boxEventEdit'>
      <table border="0px" width="100%">
        <thead>
          <tr>
            <td width="36%">盒子编号</td>
            <td width="60%">{{formData.boxNum}}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>事件ID</td>
            <td>{{formData.alertId}}</td>
          </tr>
          <tr>
            <td>流水号</td>
            <td>{{formData.alertNo}}</td>
          </tr>
          <tr>
            <td>创建时间</td>
            <td>{{formData.createdTime}}</td>
          </tr>
          <tr>
            <td>告警类型</td>
            <td>{{formData.alterType}}</td>
          </tr>
          <tr>
            <td>告警来源</td>
            <td>{{formData.alertSource}}</td>
          </tr>
          <tr>
            <td>告警代码</td>
            <td>{{formData.alertCode}}</td>
          </tr>
          <tr>
            <td>告警级别</td>
            <td>{{formData.alertLevel}}</td>
          </tr>
          <tr>
            <td>告警数据</td>
            <td><ZBtn size="small" @click="setDataDetailModal(true)">查看详情</ZBtn></td>
          </tr>
        </tbody>
      </table>
      <CloseBtn style='float:right;margin:40px 0 10px' @click="setViewModal(false)"/>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  name: 'boxEventEdit',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      dataDetail: false
    };
  }

};
</script>
<style lang="less">
.boxEventEdit{
  clear: both;
  overflow: hidden;
  table{
    thead{
      background: #f2f2f2;
    }
    tr{
      height: 36px;
      font-size: 14px;
      color: #666;
      td{
        border: 1px solid #e6e6e6;
        padding: 9px 15px;
      }
    }
  }
}

</style>
