<template>
    <div class="coupon-select" >
      <Form inline style="text-align:left">
        <FormItem>
            <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编号"></Input>
        </FormItem>
        <FormItem>
            <Select v-model="filterObj.name" placeholder="所属商户" style="width: 100px">
                <Option
                  v-for="(item,index) in merchantOptions"
                  :key="index"
                  :label="item.merchantName"
                  :value="item.merchantName"
                ></Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="loadData">查询</Button>
            <Button type="primary" @click="resetData">重置</Button>
        </FormItem>
      </Form>
      <Row>
        <Col span="11">
          <ZTable
            :disabled-hover="true"
            :columns="columns"
            :items="leftList"
            :height="540"
            :mutiple="true"
            :page="tablePage"
            :total="tableTotal"
            :pageChange="boxPagechange.bind(this)"
            @on-select="handleSelect"
            @on-select-cancel="handleDelete"
            @on-select-all="selectAll"
            @on-select-all-cancel="deleteAll"
          ></ZTable>
        </Col>
        <Col span="12" offset=1>
          <ZTable
            :disabled-hover="true"
            :columns="targetColumns"
            :items="checkedList"
            :height="540"
            :showPageBar="false"
         ></ZTable>
         <div style="text-align:right; margin-top:10px"><ConfirmBtn size="default" @click="handleConfirm" ></ConfirmBtn></div>
        </Col>
      </Row>
    </div>
</template>
<script>
import { getList } from 'views/system/BoxManagement/model';

import { getList as getMerchantList } from 'views/system/MerchantManagement/model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from '../store';
export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  props: {
    checkedBoxList1: {
      type: Array,
      default: () => []
    }
  },
  name: 'BoxSelect',
  data () {
    return {
      column_value: '',
      filterObj: {
        boxNo: '',
        name: ''
      },
      merchantOptions: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '盒子编号',
          minWidth: 100,
          key: 'boxNo'
        },
        {
          title: '商户名称',
          minWidth: 100,
          key: 'merchantName'
        },
        {
          title: '盒子地址',
          minWidth: 200,
          key: 'address',
          align: 'center'
        }],
      tableItems: [],
      checkedList: [],
      delColumn: {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => h('div', [
          h('DelBtn', {
            props: {
              size: 'small'
            },
            on: {
              click: () => {
                this.delItem(params.index);
              }
            }
          }, '')
        ])
      },
      tablePage: 1,
      tableTotal: 0
    };
  },
  computed: {
    // 右侧列表比左侧多一列删除栏
    targetColumns () {
      return this.columns.concat(this.delColumn);
    },
    // 处理左侧数据的选中
    leftList () {
      const list = [...this.tableItems];
      list.forEach((x) => {
        x._checked = false;
        this.checkedList.forEach((y) => {
          if (x.boxNo === y.boxNo) {
            x._checked = true;
          }
        });
      });
      return list;
    }
  },
  created () {
    this.$Bus.$on('refreshBoxList', this.resetData);
  },
  beforeDestroy () {
    this.$Bus.$off('refreshBoxList', this.resetData);
  },
  methods: {
    boxPagechange (page) {
      this.loadData(page, 1);
    },
    loadData (page = 1, filter) {
      if (!filter) {
        this.lastFilter = {
          box_no: this.filterObj.boxNo,
          merchant_name: this.filterObj.name
        };
      }
      getList({
        'pagination[page_size]': 10,
        'pagination[page]': page,
        // 'box_no': this.filterObj.boxNo,
        // 'merchant_name': this.filterObj.name
        ...this.lastFilter
      }).then(({ success, data, msg }) => {
        if (success) {
          this.tableItems = data.items;
          this.tablePage = data.pageNum;
          this.tableTotal = data.total;
        }
      });
    },
    loadmerchantOptions () {
      getMerchantList({
        'pagination[page_size]': 1000
      }).then((result) => {
        if (result.success) {
          // console.log(result.data.items);
          this.merchantOptions = result.data.items.map(x => ({
            merchantName: x.merchantName
          }));
        }
      });
      this.loadData();
    },
    resetData () {
      this.filterObj.boxNo = '';
      this.filterObj.name = '';
      this.loadData();
    },
    // 多选选中一项
    handleSelect (data, val) {
      this.checkedList.push({
        merchantName: val.merchantName,
        boxNo: val.boxNo,
        boxId: val.id,
        address: val.address
      });
    },
    // 多选取消一项
    handleDelete (data, val) {
      this.checkedList = this.checkedList.filter(x => x.boxId !== val.id);
    },
    // 选中全选
    selectAll (data) {
      data.forEach((x) => {
        const ispush = this.checkedList.some(y => y.boxId === x.id);
        if (!ispush) {
          this.checkedList.push({
            merchantName: x.merchantName,
            boxNo: x.boxNo,
            boxId: x.id,
            address: x.address
          });
        }
      });
    },
    // 取消全选
    deleteAll (data) {
      this.tableItems.forEach((x) => {
        this.checkedList = this.checkedList.filter(y => y.boxId !== x.id);
      });
    },
    // 右侧点击删除
    delItem (index) {
      this.checkedList.splice(index, 1);
    },
    // 点击确认，把选中盒子列表返回给新增编辑页
    handleConfirm () {
      this.$emit('itemSelect', [...this.checkedList]);
      this.setSelectBoxModal(false);
    }
  },
  watch: {
    // 关闭此页面时清空已选择盒子数据
    showSelectBoxModal (val) {
      if (val) {
        this.loadmerchantOptions();
        this.checkedList = [...this.checkedBoxList1];
      } else {
        this.checkedList = [];
        this.resetData();
      }
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
