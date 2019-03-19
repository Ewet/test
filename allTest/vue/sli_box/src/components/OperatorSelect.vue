<template>
    <div class="coupon-select">
      <Form inline style="text-align:left">
        <FormItem>
            <Input type="text" v-model="filterObj.operatorName" placeholder="运营商名称">
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="loadData">查询</Button>
            <Button type="primary" @click="resetData">重置</Button>
        </FormItem>
        </form>
        </header>
        <ZTable
         :disabled-hover="true"
         :columns="mergeColumns"
         :items="items"
         :height="500"
         :mutiple="mutiple"
         :showPageBar="false"
         @on-selection-change="handleSelectChange"
         ></ZTable>
        <Button @click="handleConfirm" v-if="mutiple">确定</Button>
    </div>
</template>
<script>
import { getList } from 'views/system/OperatorManagement/model';

export default {
  props: {
    mutiple: {
      type: Boolean,
      default: false
    }
  },
  name: 'OperatorSelect',
  data () {
    return {
      column_value: '',
      filterObj: {
        operatorName: ''
      },
      columns: [{
        title: '新增时间',
        key: 'creatTime'
      },
      {
        title: '运营商名称',
        key: 'name'
      },
      {
        title: '运营商编号',
        key: 'operatorNo'
      },
      {
        title: '登陆账号',
        key: 'account'
      },
      {
        title: '盒子数量',
        key: 'boxNumber'
      },
      {
        title: '地址',
        key: 'address'
      },
      {
        title: '管理员',
        key: 'administrator'
      },
      {
        title: '联系电话',
        key: 'phone'
      }],
      items: [],
      actionColumn: {
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
      },
      selectedRows: []
    };
  },
  created () {
    this.$Bus.$on('refreshOperatorList', this.resetData);
  },
  mounted () {
    this.resetData();
  },
  beforeDestroy () {
    this.$Bus.$off('refreshOperatorList', this.resetData);
  },
  methods: {
    loadData () {
      getList({
        'pagination[page_size]': 1000,
        name: this.filterObj.operatorName
      }).then(({ success, data, msg }) => {
        if (success) {
          this.items = data.items;
        }
      });
    },
    resetData () {
      this.filterObj.operatorName = '';
      this.selectedRows = [];
      this.loadData();
    },
    handleSelectChange (selection) {
      this.selectedRows = selection;
    },
    handleConfirm () {
      this.$emit('on-cofirm', this.selectedRows);
    }
  },
  computed: {
    mergeColumns () {
      if (this.mutiple) {
        return [...this.columns];
      }
      return [...this.columns, this.actionColumn];
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
