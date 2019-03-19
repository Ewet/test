<template>
    <div>
      <div>
        <Form inline class="toolBarForm">
              <FormItem label='广告名称'>
                  <Input type="text" v-model="filterObj.adName" placeholder="广告名称">
                  </Input>
              </FormItem>
              <FormItem label='广告商名称'>
                  <Input type="text" v-model="filterObj.advertiserName" placeholder="广告商名称">
                  </Input>
              </FormItem>
              <FormItem label='投放日期' class="datePicker">
                  <DatePicker type="datetimerange" v-model="filterObj.launchDateTime" placeholder="请输入投放日期"></DatePicker>
              </FormItem>

            <FormItem>
              <FormItem>
                <SearchBtn @click="handleSubmit"/>
                <ResetBtn @click="reset"/>
              </FormItem>
            </FormItem>
        </Form>
      </div>
      <Table @on-selection-change="selectData" height="300" highlight-row  :columns="columns" :data="selectedAdList"></Table>
      <div class="tableFooter">
        <!-- <p  @click="delSelect" class="delSelect">批量删除</p> -->
        <ZBtn @click="delSelect" type="error" size="small">批量删除</ZBtn>
        <p>共{{selectedAdList.length}}条</p>
      </div>
    </div>
</template>
<script>
import { delAd, delBatchAd } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'Edit',
  data () {
    return {
      filterObj: {
        adName: '',
        advertiserName: '',
        launchDateTime: []
      },
      selectionIdArr: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '广告商名称',
          key: 'advertiserName',
          minWidth: 100
        },
        {
          title: '广告名称',
          key: 'adName',
          minWidth: 100
        },
        {
          title: '投放日期',
          key: 'launchDate',
          minWidth: 100
        },
        {
          title: '投放时段',
          key: 'launchTime',
          minWidth: 100
        },
        {
          title: '备注',
          key: 'remarks',
          minWidth: 80
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 50,
          align: 'center',
          render: (h, params) => h('div', [
            h('DelBtn', {
              style: {
                margin: '5px'
              },
              on: {
                click: () => {
                  this.delAdFn(params.row.id);
                }
              }
            }, '删除')
          ])
        }
      ]
    };
  },
  mounted () {

  },
  methods: {
    // 选中
    selectData (selection) {
      const idArr = [];
      selection.forEach((el) => {
        idArr.push(el.id);
      });
      this.selectionIdArr = idArr;
    },
    // 查询
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      if (this.filterObj.launchDateTime[0] && this.filterObj.launchDateTime[1]) {
        startTime = this.$formatTime(this.filterObj.launchDateTime[0]);
        endTime = this.$formatTime(this.filterObj.launchDateTime[1]);
      }
      this.getSelectedAdData({
        box_id: this.boxId,
        advert_name: this.filterObj.adName,
        advert_merchants_name: this.filterObj.advertiserName,
        start_day: startTime,
        end_day: endTime
      });
    },
    // 重置
    reset () {
      this.filterObj = {
        adName: '',
        advertiserName: '',
        launchDateTime: []
      };
      this.getSelectedAdData({
        box_id: this.boxId
      });
    },
    // 删除
    delAdFn (id) {
      this.$m_confirm({
        title: '确定删除当前记录吗？',
        onOk: async () => {
          const { success, msg } = await delAd(id);
          if (success) {
            this.$success('删除成功!');
            this.getSelectedAdData({
              box_id: this.boxId
            });
            this.reload();
          } else if (msg) {
            this.$error({
              content: `删除记录失败${msg}`
            });
          }
        }
      });
    },
    // 批量删除
    delSelect () {
      const len = this.selectionIdArr.length;
      if (len > 0) {
        this.$m_confirm({
          title: '确定批量删除记录吗？',
          onOk: async () => {
            const { success, msg } = await delBatchAd({
              ids: this.selectionIdArr.toString()
            });
            if (success) {
              this.$success('删除成功!');
              this.getSelectedAdData({
                box_id: this.boxId
              });
              this.reload();
            } else if (msg) {
              this.$error({
                content: `删除记录失败${msg}`
              });
            }
          }
        });
      } else {
        this.$error({
          content: '请先选择广告！'
        });
      }
    }
  },
  watch: {

  },
  components: {

  },
  computed: {

  }
};
</script>
<style lang="less" scope>
.tableFooter{
  display: flex;
  justify-content: space-between;
  margin: 10px 0  0 0;
  p{
    margin: 0;
    padding: 0;
  }
  p.delSelect{
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
