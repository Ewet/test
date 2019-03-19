<template>
<div>
  <ModuleHeader title="地区管理列表">
    <ZBtn slot="right" @click="addItem">添加</ZBtn>
  </ModuleHeader>
  <Form inline class="toolBarForm">
            <RefreshBtn @click="handleRefresh"/>
    <FormItem label='地区名称'>
        <Input type="text" v-model="filterObj.district_name" placeholder="地区名称">
        </Input>
    </FormItem>
    <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="reset"/>
    </FormItem>
  </Form>
  <!-- <Table border :columns="columns" :data="items" :loading = isLoading ></Table> -->
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
        />
  <Modal
        :value="showModal"
        :title="Object.keys(formData).length === 0 ? '新增' : '编辑'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setModal(false)">
        <Edit/>
  </Modal>
  <!-- <div style="float: right;margin-top:10px">
          <Page :current="page" :total="total" :show-total="true" @on-change="num => pageChange(num)" ></Page>
  </div> -->
</div>
</template>
<script>
import { delItem } from './model';
import Edit from './Edit';
import vuexMixins from 'mixins/module-map';

import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  components: {
    Edit
  },
  name: 'Area',
  data () {
    return {
      filterObj: {
        district_name: ''
      },

      columns: [{
        title: 'ID',
        key: 'districtId'
      },
      {
        title: '名称',
        key: 'districtName'
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
          const action = [];
          action.push(h('EditBtn', {

            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.editItem(params.row.districtId);
              }
            }
          }, '编辑'));
          action.push(h('DelBtn', {
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.del(params.row.districtId);
              }
            }
          }, '删除'));
          return h('div', action);
        }
      }
      ]
    };
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    handleSubmit () {
      this.filterData(Object.assign({ ...this.filterObj }));
    },
    handleRefresh () {
      this.reload();
    },
    reset () {
      this.filterObj = {
        district_name: ''
      };
      this.clearFilter();
    },
    del (districtId) {
      this.$Modal.confirm({
        title: '确定删除当前记录吗？',
        content: '',
        onOk: () => {
          delItem(districtId).then(({ success, msg }) => {
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
    }
  }

};
</script>
