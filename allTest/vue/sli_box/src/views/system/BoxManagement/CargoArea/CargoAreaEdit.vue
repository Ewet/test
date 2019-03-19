<template>
<div style="position:relative">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="货区编号" prop="cargoAreaNo">
            <Input :maxlength="10" v-model="formValidate.cargoAreaNo" placeholder="请输入货区编号"></Input>
        </FormItem>
  <!-- </Form> -->
  <Collapse v-model="value" accordion v-for="(item,index) in masterControro" :key="index">
        <Panel name="1" >
          主控板{{item.ipAddress}}
          <div slot="content" class="zkb">
            <div class="cjb clearfix"  v-for="(cjbNum, cjbIndex) in item.cjbData" :key="cjbIndex">
              <div class="cjbNo">采集板号{{cjbNum.acquisitionNo}}</div>
              <div class="cjbData" >
                <table border=1 cellspacing="0">
                  <tr>
                    <th style="width:100px;">接收板号</th>
                    <th>通道号</th>
                  </tr>
                  <tr v-for="(jsbNum,jsbIndex) in cjbNum.jsbData" :key="jsbIndex">
                    <td>
                      <Checkbox :label="jsbNum.extensionNo" v-model="jsbNum.isSelectMultiple" @on-change="(val) => selectMultiple(cjbNum,jsbNum,val)">
                            <span>{{jsbNum.extensionNo}}</span>
                      </Checkbox>
                    </td>
                    <td>
                      <div class="channelNo">
                        <span v-for="(channelNum,channelNOIndex) in jsbNum.channelData" :key="channelNOIndex">
                          <span>{{channelNum.channelNo}}</span>
                          <Select
                            v-model="channelNum.sensorType"
                            size="small"
                            clearable
                            :disabled="channelNum.isDisable===1"
                            @on-open-change="(val) => selectChannel(channelNum,val)"
                            @on-clear="clearChannel(channelNum)"
                            style="width: 75px;margin-right:20px;"
                            placeholder="请选择"
                          >
                                <Option v-for="item in sensorList" :value="item.value" :key="item.value">{{item.label}}</Option>
                          </Select>

                        </span>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </Panel>
    </Collapse>
        <FormItem>
          <SaveBtn style="float:right; margin:10px;" v-if="layerId" @click="save()" :disabled="disable" />
          <AddBtn style="float:right; margin:10px;" v-else @click="add()" :disabled="disable" />
        </FormItem>
    </Form>
    <Spin fix v-if="spinShow">
      <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
      <div style="font-size:24px;">加载中</div>
    </Spin>
</div>
</template>
<script>
import {
  getEditInfo, getAddInfo, updateItem, addItem
} from './model';
import vuexMixins from 'mixins/module-map';
import { debounce } from 'lodash';
import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CargoAreaEdit',
  data () {
    return {
      disable: false,
      spinShow: false,
      value: '1',
      formValidate: {
        cargoAreaNo: ''
      },
      ruleValidate: {
        cargoAreaNo: [
          {
            required: true,
            message: '货区编号不能为空',
            trigger: 'blur',
            transform (value) {
              return value.toString().trim();
            }
          }
        ]
      },
      sensorList: [
        {
          value: '0',
          label: '货位'
        },
        {
          value: '1',
          label: '人感'
        },
        {
          value: '2',
          label: '介绍'
        }
      ],
      // cjbData: [],
      masterControro: [],
      channelNo: [] // 已选中（提交时使用）
    };
  },
  mounted () {
    // this.loadData();
  },
  created () {
    this.add = debounce(this.add, 500);
    this.save = debounce(this.save, 500);
  },
  methods: {
    // 选中单个通道
    selectChannel (channel, val) {
      // 下拉框收起&&下拉框选中值不为空时触发
      if (!val && channel.sensorType) {
        channel.isUsed = 1;
      }
    },
    // 取消单个通道
    clearChannel (channel) {
      channel.isUsed = 0;
      channel.sensorType = null;
    },
    // 根据接收板号选择/取消多个通道
    selectMultiple (no1, no2, val) {
      if (val) { // 选中多个
        no2.channelData.forEach((x, index, data) => {
          if (index < 6 && !x.isUsed) {
            x.sensorType = '0';
            x.isUsed = 1;
          }
        });
      } else { // 取消多个
        no2.channelData.forEach((x, index, data) => {
          if (index < 6 && !x.isDisable) {
            x.sensorType = null;
            x.isUsed = 0;
          }
        });
      }
    },
    // 新增
    add () {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          this.disable = true;
          this.getChecked();
          // if (this.channelNo.length > 0) {
          const { success, msg } = await addItem({
            box_id: this.boxId,
            channel: JSON.stringify(this.channelNo),
            layer_no: this.formValidate.cargoAreaNo
          });
          if (success) {
            this.$success('新增成功!');
            this.setCargoAreaEditModal(false);// 关闭弹窗
            this.setLayerId('');// 将layerId设为''
          } else {
            this.$error(msg);
            this.disable = false;
          }
          this.channelNo = [];
          // } else {
          //   this.$error('请选择通道');
          // }
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    // 修改
    save () {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          this.disable = true;
          this.getChecked();
          // console.log(this.channelNo.length);
          // if (this.channelNo.length > 0) {
          const { success, msg } = await updateItem({
            layer_id: this.layerId,
            channel: JSON.stringify(this.channelNo),
            layer_no: this.formValidate.cargoAreaNo
          });
          if (success) {
            this.$success('保存成功!');
            this.setCargoAreaEditModal(false);
            this.setLayerId('');
          } else {
            this.$error(msg);
            this.disable = false;
          }
          this.channelNo = [];
          // } else {
          //   this.$error('请选择通道');
          // }
        } else {
          // this.$error('表单验证不正确');
        }
      });
    },
    clearData () { // 此方法用于清空页面数据
      this.formValidate.cargoAreaNo = '';
      this.masterControro = [];
      this.channelNo = [];
    },
    getChecked () { // 此方法用于提交时获取已选中的通道
      this.masterControro.forEach((z) => {
        z.cjbData.forEach((x) => {
          x.jsbData.forEach((h) => {
            h.channelData.forEach((y) => {
              if (y.isUsed && !y.isDisable) {
                this.channelNo.push({ channel_id: y.channelId, sensor_type: y.sensorType });
              }
            });
          });
        });
      });
    },
    async loadData () {
      this.spinShow = true;
      if (this.layerId) {
        // console.log(this.layerId);
        const { success, data, msg } = await getEditInfo(this.layerId);
        // console.log(data);
        if (success) {
          this.formValidate.cargoAreaNo = data.layerNo;
          // this.ipAddress = data[0].ipAddress;
          // this.cjbData = data[0].cjbData;
          this.masterControro = data.masterControro;
        } else if (msg) {
          this.$error(msg);
        }
        this.spinShow = false;
      } else {
        const { success, data, msg } = await getAddInfo(this.boxId);
        // console.log(data);
        if (success) {
          // this.ipAddress = data[0].ipAddress;
          // this.cjbData = data[0].cjbData;
          this.masterControro = data.masterControro;
        } else if (msg) {
          this.$error(msg);
        }
        this.spinShow = false;
      }
    },
    handleReset () { // 重置表单验证
      this.$refs.formValidate.resetFields();
    }
  },
  watch: {
    showCargoAreaEditModal (val) {
      if (val) {
        this.handleReset();
        this.clearData();
        this.loadData();
        this.disable = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.zkb{
  height:500px;
  overflow:auto;
  .cjb{
    display: flex;
    justify-content: center;
    .cjbNo{
      width: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cjbData{
      width: 90%;
      float: right;
      table{
        width: 100%;
        th,td{
          padding:5px 10px;
        }
      }
    }
  }
  .cjb+.cjb{
    margin-top: 10px;
  }
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
}

</style>
