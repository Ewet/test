<template>
    <div class="tableBox" style="min-height:420px">
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { startMaintain, endMaintain } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      btnState: true,
      containerHeight: 0,
      columns: [
        {
          title: '盒子编号',
          key: 'boxNo',
          minWidth: 150
        },
        {
          title: '终端状态',
          key: 'boxStatusFormat',
          minWidth: 80
        },
        {
          title: '故障状态',
          key: 'hasFaultFormat',
          minWidth: 80
        },
        {
          title: '维护',
          key: 'inMaintenance',
          minWidth: 140,
          render: (h, params) => {
            const boxId = params.row.id;
            const inMaintenance = params.row.inMaintenance;
            return h('div', [
              h('ZSwitch', {
                props: {
                  value: params.row.inMaintenance,
                  'true-value': 1,
                  'false-value': 0,
                  fetch: () => {
                    if (inMaintenance === 0) {
                      return startMaintain(boxId);
                    } if (inMaintenance === 1) {
                      return endMaintain(boxId);
                    }
                  }
                },
                style: {
                  margin: '5px'
                },
                on: {
                  input: (val) => {
                    params.row.inMaintenance = val;
                    if (val === 0) {
                      this.$success('已关闭维护!');
                    } else if (val === 1) {
                      this.$success('已开启维护!');
                    }
                  }
                }
              }, [
                h('span', {
                  slot: 'open'
                }, '维护中'),
                h('span', {
                  slot: 'close'
                }, '关闭维护')
              ])
            ]);
          }
        },
        {
          title: '灯光',
          key: 'lightsArr',
          minWidth: 395,
          render: (h, params) => {
            const lightsArr = params.row.lightsArr;
            const floodlight = this.getLightJson(lightsArr, 1);
            console.log(floodlight);
            const advertising = this.getLightJson(lightsArr, 2);
            const background = this.getLightJson(lightsArr, 3);
            return h('div', [
              h('SetBtn', {
                props: {
                  type: 'lighting',
                  floodlightState: floodlight && floodlight.light_mode_fromat ? floodlight.light_mode_fromat : '未设置',
                  advertisingState: advertising && advertising.light_mode_fromat ? advertising.light_mode_fromat : '未设置',
                  backgroundState: background && background.light_mode_fromat ? background.light_mode_fromat : '未设置'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  floodlightClick: () => {
                    const boxId = params.row.id;
                    const boxNo = params.row.boxNo;
                    this.showLightInfo({
                      boxId, lightNo: '1', boxNo, lightName: '照明灯'
                    });
                  },
                  advertisingClick: () => {
                    const boxId = params.row.id;
                    const boxNo = params.row.boxNo;
                    this.showLightInfo({
                      boxId, lightNo: '2', boxNo, lightName: '广告灯'
                    });
                  },
                  backgroundClick: () => {
                    const boxId = params.row.id;
                    const boxNo = params.row.boxNo;
                    this.showLightInfo({
                      boxId, lightNo: '3', boxNo, lightName: '背景灯'
                    });
                  }
                }
              })
            ]);
          }
        },
        {
          title: '空调',
          key: 'conditionerModeFromat',
          minWidth: 100,
          render: (h, params) => {
            const state = params.row.conditionerModeFromat;
            return h('div', [
              h('SetBtn', {
                props: {
                  type: 'airConditioner',
                  airConditionerState: state || '未设置'
                },
                style: {
                  margin: '5px'
                },
                on: {
                  airConditionerClick: () => {
                    const boxId = params.row.id;
                    const boxNo = params.row.boxNo;
                    this.showAirConditionerInfo({ boxId, boxNo });
                  }
                }
              })
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 240,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: params.row.boxStatus !== 2
              },
              style: {
                margin: '5px',
                color: params.row.boxStatus !== 2 ? '#fff' : '',
                backgroundColor: params.row.boxStatus !== 2 ? 'rgba(0, 0, 0, 0.25)' : ''
              },
              on: {
                click: () => {
                  const boxId = params.row.id;
                  const boxNo = params.row.boxNo;
                  this.boxStatusAction(boxId);
                  this.setBoxNo(boxNo);
                  this.setBoxType(params.row.type || 1);
                }
              }
            }, '盒子状态'),
            // h('Button', {
            //   props: {
            //     type: 'primary',
            //     size: 'small'
            //   },
            //   style: {
            //     margin: '5px'
            //   },
            //   on: {
            //     click: () => {
            //       let boxId = params.row.id;
            //       let boxNo = params.row.boxNo;
            //       this.boxStatusAction(boxId);
            //       this.setBoxNo(boxNo);
            //     }
            //   }
            // }, '酒柜状态'),
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
                  this.viewTerminalSetting(params.row);
                }
              }
            }, '终端设置')
          ])
        }],
      isloading: true
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    getLightJson (arr, No) {
      const res = arr.filter((el) => {
        const lightNo = el.light_no;
        if (lightNo === No) {
          return el;
        }
      });
      return res[0] ? res[0] : null;
    },

    handleClick () {
      const btnState = this.btnState;
      if (btnState) {
        this.btnState = false;
      } else {
        this.btnState = true;
      }
    }
  },
  watch: {
  }
};
</script>

<style lang="less">
  .tableBox{
    .red{
      color:#FF0000;
    }
    .green{
      color:#008000;
    }
  }
</style>
