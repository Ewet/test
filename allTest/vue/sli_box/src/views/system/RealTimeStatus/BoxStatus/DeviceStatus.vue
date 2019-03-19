<template>
   <div class="deviceStatus">
       <Card style="margin-bottom: 10px;">
            <p slot="title">
                设备状态
            </p>
            <div>
              <table width="100%" cellspacing="0">
                <tbody>
                  <tr>
                    <th>盒子状态</th>
                    <td>
                      <span v-if="datas.online === 1">在线</span>
                      <span v-else>离线</span>
                    </td>
                  </tr>
                  <tr v-if="boxType === 1">
                    <th>是否有人</th>
                    <td>
                      <WordImg v-if="[1, 3].includes(datas.body_induction)" :word="'有人'" :icon="5"/>
                      <WordImg v-else-if='[0, 2].includes(datas.body_induction)' :word="'没人'" :icon="6"/>
                      <WordImg v-else :word="'未知'" :icon="3"/>
                    </td>
                  </tr>
                  <tr>
                    <th>门态</th>
                    <td>
                      <WordImg v-if="datas.door_is_open === true" :word="'开着的'" :icon="7"/>
                      <WordImg v-else-if="datas.door_is_open === null" :word="'未知'" :icon="3"/>
                      <WordImg v-else :word="'关着的'" :icon="8"/>
                      <OffDoorBtn @click="handleOffDoor" style="margin-left: 30px;"/>
                    </td>
                  </tr>
                  <tr>
                    <th>灯光</th>
                    <td>
                      <p>照明灯：
                        <WordImg v-if="ligths.floodlight === true" :word="'开'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '1', boxNo: boxNo, lightName: '照明灯'})"/>
                        <WordImg v-else-if="ligths.floodlight === null" :word="'未知'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '1', boxNo: boxNo, lightName: '照明灯'})"/>
                        <WordImg v-else :word="'关'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '1', boxNo: boxNo, lightName: '照明灯'})"/>
                      </p>
                      <p>广告灯：
                        <WordImg v-if="ligths.advertisingLamp === true" :word="'开'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '2', boxNo: boxNo, lightName: '广告灯'})"/>
                        <WordImg v-else-if="ligths.advertisingLamp === null" :word="'未知'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '2', boxNo: boxNo, lightName: '广告灯'})"/>
                        <WordImg v-else :word="'关'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '2', boxNo: boxNo, lightName: '广告灯'})"/>
                      </p>
                      <p>背景灯：
                        <WordImg v-if="ligths.backgroundLight === true" :word="'开'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '3', boxNo: boxNo, lightName: '背景灯'})"/>
                        <WordImg v-else-if="ligths.backgroundLight === null" :word="'未知'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '3', boxNo: boxNo, lightName: '背景灯'})"/>
                        <WordImg v-else :word="'关'" :icon="9" @click="showLightInfo({boxId: boxId, lightNo: '3', boxNo: boxNo, lightName: '背景灯'})"/>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th>空调</th>
                    <td v-if="datas.ac">
                      <p>状态：
                        <WordImg v-if="datas.ac.power === false" :word="'关'" :icon="9" @click="showAirConditionerInfo({boxId: boxId, boxNo: boxNo})"/>
                        <WordImg v-else-if="datas.ac.power === true" :word="'开'" :icon="9" @click="showAirConditionerInfo({boxId: boxId, boxNo: boxNo})"/>
                        <WordImg v-else-if="datas.ac.power === null" :word="'未知'" :icon="9" @click="showAirConditionerInfo({boxId: boxId, boxNo: boxNo})"/>
                      </p>
                      <p>模式：
                        <span v-if="datas.ac">{{datas.ac.running_mode_formatted}}</span>
                      </p>
                      <p>温度：
                        <span v-if="datas.ac">{{datas.ac.current_temperature}}</span>
                      </p>
                      <p>风力：
                        <span v-if="datas.ac">
                          <i style="font-style: normal;" v-if="datas.ac.wind_speed === 0">未开</i>
                          <i style="font-style: normal;" v-if="datas.ac.wind_speed === 1">一级</i>
                          <i style="font-style: normal;" v-if="datas.ac.wind_speed === 2">二级</i>
                          <i style="font-style: normal;" v-if="datas.ac.wind_speed === 3">三级</i>
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </Card>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import WordImg from './WordImg';
import { openDoor } from './model';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DeviceStatus',
  components: {
    WordImg
  },
  props: {
    datas: {
      type: Object,
      default: () => {}
    },
    ligths: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async handleOffDoor () {
      const { success, msg } = await openDoor(this.boxId);
      if (success) {
        this.$success('开门成功！');
      } else {
        this.$error(msg);
      }
    }
  }
};
</script>

<style lang='less'>
.deviceStatus{
  width: 380px;
  display: inline-block;
  vertical-align: top;
  table{
    border-collapse: collapse;
    tr{
      td,th{
        border:1px solid #e8e8e8;
        padding: 6px 8px;
        word-break: break-all;
        padding: 10px 14px;
      }
    }
  }
}
</style>
