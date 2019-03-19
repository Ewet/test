
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='盒子编号'>
            <span @click="boxNoClick($event)">
              <Input @on-click.stop  placeholder="盒子编号" readonly clearable v-model="filterObj.boxNo"></Input>
            </span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
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
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'BoxToRFIDToolbar',
  data () {
    return {
      showBoxModal: false,
      filterObj: {
        boxNo: ''
      }
    };
  },
  methods: {
    handleSubmit () {
      this.filterData(Object.assign({
        box_no: this.filterObj.boxNo
      }));
    },
    reset () {
      this.filterObj = {
        boxNo: ''
      };
      this.filterData({
        box_no: ''
      });
    },
    handleRefresh () {
      this.reload();
    },
    boxNoClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.showBoxModal = true;
    },
    boxNoSelect (row) {
      this.filterObj.boxNo = row.boxNo;
      this.showBoxModal = false;
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
    }
  }
};
</script>
