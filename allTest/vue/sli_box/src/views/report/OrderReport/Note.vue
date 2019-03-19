<template>
  <Card class="order-note card-item">
    <span slot="title">备注</span>
    <Table border :columns="columns" :data="items" ></Table>
    <Form :model="formItem">
        <FormItem prop="markContent">
            <Input  v-model="formItem.markContent" type="textarea" :rows="3" placeholder="请输入备注内容" />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">提交</Button>
            <Button style="margin-left: 8px" @click="resetContent">重置</Button>
        </FormItem>
    </Form>
  </Card>
</template>
<script>
import { getNoteList, addNote } from 'views/market/Order/model';

export default {
  name: 'CustomerServiceNote',
  props: {
    orderId: {
      type: String,
      default: ''
    }
  },
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
          key: 'author',
          minWidth: 80
        },
        {
          title: '文本',
          key: 'content',
          minWidth: 80
        },
        {
          title: '时间',
          key: 'createTime',
          minWidth: 80
        }
      ],
      items: [],
      formItem: {

        markContent: ''
      }
    };
  },
  mounted () {
    if (this.orderId) {
      this.loadData();
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
      const { success, msg } = await addNote({
        order_id: this.orderId,
        note: this.formItem.markContent
      });
      if (success) {
        this.$success('提交成功');
        this.resetContent();
        this.loadData();
      } else {
        this.$error(msg);
      }
    },
    async loadData () {
      const { success, msg, data } = await getNoteList({
        'pagination[page_size]': 1000,
        order_id: this.orderId
      });
      if (success) {
        this.items = data.items;
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    orderId (val) {
      if (val) {
        this.loadData();
      }
    }
  }
};
</script>
<style lang="less">
.order-note{
  .ivu-form {
    margin-top: 10px;
    textarea.ivu-input{
      resize: none;
    }
  }
}
</style>
