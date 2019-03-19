<template>
  <div class="member"  >
    <ModuleHeader title="会员列表">
    </ModuleHeader>
    <Form inline class="toolBarForm">
      <RefreshBtn  @click="reload" />
      <FormItem label='会员昵称'>
        <Input type="text" v-model="filterObj.memberName" clearable placeholder="请输入会员昵称"></Input>
      </FormItem>
      <FormItem label='手机号码'>
        <Input :maxlength=18 v-model="filterObj.phone" clearable placeholder="请输入手机号"></Input>
        <!-- <InputNumber style="width: 160px;" @on-keyup="maxInput" :max="999999999999999" v-model="filterObj.phone" clearable placeholder="请输入手机号"></InputNumber> -->
      </FormItem>
      <FormItem label='注册时间' class="datePicker">
        <DatePicker type="datetimerange" placeholder="请选择时间" v-model="filterObj.dateChange"></DatePicker>
      </FormItem>
      <FormItem label='盒子编号'>
        <span @click="boxNoClick($event)">
          <Input type="text" v-model="filterObj.boxNum" clearable readonly placeholder="请输入盒子编号"></Input>
        </span>
      </FormItem>
      <FormItem>
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="reset"/>
        <ExportBtn @click="handleExports"/>
      </FormItem>
    </Form>
    <ZTable
          :columns="columns"
          :items="items"
          :loading="isLoading"
          :page="page"
          :total="total"
          :pageChange="pageChange.bind(this)"
    />
    <Modal
        width='350'
        :value="viewModal"
        title="会员详情"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setViewModal(false)">
        <Edit/>
    </Modal>
    <Modal
      title="选择盒子"
      v-model="showBoxModal"
      :footer-hide = "true"
      style="z-index:1001;"
      width=800
      >
      <BoxSelect @itemSelect="boxNoSelect"/>
    </Modal>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import Edit from './Edit';
import { reportExport } from 'views/personnel/Member/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MemberIndex',
  data () {
    return {
      showBoxModal: false,
      filterObj: {
        memberName: '',
        phone: '',
        dateChange: ['', ''],
        boxNum: ''
      },
      columns: [
        {
          title: '会员昵称',
          key: 'memberName'
        },
        {
          title: '会员ID',
          key: 'memberId'
        },
        {
          title: '盒子编号',
          key: 'boxNum'
        },
        {
          title: '注册时间',
          key: 'registerTime'
        },
        {
          title: '注册来源',
          key: 'typeFormatted'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const action = [];
            action.push(h('ViewBtn', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.viewItem(params.row.memberId);
                }
              }
            }, '查看'));
            return h('div', action);
          }
        }
      ]
    };
  },
  components: {
    Edit
  },
  mounted () {
    this.pageChange(1);
  },
  methods: {
    handleSubmit () {
      if (this.filterObj.dateChange[0] || this.filterObj.dateChange[1]) {
        this.filterData({
          nickname: this.filterObj.memberName,
          mobile: this.filterObj.phone === null ? '' : this.filterObj.phone,
          created_time_start: this.$formatTime(new Date(this.filterObj.dateChange[0]), 'ymd-hms'),
          created_time_end: this.$formatTime(new Date(this.filterObj.dateChange[1]), 'ymd-hms'),
          box_no: this.filterObj.boxNum
        });
      } else {
        this.filterData({
          nickname: this.filterObj.memberName,
          mobile: this.filterObj.phone === null ? '' : this.filterObj.phone,
          box_no: this.filterObj.boxNum
        });
      }
    },
    reset () {
      this.filterObj = {
        memberName: '',
        phone: '',
        dateChange: ['', ''],
        boxNum: ''
      };
      this.clearFilter();
    },
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showBoxModal = true;
    },
    boxNoSelect (row) {
      this.filterObj.boxNum = row.boxNo;
      this.showBoxModal = false;
    },
    handleExports () {
      const data = {
        nickname: this.filterObj.memberName,
        mobile: this.filterObj.phone === null ? '' : this.filterObj.phone,
        box_no: this.filterObj.boxNum
      };
      if (this.filterObj.dateChange[0] !== '' && this.filterObj.dateChange[1] !== '') {
        data.created_time_start = this.$formatTime(new Date(this.filterObj.dateChange[0]), 'ymd-hms');
        data.created_time_end = this.$formatTime(new Date(this.filterObj.dateChange[1]), 'ymd-hms');
      }
      reportExport(data);
    }
  },
  watch: {
    showBoxModal (val) {
      if (!val) {
        this.$Bus.$emit('refreshBoxList');
      }
    }
  }
};
</script>
<style lang='less'>
.member{
  ::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:#999;
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:#999;
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
  }
  .ivu-input-number-handler-wrap{
    width: 0px;
  }
}

</style>
