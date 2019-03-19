<template>
   <div class="channelDetail">
       <div class='content'>
          <Table border :columns="columns" :data='expansionBoardData'></Table>
       </div>
       <CloseBtn style='float:right;margin:40px 0 10px' @click="setViewChannelModal(false)"/>
   </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  name: 'ChannelDetail',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {

  },
  mounted () {
    // this.getExpansionBoardData();
  },
  methods: {
    addExpansionBoard () {
      this.setAddExpansionBoardModal(true);
    }
  },
  data () {
    return {
      data: [],
      columns: [
        {
          title: '扩展板编号',
          key: 'expansionBoardNo'
        },
        {
          title: '通道编号',
          key: 'channelsNo'
        },
        {
          title: '遮挡电平',
          key: 'occlusionLevel'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => h('div', {
            style: {
              position: 'relative'
            }
          },
          [
            h('i-switch', {
              props: {
                size: 'large',
                'true-value': 1,
                'false-value': 0,
                value: params.row.isReaded
              }
            },
            [
              h('span', {
                slot: 'open',
                domProps: {
                  innerHTML: '是'
                }
              }),
              h('span', {
                slot: 'close',
                domProps: {
                  innerHTML: '否'
                }
              })
            ]),
            h('div', {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '60px',
                height: '24px'
              },
              on: {
                click: () => {
                  // this.readChange(params.row);
                  console.log(456);
                }
              }
            })
          ])
        }
      ]
    };
  }
};
</script>

<style scoped lang='less'>
.channelDetail{
    clear: both;
    overflow: hidden;
}
</style>
