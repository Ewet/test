
<template>
    <Form inline class="toolBarForm">
        <!-- <FormItem> -->
            <!-- <Button type="primary" @click="handleRefresh">刷新</Button> -->
            <RefreshBtn @click="handleRefresh"/>
        <!-- </FormItem> -->
        <FormItem label='盒子编号'>
            <Input type="text" @on-keydown.13="handleSubmit" v-model="filterObj.boxNo" placeholder="盒子编号">
            </Input>
        </FormItem>
        <FormItem label='盒子型号'>
            <Select v-model="filterObj.boxStyle" clearable placeholder="盒子型号" >
                <Option v-for="item in boxStyleOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem style="width:360px;">
          <SearchBtn @click="handleSubmit"/>
          <ZBtn  @click="searchUpgrade()">搜索结果升级</ZBtn>
          <ResetBtn @click="reset"/>
          <ZBtn  @click="getLatestEditionFn()">获取最新版本</ZBtn>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';
import { getLatestEdition } from './model';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      filterObj: {
        boxNo: '',
        boxStyle: ''
      },
      boxStyleOption: [
        { value: '1', label: '摩萄盒子' },
        { value: '2', label: '摩萄酒柜' }
      ]
    };
  },
  methods: {
    // 获取最新版本
    async getLatestEditionFn () {
      const boxIdStr = this.boxIdArr.toString();
      const result = await getLatestEdition({
        box_id_str: boxIdStr
      });
      if (result.success) {
        this.$success(result.msg);
      }
    },
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    // 查询
    handleSubmit () {
      this.filterData({
        box_no: this.trim(this.filterObj.boxNo),
        type: this.trim(this.filterObj.boxStyle)
      });
      this.setBoxIdArr([]);
    },
    // 重置
    reset () {
      this.filterObj = {
        box_no: '',
        box_style: ''
      };
      this.clearFilter();
      this.setBoxIdArr([]);
    },
    // 刷新
    handleRefresh () {
      this.reload();
      this.setBoxIdArr([]);
    },
    // 搜索结果升级
    searchUpgrade () {
      const filter = this.filter;
      const len = Object.keys(filter).length;
      if (len > 0) {
        this.viewUpgrade('search');
      } else {
        this.$error('请搜索后再升级！');
      }
    }
  }
};
</script>
