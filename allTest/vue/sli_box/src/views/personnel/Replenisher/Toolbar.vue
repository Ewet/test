
<template>
    <Form inline class="toolBarForm">
      <RefreshBtn  @click="refresh" />
        <FormItem  label='手机号码'>
            <Input type="text" @on-keydown.13="handleSubmit" v-model="filterObj.mobile" placeholder="手机号"></Input>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="reset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      filterObj: {
        mobile: ''
      }
    };
  },
  methods: {
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
        mobile: this.trim(this.filterObj.mobile)
      });
    },
    // 重置
    reset () {
      this.filterObj = {
        mobile: ''
      };
      this.clearFilter();
    },
    // 刷新
    refresh () {
      this.reload();
    }
  }
};
</script>
