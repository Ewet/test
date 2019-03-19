<template>
    <div class="coupon-select" >
      <Form inline style="text-align:left">
      <!-- <FormItem>
            <Button type="primary" @click="refresh">刷新</Button>
        </FormItem> -->
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
        </form>
        </header>
         <Table :disabled-hover="true" :columns="columns" :data="items" :height="400" ></Table>
    </div>
</template>
<script>
// import { Input, Table, Button } from 'iview';
import { getList } from 'views/system/BoxManagement/model';
import { getList as getMerchantList } from 'views/system/MerchantManagement/model';

export default {
  name: 'BoxSelect',
  data () {
    return {
      column_value: '',
      filterObj: {
        boxNo: '',
        name: ''
      },
      merchantOptions: [
      ],
      columns: [
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
                  this.filterObj = {
                    boxNo: '',
                    name: ''
                  };
                }
              }
            }, '选择')
          ])
        }],
      items: []
    };
  },
  created () {
    this.$Bus.$on('refreshBoxList', this.resetData);
  },
  mounted () {
    this.resetData();
    this.loadmerchantOptions();
  },
  beforeDestroy () {
    this.$Bus.$off('refreshBoxList', this.resetData);
  },
  methods: {
    loadData () {
      getList({
        'pagination[page_size]': 1000,
        'pagination[page]': 1,
        box_no: this.filterObj.boxNo,
        merchant_name: this.filterObj.name
      }).then(({ success, data, msg }) => {
        if (success) {
          this.items = data.items;
          // this.items = [
          //   {
          //     boxNo: '111固定',
          //     name: '222固定',
          //     address: '333固定'
          //   }
          // ];
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
    },
    resetData () {
      this.filterObj.boxNo = '';
      this.filterObj.name = '';
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
