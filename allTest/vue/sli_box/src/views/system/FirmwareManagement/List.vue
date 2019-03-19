<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" :loading = isLoading></Table>
      <div style="float: right;margin-top:10px">
        <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
      </div> -->
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
import { delItem, getRemarks } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'FirmwareManagementList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '上传时间',
          key: 'uploadTime'
        },
        {
          title: '固件类型',
          key: 'firmwareType',
          render: (h, params) => {
            const type = params.row.firmwareType;
            let firmwareTypeFormatted = '';
            switch (type) {
              case 'clientMain':
                firmwareTypeFormatted = '客户端主程序';
                break;
              case 'clientMonitor':
                firmwareTypeFormatted = '客户端监控程序';
                break;
              case 'clientAdv':
                firmwareTypeFormatted = '客户端广告程序';
                break;
              case 'clentDaemon':
                firmwareTypeFormatted = '客户端守护程序';
                break;
              case 'hardware':
                firmwareTypeFormatted = 'clentDaemon';
                break;
              default:
                break;
            }
            return h('div', {}, firmwareTypeFormatted);
          }
        },
        {
          title: '固件名称',
          key: 'firmwareName'
        },
        {
          title: '固件大小',
          key: 'firmwareSize'
        },
        {
          title: '版本号',
          key: 'versionNum'
        },
        {
          title: '适配盒子',
          key: 'fitBox'
        },
        {
          title: '上传者',
          key: 'uploadsName'
        },
        {
          title: '上传结果',
          key: 'uploadsResult'
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: async () => {
                  const {
                    success,
                    msg,
                    data
                  } = await getRemarks(params.row.firmwareId);
                  if (success) {
                    this.editFirmwareAction({ id: params.row.firmwareId, detailData: data });
                  } else {
                    this.$error(`获取备注失败！${msg}`);
                  }
                }
              }
            }, '编辑'),
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.del(params.row.firmwareId);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    del (id) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        onOk: async () => {
          const { success, msg } = await delItem(id);
          if (success) {
            this.$success('删除成功！');
          } else {
            this.$error(`删除失败！${msg}`);
          }
          this.pageChange(this.page);
        }
      });
    }
  }
};
</script>
