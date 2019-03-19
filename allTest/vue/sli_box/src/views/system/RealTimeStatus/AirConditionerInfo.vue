<template>
  <div class="airConditionerSet">
    <Form ref="formValidate"  :label-width="80">
      <div style="margin:0 0 10px 0; display:flex;position: relative;">
        <p  style="margin:0 20px 0 0; display:flex;">模式</p>
        <RadioGroup v-model="airConditionerState" @on-change="updateSwitchingMode">
              <Radio label="auto">自动</Radio>
              <Radio label="on">常开</Radio>
              <Radio label="off">常关</Radio>
        </RadioGroup>
        <ZBtn
            v-show="airConditionerState==='auto'"
            @click="add"
            :size="'small'"
            style="position: absolute;right: 0;">
            新增状态
        </ZBtn>
      </div>

      <Table v-show="airConditionerState==='auto'" border :columns="columns" :data="airConditionerList"></Table>
    </Form>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delAirConditioner, airConditionerSwitchingMode, settingStatus } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'airConditionerSet',
  data () {
    return {
      airConditionerState: '', // 运行模式
      columns: [
        {
          title: '序号',
          type: 'index',
          minWidth: 40,
          align: 'center'
        },
        {
          title: '时段',
          key: 'timeInterval',
          minWidth: 120
        },
        {
          title: '模式',
          key: 'runningMode',
          minWidth: 70,
          render: (h, params) => {
            const runningMode = params.row.runningMode;
            return h('div', [
              h('span', {
              }, runningMode === 1 ? '送风' : runningMode === 2 ? '制冷' : '')
            ]);
          }
        },
        {
          title: '温度',
          key: 'temperature',
          minWidth: 70
        },
        {
          title: '风力',
          key: 'windSpeed',
          minWidth: 70
        },
        {
          title: '激活',
          key: 'activation',
          minWidth: 100,
          render: (h, params) => {
            const settingId = params.row.id;
            const activation = params.row.activation;
            return h('div', [
              h('ZSwitch', {
                props: {
                  value: params.row.activation,
                  'true-value': 1,
                  'false-value': 2,
                  fetch: () => {
                    if (activation === 2) {
                      return settingStatus({
                        activation: 1,
                        setting_id: settingId,
                        box_id: this.boxId
                      });
                    } if (activation === 1) {
                      return settingStatus({
                        activation: 2,
                        setting_id: settingId,
                        box_id: this.boxId
                      });
                    }
                  }
                },
                style: {
                  margin: '5px'
                },
                on: {
                  input: (val) => {
                    params.row.activation = val;
                    if (val === 2) {
                      this.$success('已关闭激活!');
                    } else if (val === 1) {
                      this.$success('已开启激活!');
                    }
                  }
                }
              }, [
                h('span', {
                  slot: 'open'
                }, '已激活'),
                h('span', {
                  slot: 'close'
                }, '未激活')
              ])
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 120,
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
                  this.getAirConditionerSetting(params.row.id);
                }
              }
            }, '调整'),
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.id);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  components: {
  },
  methods: {
    async updateSwitchingMode () {
      const airConditionerState = this.airConditionerState;
      const { success } = await airConditionerSwitchingMode({
        mode: airConditionerState,
        box_id: this.boxId
      });
      if (success) {
        this.reload();
      }
    },
    // 新增
    add () {
      this.setAirConditionerSetModal(true);
    },
    // 删除
    del (id) {
      this.$m_confirm({
        title: '确定删除当前记录吗？',
        onOk: () => {
          delAirConditioner({
            setting_id: id,
            box_id: this.boxId
          }).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              const boxId = this.boxId;
              const boxNo = this.boxNo;
              this.showAirConditionerInfo({
                boxId,
                boxNo
              });
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    }
  },
  watch: {
    airConditionerStatus (val) {
      if (val && Object.keys(val).length > 0) {
        this.airConditionerState = val;
      } else {
        this.airConditionerState = '';
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
