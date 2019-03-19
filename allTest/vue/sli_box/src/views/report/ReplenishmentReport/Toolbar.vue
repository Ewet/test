
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem class="datePicker" label='补货时间'>
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.createdTime"
          type="datetimerange"
          placeholder="补货时间"
          />
        </FormItem>
        <FormItem label='盒子编号'>
            <span @click="boxNoClick($event)">
              <Input @on-click.stop  placeholder="盒子编号" readonly clearable v-model="filterObj.boxNo"></Input>
            </span>
        </FormItem>
        <FormItem label='商品名称'>
            <span @click="goodsNameClick($event)">
            <Input @on-click.stop  placeholder="商品名称" readonly clearable v-model="filterObj.goodsName">
            </Input>
            </span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
            <Button type="primary" @click="handleExport">导出</Button>
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
import { getExcel } from 'views/report/ReplenishmentReport/model';
import fecha from 'fecha';

export default {
  mixins: [vuexMixins({ moduleName: 'replenishmentReport' })],
  name: 'ReplenishmentReportToolbar',
  data () {
    return {
      showBoxModal: false,
      showGoodsModal: false,
      filterObj: {
        createdTime: this.timeFormat(),
        boxNo: '',
        goodsName: ''
      },
      statusOptions: []
    };
  },
  methods: {
    timeFormat () {
      const time = fecha.format(new Date(), 'YYYY-MM-DD');
      return [`${time} 00:00:00`, `${time} 23:59:59`];
    },
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      const createdTime = this.filterObj.createdTime;
      // console.log(createdTime);
      if (createdTime.length && createdTime.every(x => !!x) > 0) {
        startTime = fecha.format(createdTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(createdTime[1], 'YYYY-MM-DD HH:mm:ss');

        this.filterData(Object.assign({
          box_no: this.filterObj.boxNo,
          goods_name: this.filterObj.goodsName,
          create_time_start: startTime,
          create_time_end: endTime
        }));
      } else {
        this.$error({
          content: '请选择补货时间!'
        });
      }
    },
    reset () {
      this.filterObj = {
        createdTime: this.timeFormat().map(x => new Date(x)),
        boxNo: '',
        goodsName: ''
      };
      const time1 = this.timeFormat();
      this.filterData({
        box_no: '',
        goods_name: '',
        create_time_start: time1[0],
        create_time_end: time1[1]
      });
    },
    handleRefresh () {
      this.reload();
    },
    handleExport () {
      let startTime = '';
      let endTime = '';
      const createdTime = this.filterObj.createdTime;
      if (createdTime.length && createdTime.every(x => !!x) > 0) {
        startTime = fecha.format(createdTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(createdTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      getExcel({
        box_no: this.filterObj.boxNo,
        goods_name: this.filterObj.goodsName,
        create_time_start: startTime,
        create_time_end: endTime
      });
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
    this.handleSubmit();
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
