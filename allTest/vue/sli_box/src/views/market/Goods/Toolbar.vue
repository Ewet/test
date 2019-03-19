
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label="商品名称">
            <Input type="text" v-model="filterObj.goodsName" placeholder="商品名称">
            </Input>
        </FormItem>
        <FormItem label="商品分类">
            <Select :clearable="true" v-model="filterObj.gcateId" placeholder="商品分类" >
                <Option
                v-for="(item,index) in categoryOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem label="商品BOM码">
            <Input type="text"   v-model="filterObj.barcode" placeholder="商品BOM码">
            </Input>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getCategoryOptions } from 'views/market/GoodsCategory/model';
// import fecha from 'fecha';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'goodsToolbar',
  data () {
    return {
      filterObj: {
        goodsName: '',
        gcateId: '',
        barcode: ''
      },
      categoryOptions: []
    };
  },
  methods: {
    handleSubmit () {
      this.filterData(Object.assign({
        goods_name: this.filterObj.goodsName,
        gcate_id: this.filterObj.gcateId,
        barcode: this.filterObj.barcode
      }));
    },
    handleReset () {
      this.filterObj = {
        goodsName: '',
        gcateId: '',
        barcode: ''
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    },
    loadcategoryOptions () {
      getCategoryOptions().then((result) => {
        if (result.success) {
          this.categoryOptions = result.data;
        }
      });
    }
  },
  mounted () {
    this.loadcategoryOptions();
  }
};
</script>
