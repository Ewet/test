<template>
    <div class="coupon-select">
      <Form inline style="text-align:left">
      <!-- <FormItem>
            <Button type="primary" @click="refresh">刷新</Button>
        </FormItem> -->
        <FormItem>
            <Input type="text" v-model="filterObj.goodsName" placeholder="商品名称">
            </Input>
        </FormItem>
        <FormItem>
            <Select clearable v-model="filterObj.gcateId" placeholder="商品分类" style="width: 100px">
                <Option
                v-for="(item,index) in categoryOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem>
          <Input type="text" v-model="filterObj.BomNo" placeholder="请输入商品Bom码"></Input>
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
import { getList } from 'views/market/Goods/model';
import { getCategoryOptions } from 'views/market/GoodsCategory/model';

export default {
  props: {
    mutiple: {
      type: Boolean,
      default: false
    }
  },
  name: 'GoodsSelect',
  data () {
    return {
      column_value: '',
      filterObj: {
        goodsName: '',
        gcateId: '',
        BomNo: ''
      },
      categoryOptions: [
        // {
        //   gcateId: 1,
        //   goodsCategory: '酒类'
        // },
        // {
        //   gcateId: 1,
        //   goodsCategory: '葡萄酒'
        // }
      ],
      columns: [{
        title: '商品名称',
        key: 'goodsName'
      },
      {
        title: '商品售价',
        key: 'price'
      },
      {
        title: '商品Bom码',
        key: 'barcode'
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
    this.$Bus.$on('refreshGoodsList', this.resetData);
  },
  mounted () {
    this.resetData();
    this.loadcategoryOptions();
  },
  beforeDestroy () {
    this.$Bus.$off('refreshGoodsList', this.resetData);
  },
  methods: {
    loadData () {
      getList({
        'pagination[page_size]': 1000,
        goods_name: this.filterObj.goodsName,
        gcate_id: this.filterObj.gcateId,
        barcode: this.filterObj.BomNo
      }).then(({ success, data, msg }) => {
        if (success) {
          this.items = data.items;
        }
      });
    },
    loadcategoryOptions () {
      getCategoryOptions().then((result) => {
        if (result.success) {
          this.categoryOptions = result.data;
        }
      });
    },
    resetData () {
      this.filterObj.goodsName = '';
      this.filterObj.gcateId = '';
      this.filterObj.BomNo = '';
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
