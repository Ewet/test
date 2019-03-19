<template>
    <span @click="inputClick($event)">
        <Input type="text" v-model="text" clearable readonly placeholder="请选择" @on-change="val=>clearId(val)"/>
        <Modal
            title="选择商户"
            v-model="merchantModal"
            :footer-hide="true"
            style="z-index:1001;"
            width=800
            >
            <MerchantSelect @itemSelect="handleItemSelect" ref="selectRef"/>
        </Modal>
    </span>
</template>
<script>
export default {
  name: 'MerchantSelectInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    keyName: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      merchantModal: false,
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
      // const { merchantName } = row;
      let returnName = row[this.keyName] || row['id'];
      this.text = row.merchantName;
      this.merchantModal = false;
      this.$emit('itemSelect', row);
      this.$emit('input', returnName);

      this.$refs.selectRef.resetData();
    },
    inputClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.merchantModal = true;
    },
    resetText () {
      this.text = '';
    }
  },
  watch: {
    merchantModal (val) {
      if (!val) {
        this.$refs.selectRef.resetData();
      }
    }
  }
};
</script>
