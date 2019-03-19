<template>
    <div style="min-height:420px">
      <ZTable
          :height="'500'"
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :pageSize="20"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />

    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import { switchAd } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'NewsList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'merchantName',
          minWidth: 150
        },
        {
          title: '盒子编码',
          key: 'boxNo',
          minWidth: 180
        },
        {
          title: '盒子地址',
          key: 'address',
          minWidth: 200
        },
        {
          title: '状态',
          key: 'statusBackstage',
          minWidth: 80
        },
        {
          title: '广告数量',
          key: 'adNumber',
          minWidth: 80
        },
        {
          title: '广告状态',
          key: 'adSwitch',
          minWidth: 100,
          render: (h, params) => {
            const boxId = params.row.id;
            const adSwitch = params.row.adSwitch;
            return h('div', [
              h('ZSwitch', {
                props: {
                  value: params.row.adSwitch,
                  'true-value': 1,
                  'false-value': 0,
                  fetch: () => {
                    if (adSwitch === 1) {
                      return switchAd({
                        box_id: boxId,
                        status: 0
                      });
                    } if (adSwitch === 0) {
                      return switchAd({
                        box_id: boxId,
                        status: 1
                      });
                    }
                    return {
                      success: false,
                      meg: '广告状态异常'
                    };
                  }
                },
                style: {
                  margin: '5px'
                },
                on: {
                  input: (val) => {
                    params.row.adSwitch = val;
                    if (val === 0) {
                      this.$success('关闭成功!');
                    } else if (val === 1) {
                      this.$success('开启成功!');
                    }
                  }
                }
              }, [
                h('span', {
                  slot: 'open'
                }, '开启'),
                h('span', {
                  slot: 'close'
                }, '关闭')
              ])
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            const boxId = params.row.id;
            return h('div', [
              h('ZBtn', {
                style: {
                  margin: '5px'
                },
                props: {
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.setBoxId(boxId);
                    this.getSelectedAdData({
                      box_id: boxId
                    });
                  }
                }
              }, '广告详情')
            ]);
          }
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>

<style lang="less">
</style>
