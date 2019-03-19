<template>
    <div class="coupon-select">
      <Form inline style="text-align:left">
        <FormItem>
            <Input type="text" v-model="filterObj.merchantName" placeholder="商户名称">
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="loadData">查询</Button>
            <Button type="primary" @click="resetData">重置</Button>
        </FormItem>
      </form>
      <Table :disabled-hover="true" :columns="columns" :data="items" :height="400"></Table>
    </div>
</template>
<script>
import { getList } from 'views/system/MerchantManagement/model';

export default {
  name: 'MerchantSelect',
  data () {
    return {
      filterObj: {
        merchantName: ''
      },
      columns: [
        {
          title: '商户名称',
          key: 'merchantName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  this.$emit('itemSelect', params.row);
                }
              }
            }, '选择')
          ])
        }
      ],
      items: []
    };
  },
  created () {
    this.$Bus.$on('refreshMerchantList', this.resetData);
  },
  mounted () {
    this.resetData();
  },
  beforeDestroy () {
    this.$Bus.$off('refreshMerchantList', this.resetData);
  },
  methods: {
    loadData () {
      getList({
        'pagination[page_size]': 1000,
        name: this.filterObj.merchantName
      }).then(({ success, data, msg }) => {
        if (success) {
          this.items = data.items;
        }
      });
    },
    resetData () {
      this.filterObj.merchantName = '';
      this.loadData();
    }
  }
};
</script>
<style lang="less" scoped>
.coupon-select {
    .searhbar {
        margin: 10px 0;
        display: flex;
        .ivu-btn{
          margin-left: 10px;
        }
    }
}

</style>
