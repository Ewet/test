<template>
  <Select
      v-model="model"
      filterable
      remote
      clearable
      :remote-method="remoteMethod"
      :loading="loading"
      @on-change="handleChange(model)"
      @on-clear="handleClear"
      >
      <Option
        v-for="(option, index) in options"
        :value="option.value"
        :label="option.label"
        :key="index"></Option>
  </Select>
</template>
<script>
import { getList } from 'views/system/BoxManagement/model';
import { debounce } from 'lodash';

export default {
  name: 'BoxQueryInput',
  data () {
    return {
      model: '',
      loading: false,
      options: [],
      queryList: [
      ]
      // isRequested: false
    };
  },
  created () {
    this.remoteMethod = debounce(this.remoteMethod, 500);
  },
  methods: {
    handleChange (model) {
      if (model === undefined) {
        model = '';
      }
      const data = this.queryList.filter(x => x.id === model)[0];
      this.$emit('on-change', data || null);
      this.options = [];
    },
    handleClear (model) {
      this.$emit('on-clear');
    },
    async remoteMethod (query) {
      if (query) {
        // if (!this.isRequested) {
        this.loading = true;
        const { success, data, msg } = await getList({
          // 'pagination[page_size]': 1000,
          'pagination[page]': 1
        });
        if (success) {
          this.queryList = data.items;
          // this.isRequested = true;
        } else if (msg) {
          this.$error(msg);
        } else {

        }
        this.loading = false;
        // }

        this.options = this.queryList.filter(item => item.boxNo.toLowerCase().includes(query.toLowerCase())).map(x => ({
          value: x.id,
          label: x.boxNo
        }));
      } else {
        this.options = [];
      }
    }
  }
};
</script>
