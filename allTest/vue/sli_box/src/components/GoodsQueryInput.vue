<template>
            <Select
                v-model="model"
                filterable
                remote
                clearable
                :remote-method="remoteMethod"
                :loading="loading"
                @on-change="emitSetBoxId(model)"
                @on-clear="emitClearBoxId()"
                >
                <Option
                  v-for="(option, index) in options"
                  :value="option.value"
                  :label="option.label"
                  :key="index">
                </Option>
            </Select>
</template>
<script>
import { getList } from 'views/market/Goods/model';

export default {
  name: 'GoodsQueryInput',
  data () {
    return {
      model: '',
      loading: false,
      options: [],
      queryList: [

      ],
      isRequested: false
    };
  },
  methods: {
    emitSetBoxId (model) {
      if (model === undefined) {
        model = '';
      }
      this.$emit('on-change', model);
      this.options = [];
    },
    emitClearBoxId (model) {
      this.$emit('on-clear');
    },
    async remoteMethod (query) {
      if (query) {
        if (!this.isRequested) {
          this.loading = true;
          const { success, data, msg } = await getList({
            'pagination[page_size]': 1000,
            'pagination[page]': 1
          });
          if (success) {
            this.queryList = data.items.map(x => ({
              goodsId: x.goodsId,
              goodsName: x.goodsName
            }));
            this.isRequested = true;
          } else {
            this.$error(msg);
          }
          this.loading = false;
        }
        this.options = this.queryList.filter(item => item.goodsName.toLowerCase().includes(query.toLowerCase()));
      } else {
        this.options = [];
      }
    }
  }
};
</script>
