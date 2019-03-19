<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label="工单编号">
            <Input type="text" v-model="filterObj.orderNo" clearable placeholder="请输入工单编号"></Input>
        </FormItem>
        <FormItem label='工单时间' class="datePicker">
          <DatePicker
            type="datetimerange"
            placeholder="请选择工单时间"
            v-model="filterObj.orderDate">
          </DatePicker>
        </FormItem>
        <FormItem label="工单部门">
            <Select v-model="filterObj.orderDepartment" clearable placeholder="工单部门" >
                <Option
                v-for="(item,index) in orderDepartmentOptions"
                :key="index"
                :value="item.enum_id"
                >{{item.enum_name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="工单状态">
            <Select v-model="filterObj.orderStatus" clearable placeholder="工单状态" >
                <Option
                v-for="(item,index) in orderStatusOptions"
                :key="index"
                :value="item.enum_id"
                >{{item.enum_name}}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
            <ZBtn @click="handleExportOrder">
              导出工单
            </ZBtn>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { getDictionary } from 'model/dictionary';
import { getDepartmentOptions, exportOrder } from './model';
import { getZeroTimeLastWeek } from 'utils/date';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'myWorkOrderToolbar',
  data () {
    return {
      filterObj: {
        orderNo: '',
        orderDate: getZeroTimeLastWeek(),
        orderDepartment: '',
        orderStatus: ''
      },
      orderDepartmentOptions: [],
      orderStatusOptions: []
    };
  },
  mounted () {
    getDepartmentOptions().then(({ success, data, msg }) => {
      if (success) {
        this.orderDepartmentOptions = data;
      } else {
        this.$error(msg);
      }
    });
    getDictionary({
      param_key: 'plf_ticket_status'
    }).then((res) => {
      this.orderStatusOptions = res.data;
    });
    // 页面进入或刷新加载时判断是否存在type,没有时默认为1；
    const type = this.$route.query.type;
    this.firstLoadData(type || '0');
  },
  methods: {
    firstLoadData (typeStatus) {
      this.filterObj = {
        orderNo: '',
        orderDate: getZeroTimeLastWeek(),
        orderDepartment: '',
        orderStatus: ''
      };
      const [first, second] = this.filterObj.orderDate;
      this.filterData({
        start_time: this.$formatTime(first),
        end_time: this.$formatTime(second),
        type: typeStatus
      });
    },
    submitData () {
      const changeData = this.filterObj;
      let rqData = {
        ticket_no: changeData.orderNo,
        dep_id: changeData.orderDepartment,
        status: changeData.orderStatus,
        type: '0'
      };
      if (changeData.orderDate.length && changeData.orderDate.every(x => !!x) > 0) {
        rqData = {
          ...rqData,
          start_time: this.$formatTime(changeData.orderDate[0]),
          end_time: this.$formatTime(changeData.orderDate[1])
        };
      }
      return rqData;
    },
    doSubmit () {
      const [start, end] = this.filterObj.orderDate;
      if (end - start > 1000 * 60 * 60 * 24 * 31) {
        this.$error('亲，搜索时间跨度不能大于31天！');
        return false;
      }
      this.filterData(this.submitData());
    },
    handleSubmit () {
      // 搜索时判断type是否为0，是的话直接搜索，不是的话重置为0之后进行搜索；
      const type = this.$route.query.type;
      if (type === '0') {
        this.doSubmit();
      } else {
        this.$router.push({
          name: 'MyWorkOrder_0',
          query: {
            type: '0'
          }
        });
      }
    },
    handleReset () {
      this.filterObj = {
        orderNo: '',
        orderDate: getZeroTimeLastWeek(),
        orderDepartment: '',
        orderStatus: ''
      };
      this.handleSubmit();
      // const [first, second] = this.filterObj.orderDate;
      // this.filterData({
      //   start_time: this.$formatTime(first),
      //   end_time: this.$formatTime(second),
      //   type: typeStatus || '0'
      // });
    },
    handleRefresh () {
      this.reload();
    },
    handleExportOrder () {
      exportOrder(this.submitData());
    }
  },
  watch: {
    // type为0时全局搜索，不为0时条件搜索
    '$route.query.type': function (val) {
      if (val === '0') {
        this.doSubmit();
      } else {
        this.firstLoadData(val);
      }
    }
  }
};
</script>
