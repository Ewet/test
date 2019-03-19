<template>
    <div class="customer-service-note">
        <Card :bordered="false">
            <span slot="title">客服备注</span>
            <!-- <Table border :columns="columns" :data="customerItems" ></Table> -->
            <ZTable
              :columns="columns"
              :items="customerItems"
              :loading="isLoading"
              :page="page"
              :total="total"
              :showPageBar="false"
              :pageChange="pageChange.bind(this)"
            />
            <Form :model="formItem">
                <FormItem prop="markContent">
                    <Input
                    v-model="formItem.markContent"
                    type="textarea"
                    :rows="6"
                    placeholder="请输入备注内容"
                    :maxlength="255"/>
                </FormItem>
                <FormItem>
                    <ZBtn @click="handleSubmit">提交</ZBtn>
                    <ZBtn style="margin-left: 8px" @click="resetContent">重置</ZBtn>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { addRemark, getRemarkList } from 'views/system/Monitor/model';

import { STORE_NAME } from '../store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'CustomerServiceNote',
  data () {
    return {
      containerHeight: 0,
      columns: [
        {
          title: '序号',
          key: 'num',
          minWidth: 80,
          render: (h, params) => h('span', params.index + 1)
        },
        {
          title: '操作员',
          key: 'operator',
          minWidth: 80
        },
        {
          title: '文本',
          key: 'content',
          minWidth: 80
        },
        {
          title: '时间',
          key: 'time',
          minWidth: 80
        }
      ],
      customerItems: [],
      formItem: {

        markContent: ''
      }
    };
  },
  watch: {
    'formData.customerServiceNote': function (val) {
      this.customerItems = val || [];
    }
  },
  methods: {
    resetContent () {
      this.formItem.markContent = '';
    },
    async handleSubmit () {
      const txt = this.formItem.markContent.trim();
      if (!txt) {
        this.$error('备注信息不能为空!');
        return false;
      }
      const { success, msg } = await addRemark({
        event_id: this.itemId,
        remark: this.formItem.markContent
      });
      console.log(success, msg);
      if (success) {
        this.$success('提交成功');
        this.resetContent();
        getRemarkList({
          event_id: this.itemId
        }).then(({ success, data, msg }) => {
          if (success) {
            this.customerItems = data;
          } else {
            this.$error(msg);
          }
        });
      } else {
        this.$error(msg);
      }
    }
  }
};
</script>
<style lang="less" scope>
.customer-service-note {
  background-color: #fff;
    .ivu-card-head span {
      font-weight: bold;
    }
    .ivu-form {
        margin-top: 10px;
    }
}

</style>
