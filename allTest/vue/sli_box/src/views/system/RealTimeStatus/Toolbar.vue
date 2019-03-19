
<template>
  <Form inline class="toolBarForm" @submit.native.prevent>
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='盒子编号'>
            <Input type="text" @on-keyup.enter="handleSubmit()" v-model="filterObj.boxNo" placeholder="盒子编号">
            </Input>
        </FormItem>
        <FormItem label='终端状态'>
            <Select v-model="filterObj.terminalState" clearable placeholder="终端状态" >
                <Option v-for="item in terminalOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label='故障状态'>
            <Select v-model="filterObj.faultStyle" clearable placeholder="故障状态" >
                <Option v-for="item in faultOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label='维护状态'>
            <Select v-model="filterObj.maintainState" clearable placeholder="维护状态" >
                <Option v-for="item in maintainOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>

        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RealTimeStatusToolbar',
  data () {
    return {
      terminalOption: [
        { value: '-1', label: '已删除' },
        { value: '1', label: '离线' },
        { value: '2', label: '在线' }
      ],
      faultOption: [
        { value: '1', label: '是' },
        { value: '0', label: '否' }
      ],
      maintainOption: [
        { value: '1', label: '是' },
        { value: '0', label: '否' }
      ],
      filterObj: {
        boxNo: '', // 盒子编号
        maintainState: '', // 维护状态
        faultStyle: '', // 故障状态
        terminalState: '' // 终端状态
      },
      areaOptions: []
    };
  },
  methods: {
    handleSubmit () {
      this.filterData({
        box_no: this.filterObj.boxNo,
        in_maintenance: this.filterObj.maintainState,
        has_fault: this.filterObj.faultStyle,
        status: this.filterObj.terminalState
      });
    },
    handleReset () {
      this.filterObj = {
        boxNo: '', // 盒子编号
        maintainState: '', // 维护状态
        faultStyle: '', // 故障状态
        terminalState: '' // 终端状态
      };
      this.clearFilter();
    },
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
