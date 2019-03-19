
<template>
    <Form inline class="toolBarForm">
      <RefreshBtn @click="handleRefresh"/>
        <FormItem label='盒子编号'>
            <span @click="boxNoClick($event)">
              <Input @on-click.stop  placeholder="盒子编号" readonly clearable v-model="filterObj.boxNo"></Input>
            </span>
        </FormItem>
        <FormItem label='商品名称'>
            <span @click="goodsNameClick($event)">
              <Input @on-click.stop  placeholder="商品名称" readonly clearable v-model="filterObj.goodsName"></Input>
            </span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
            <Button type="primary" @click="handleExport" v-if="items.length">导出</Button>
        </FormItem>
        <Modal
        title="选择盒子"
        v-model="showBoxModal"
        :footer-hide = "true"
        style="z-index:1001;"
        width=800;
        >
        <BoxSelect @itemSelect="boxNoSelect"/>
      </Modal>
        <Modal
        title="选择商品"
        v-model="showGoodsModal"
        :footer-hide = "true"
        style="z-index:1001;"
        >
        <GoodsSelect @itemSelect="goodsNameSelect"/>
      </Modal>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getExcel } from 'views/report/StockingReport/model';
// import fecha from 'fecha';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'StockingReportToolbar',
  data () {
    return {
      showBoxModal: false,
      showGoodsModal: false,
      filterObj: {
        boxNo: '',
        goodsName: ''
      },
      statusOptions: []
    };
  },
  methods: {
    handleSubmit () {
      if (this.filterObj.boxNo || this.filterObj.goodsName) {
        this.filterData(Object.assign({
          box_no: this.filterObj.boxNo,
          goods_name: this.filterObj.goodsName
        }));
      } else {
        this.$error({
          content: '盒子编号、商品名称至少有一个不能为空!'
        });
      }
    },
    handleExport () {
      getExcel({
        box_no: this.filterObj.boxNo,
        goods_name: this.filterObj.goodsName
      });
    },
    reset () {
      this.filterObj = {
        boxNo: '',
        goodsName: ''
      };
      this.setFilter({});
      this.setItems({
        items: [],
        total: 0
      });
    },
    handleRefresh () {
      if (this.filterObj.boxNo || this.filterObj.goodsName) {
        this.reload();
      } else {
        this.$error({
          content: '盒子编号、商品名称至少有一个不能为空!'
        });
      }
    },

    // loadStatus () {
    //   getStatus().then(result => {
    //     if (result.success) {
    //       this.statusOptions = result.data;
    //     }
    //   });
    // },
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showBoxModal = true;
    },
    goodsNameClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showGoodsModal = true;
    },
    boxNoSelect (row) {
      this.filterObj.boxNo = row.boxNo;
      this.showBoxModal = false;
    },
    goodsNameSelect (row) {
      this.filterObj.goodsName = row.goodsName;
      this.showGoodsModal = false;
    }
  },
  mounted () {
    // this.loadStatus();
  },
  watch: {
    showBoxModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshBoxList');
      }
    },
    showGoodsModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshGoodsList');
      }
    }
  }
};
</script>
