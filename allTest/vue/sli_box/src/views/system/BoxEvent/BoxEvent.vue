<template>
  <div class='boxEvent'>
    <ModuleHeader title="盒子事件列表"></ModuleHeader>
    <Form />
    <Table border :columns="columns" :data="items" :loading = isLoading></Table>
    <div style="float: right;margin-top:10px">
        <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
    </div>
    <Modal
        width="26%"
        :value="viewModal"
        title="事件详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setViewModal(false)">
        <Edit/>
    </Modal>
    <Modal
        width="70%"
        :value="dataDetailModal"
        title="告警数据详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setDataDetailModal(false)">
        <div class="alterData" style="height: 550px;overflow-y: auto;">
          <pre>
            {{formData.dataDetail}}
          </pre>
        </div>
    </Modal>
  </div>
</template>
<script>
import Form from './Form';
import vuexMixins from 'mixins/module-map';
import Edit from './Edit';
import { determinationProcessing } from './model';
import { STORE_NAME } from './store';

export default {
  name: 'BoxEventIndex',
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Form,
    Edit
  },
  mounted () {
    this.pageChange(1);
  },
  data () {
    return {
      columns: [
        {
          title: '创建时间',
          key: 'createdTime'
        },
        {
          title: '盒子编号',
          key: 'boxNum'
        },
        {
          title: '告警类型',
          key: 'alarmType'
        },
        {
          title: '告警来源',
          key: 'alarmSource'
        },
        {
          title: '告警级别',
          key: 'alarmLevel'
        },
        {
          title: '告警代码',
          key: 'alarmCode'
        },
        {
          title: '处理状态',
          key: 'processingState'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(h('ZBtn', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.viewItem(params.row.alertId);
                }
              }
            }, '查看详情'));
            if (params.row.isHandled === '0') {
              action.push(h('ZBtn', {
                props: {
                  // type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p>您真的确定已经处理了吗?</p>',
                      onOk: async () => {
                        const { success, msg } = await determinationProcessing(params.row.alertId);
                        if (success) {
                          this.$success('处理成功！');
                        } else {
                          this.$error(`处理失败！${msg}`);
                        }
                        this.pageChange(this.page);
                      }
                    });
                  }
                }
              }, '确认处理'));
            }
            return h('div', action);
          }
        }
      ]
    };
  }
};
</script>
