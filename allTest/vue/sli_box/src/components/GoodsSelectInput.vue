<template>
    <span @click="inputClick($event)">
        <Input type="text" v-model="text" clearable readonly placeholder="请选择商品" @on-change="val=>clearId(val)"/>
        <Modal
            title="选择商品"
            v-model="goodsModal"
            :footer-hide="true"
            style="z-index:1001;"
            width=800
            >
            <GoodsSelect @itemSelect="handleItemSelect" ref="selectRef"/>
        </Modal>
    </span>
</template>
<script>
export default {
  name: 'GoodsSelectInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      goodsModal: false,
      text: ''
    };
  },
  methods: {
    clearId (val) {
      if (!val.target.value) {
        this.$emit('input', '');
      }
    },
    handleItemSelect (row) {
      const { goodsName, goodsId } = row;
      this.text = goodsName;
      this.goodsModal = false;
      this.$emit('itemSelect', row);
      this.$emit('input', goodsId);
      this.$refs.selectRef.resetData();
    },
    inputClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.goodsModal = true;
    },
    resetText () {
      this.text = '';
    }
  },
  watch: {
    goodsModal (val) {
      if (!val) {
        this.$refs.selectRef.resetData();
      }
    }
  }
};
</script>
