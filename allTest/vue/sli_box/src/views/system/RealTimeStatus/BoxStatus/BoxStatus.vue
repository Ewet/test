<template>
  <div class="boxStatus">
    <h3>({{boxNo}})实时货位状态</h3>
    <div class="content">
      <div style="float:right">
         <Card style="margin-bottom: 10px;">
            <p slot="title">
                强制库存校对
            </p>
            <div>
               <Checkbox
                :true-value="1"
                :false-value="0"
                v-model="closeMaintenance">同时关闭维护</Checkbox>
              <ZBtn
                @click="handleProof"
                type="error"
                size="small"
                style="margin-left:10px">确认校对</ZBtn>
              <p style="margin-top:5px;color:red;">请确认实际库存无误后再操作</p>
            </div>
         </Card>
          <DeviceStatus :datas='DeviceStatusData' :ligths="ligths"/>
      </div>
      <div v-if="boxType === 1" class="left">
        <Spin class="spins" fix v-if="spin">
            <Icon type="ios-loading" size=48 class="demo-spin-icon-load"></Icon>
            <div style="font-size: 18px;margin-top: 6px;">加载中...</div>
        </Spin>
        <div v-else>
          <ul v-for="(rowItem, index) in rowList" :key="index">
            <li  class="rowList" v-for="(itemTable,index) in rowItem.items" :key="index"> <!--in tableData-->
              <BoxStatusTable :data="itemTable" :maxCount="rowItem.maxCount"/>
            </li>
          </ul>
        </div>
      </div>
      <ul class="wineCabinetTable" v-else>
        <Spin class="spins" fix v-if="spin">
            <Icon type="ios-loading" size=48 class="demo-spin-icon-load"></Icon>
            <div style="font-size: 18px;margin-top: 6px;">加载中...</div>
        </Spin>
        <li class="wineCabinetTableList" v-for="(itemTable,index) in tableData" :key="index">
          <WineCabinetTable :res="itemTable"/>
        </li>
      </ul>
    </div>
    <Footer/>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import DeviceStatus from './DeviceStatus';
import Footer from './Footer';
import WineCabinetTable from './WineCabinetTable';
import BoxStatusTable from './BoxStatusTable';
import getBoxStatus from 'websocket/realTimeStatus';
import { STORE_NAME } from '../store';
import { correct } from './model';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxStatus',
  components: {
    DeviceStatus,
    Footer,
    BoxStatusTable,
    WineCabinetTable
  },
  created () {
    this.$g_on('closeRealTimeWS', this.closeRealTimeWS);
  },
  beforeDestroy () {
    this.$g_off('closeRealTimeWS', this.closeRealTimeWS);
  },
  data () {
    return {
      tableData: [],
      rowList: [],
      DeviceStatusData: {},
      ligths: {},
      spin: false,
      wsInstance: null,
      closeMaintenance: 1
    };
  },
  methods: {
    setData ({ success, data }) {
      if (success) {
        this.DeviceStatusData = data;
        const lg = data.lights;
        if (lg.length === 0) {
          const ligth = {
            floodlight: null,
            advertisingLamp: null,
            backgroundLight: null
          };
          this.ligths = ligth;
        } else {
          const ligth = {
            floodlight: lg[0].power,
            advertisingLamp: lg[1].power,
            backgroundLight: lg[2].power
          };
          this.ligths = ligth;
        }
        if (data.cells === null) {
          this.spin = true;
        } else {
          // 盒子状态
          this.spin = false;
          if (this.boxType === 1) {
            let maxlist = [];
            for (let i = 0; i < data.cells.length; i++) {
              maxlist.push(data.cells[i].floor.length);
            }
            let groupList = [];
            const SLICELENGTH = 3;
            for (let i = 0; i < maxlist.length; i = i + SLICELENGTH) {
              let as = maxlist.slice(i, i + SLICELENGTH);
              let itemList = data.cells.slice(i, i + SLICELENGTH);
              let maxV = Math.max(...as);
              groupList.push({
                maxCount: maxV,
                items: itemList
              });
            }
            this.rowList = groupList;
          } else {
            this.tableData = data.cells;
          }
        }
      }
    },
    // loadData () {
    //   let data = require('./data.json');
    //   this.setData(data);
    // },
    loadData (boxId) {
      this.wsInstance = getBoxStatus({
        box_id: this.boxId
      }, {
        onMessage: (res) => {
          if (res.data) {
            const result = JSON.parse(res.data);
            if (result.data.box_id !== this.boxId) {

            } else {
              this.setData(result);
            }
          }
        }
      });
    },
    closeRealTimeWS () {
      this.wsInstance.close();
      this.tableData = [];
      this.DeviceStatusData = {};
      this.ligths = {};
      this.spin = false;
    },
    async handleProof () {
      const { success, msg } = await correct({
        box_id: this.boxId,
        stop_maintenance: this.closeMaintenance
      });
      if (success) {
        this.$success('校对完毕');
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    showBoxStatusModal (newVal, oldVal) {
      if (newVal) {
        this.loadData();
      }
    }
  }
};
</script>
<style lang="less">
.boxStatus{
  li{
    list-style: none;
  }
  overflow-x: auto;
  p{margin: 0;}
  h3{
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 8px;
    color: #000;
  }
  .left{
    margin-right: 400px;
    font-size: 0;
    position: relative;
    min-height: 600px;
    padding-left: 2px;
    .rowList{
      width: 32%;
      display: inline-block;
      margin-right:1.2%;
    }
  }
  .left:after{
    content: '\3000';
    vertical-align: middle;
    height: 100%;
    display: inline-block;
  }
  .wineCabinetTable{
    height: 576px;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content:flex-start;
    .wineCabinetTableList{
      width: 48%;
      margin-left: 1%;
    }
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
      position: relative;
      border: 1px solid #eee;
  }
  .spins{
    position: absolute;
    font-size: .2rem;
  }
}
</style>
