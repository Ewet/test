<template>
   <div class="weChatDrawDetail clearfix">
      <table border="0" width="100%" cellspacing="0">
        <tbody>
          <tr>
            <th>创建时间</th>
            <td>{{detailData.createdTime}}</td>
            <th>活动时间</th>
            <td>
              <p>{{detailData.activityTimeStart}}</p>
              <p>{{detailData.activityTimeEnd}}</p>
            </td>
          </tr>
          <tr>
            <th>活动状态</th>
            <td>{{detailData.activeState}}</td>
            <th>创建人</th>
            <td>{{detailData.builtMan}}</td>
          </tr>
          <tr>
            <th>规则</th>
            <td colspan="3">{{detailData.activityRules}}</td>
          </tr>
          <tr>
            <th>盒子</th>
            <td colspan="3">
              <ul class="list-content">
                <li v-for="(item,index) in detailData.boxList" :key="index">{{item.boxNo}}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>商品Bom码</th>
            <td colspan="3">
              <ul class="list-content">
                <li v-for="(item,index) in detailData.commodityList" :key="index">{{item.goodsBom}}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <Button type="primary" class='CommonModalCancel' @click="setWeChatDrawDetailModal(false)">关闭</Button> -->
      <CloseBtn @click="setWeChatDrawDetailModal(false)"></CloseBtn>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'WeChatDrawDetail'
};
</script>

<style lang='less'>
.weChatDrawDetail{
  @import '~@/assets/common.less';
  table{
    border-collapse: collapse;
    margin-bottom: 10px;
    tr{
      height: 36px;
      font-size: 12px;
      color: #666;
      td,th{
        text-align: left;
        border:1px solid #e8e8e8;
        padding: 12px 18px;
        word-break: break-all;
        ul,li{
          list-style: none;
        }
      }
      th{
        width: 150px;
      }
    }
    .list-content {
      max-height: 200px;
      overflow: auto;
    }
  }
}
</style>
