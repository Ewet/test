<template>
  <div class='replenishment'  >
    <ModuleHeader title="盒子补货记录列表">
    </ModuleHeader>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleRefresh"/>
      <FormItem label="盒子编号">
        <Input type="text" v-model="filterObj.boxNum" placeholder="请输入盒子编号"></Input>
      </FormItem>
      <FormItem label="所属商户">
          <Input type="text" v-model="filterObj.merchantName" placeholder="请输入商户名称">
          </Input>
      </FormItem>
      <FormItem>
        <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
      </FormItem>
    </Form>
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
    />
    <Modal
        width="90%"
        :value="viewModal"
        title="补货详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setViewModal(false)"
        class-name="vertical-center-modal">
        <Edit/>
    </Modal>
    <Modal
        width="50%"
        :value="remarkModal"
        title="备注信息"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setRemarkModal(false)"
        class-name="vertical-center-modal">
        <Remark/>
    </Modal>
    <Modal
        :value="bigImgModal"
        title="大图"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setBigImgModal(false)">
        <img  :src="bigImg" alt="" style="width:100%;height:auto;">
    </Modal>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Edit from './Edit';
import Remark from './Remark';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Replenishment',
  data () {
    return {
      filterObj: {
        merchantName: '',
        boxNum: ''
      },
      columns: [
        {
          title: 'ID',
          key: 'replenishment_id'
        },
        {
          title: '商户名称',
          key: 'merchantName'
        },
        {
          title: '盒子编号',
          key: 'boxNum'
        },
        {
          title: '补货时间',
          key: 'replenishmentTime'
        },
        {
          title: '补货员姓名',
          key: 'replenishmentName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(h('ViewDetailsBtn', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.viewItem(params.row.replenishment_id);
                }
              }
            }, '查看详情'));
            return h('div', action);
          }
        }
      ]
    };
  },
  components: {
    Edit,
    Remark
  },
  methods: {
    // 刷新
    handleRefresh () {
      this.reload();
    },
    handleSubmit () {
      this.filterData({
        name: this.filterObj.merchantName,
        box_no: this.filterObj.boxNum
      });
    },
    handleReset () {
      this.filterObj = {
        merchantName: '',
        boxNum: ''
      };
      this.clearFilter();
    }
  },
  mounted () {
    this.pageChange(1);
  }
};
</script>
<style scoped>

</style>
