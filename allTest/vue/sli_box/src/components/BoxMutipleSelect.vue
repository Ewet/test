<template>
    <div class="goods-muti-select" >
        <Form inline style="text-align:left">
            <FormItem>
                <Input type="text" v-model="filterObj.boxNo" placeholder="盒子编号">
                </Input>
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
            :columns="leftColumns"
            :items="computedLeftItems"
            :height="540"
            :mutiple="true"
            :page="page"
            :total="total"
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
            :columns="rightColumns"
            :items="rightItems"
            :height="540"
            :showPageBar="false"
            ></ZTable>
            <div style="text-align:right; margin-top:10px">
                <ConfirmBtn size="default" @click="handleConfirm" ></ConfirmBtn>
            </div>
        </Col>
      </Row>
    </div>
</template>
<script>
import { getList } from 'views/system/BoxManagement/model';

import { getList as getMerchantList } from 'views/system/MerchantManagement/model';

export default {
  name: 'BoxMutipleSelect',
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      column_value: '',
      filterObj: {
        boxNo: '',
        name: ''
      },
      merchantOptions: [],
      leftColumns: [
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
      leftItems: [],
      rightItems: [],
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
      page: 1,
      total: 0
    };
  },
  computed: {
    // 右侧列表比左侧多一列删除栏
    rightColumns () {
      return this.leftColumns.concat(this.delColumn);
    },
    computedLeftItems () {
      return this.leftItems.map(x => {
        return { ...x, _checked: this.rightItems.some(g => g.boxNo === x.boxNo) };
      });
    }
  },
  mounted () {
    this.loadmMerchantOptions();
    this.loadData();
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
          this.leftItems = data.items;
          this.page = data.pageNum;
          this.total = data.total;
        }
      });
    },
    loadmMerchantOptions () {
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
    },
    resetData () {
      this.filterObj.boxNo = '';
      this.filterObj.name = '';
      this.loadData();
    },
    // 多选选中一项
    handleSelect (data, val) {
      this.rightItems.push({ ...val });
    },
    // 多选取消一项
    handleDelete (data, val) {
      this.rightItems = this.rightItems.filter(x => x.id !== val.id);
    },
    // 选中全选
    selectAll (data) {
      this.rightItems.push(...data.filter(x => !this.rightItems.some(g => g.id === x.id)));
    },
    // 取消全选
    deleteAll (data) {
      this.rightItems = this.rightItems.filter(x => !this.leftItems.some(g => g.id === x.id));
    },
    // 右侧点击删除
    delItem (index) {
      this.rightItems.splice(index, 1);
    },
    // 点击确认，把选中盒子列表返回给新增编辑页
    handleConfirm () {
      // this.$emit('input', [...this.rightItems]);
      this.$emit('on-confirm', [...this.rightItems]);
    }
  },
  watch: {
    selectedItems (val) {
      this.rightItems = [...val];
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
