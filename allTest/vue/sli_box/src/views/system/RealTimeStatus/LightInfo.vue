<template>
  <div class="LightSet">
    <Form ref="formValidate"  :label-width="80">
      <div style="margin:0 0 10px 0; display:flex;">
        <p  style="margin:0 20px 0 0; display:flex;">模式</p>
        <RadioGroup v-model="lightingState" @on-change="switchingMode">
              <Radio label="auto">自动</Radio>
              <Radio label="on">常开</Radio>
              <Radio label="off">常关</Radio>
        </RadioGroup>
      </div>
      <Table v-show="lightingState==='auto'" border :columns="columns" :data="dataTable"></Table>
    </Form>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'LightSet',
  data () {
    return {
      lightingState: '', // 运行模式
      dataTable: [// 自动模式开始结束时间
        { timeInterval: '' }
      ],
      columns: [
        {
          title: '时段',
          key: 'timeInterval'
        },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.setLightSetModal(true);
                }
              }
            }, '调整')
          ])
        }
      ]
    };
  },
  components: {
  },
  methods: {
    async  switchingMode () {
      const lightingState = this.lightingState;
      const timeInterval = this.dataTable[0].timeInterval;
      const timeIntervalArr = timeInterval.split('-');
      if (lightingState === 'auto') {
        if (timeIntervalArr[0] !== 'null' && timeIntervalArr[1] && timeIntervalArr[1] !== 'null') {
          const res = await this.saveLightingSetUp({
            box_id: this.boxId,
            light_no: this.lightNo,
            mode: lightingState,
            start_time: timeIntervalArr[0],
            end_time: timeIntervalArr[1]
          });
          if (res.success) {
            this.reload();
          }
        }
      } else {
        const res = await this.saveLightingSetUp({
          box_id: this.boxId,
          light_no: this.lightNo,
          mode: lightingState
        });
        if (res.success) {
          this.reload();
        }
      }
    }
  },
  watch: {
    timeInterval (val) {
      if (val && Object.keys(val).length > 0) {
        this.dataTable = [
          { timeInterval: val }
        ];
      } else {
        this.dataTable = [
          { timeInterval: '' }
        ];
      }
    },
    lightingStatus (val) {
      if (val && Object.keys(val).length > 0) {
        this.lightingState = val;
      } else {
        this.lightingState = '';
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .table{
    border: 1px solid #eee;
  }
</style>
