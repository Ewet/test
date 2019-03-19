<template>
    <div style="min-height:420px">
      <!-- <Table border :columns="columns" :data="items" ></Table> -->
      <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
      <BoxQrCode
        v-model="showBoxQrCode"
        :boxNo="boxNo"
        :qrCodeUrl="qrCodeUrl"
      />
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { delItem, getQRCode } from './model';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxManagementList',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '所属商户',
          key: 'merchantName'
        },
        {
          title: '盒子编号',
          key: 'boxNo'
        },
        {
          title: '盒子类型',
          key: 'boxTypeFormatted'
        },
        {
          title: '盒子地址',
          key: 'address'
        },
        {
          title: '验收日期',
          key: 'acceptanceDate'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => h('div', [
            h('EditBtn', {

              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.editItem(params.row.id);
                }
              }
            }, '编辑'),
            h('QRCodeBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.viewQRCode(params.row.id);
                }
              }
            }, '二维码'),
            h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.viewStructureManagement({ box_no: params.row.boxNo, box_id: params.row.id });
                }
              }
            }, '结构管理'),
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
      ],
      isloading: false,
      showBoxQrCode: false,
      boxNo: '',
      qrCodeUrl: ''
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    del (id) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        onOk: () => {
          delItem(id).then(({ success, msg }) => {
            if (success) {
              this.$success('删除成功!');
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          });
        }
      });
    },
    async viewQRCode (boxId) {
      const { success, data, msg } = await getQRCode(boxId);
      if (success) {
        this.showBoxQrCode = true;
        this.boxNo = data.boxNo;
        this.qrCodeUrl = data.url;
      } else {
        this.$error(msg);
      }
    }
  },
  components: {
  }
};
</script>
