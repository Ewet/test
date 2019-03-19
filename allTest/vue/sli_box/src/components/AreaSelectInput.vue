<template>
    <span @click="inputClick($event)">
        <Input type="text" v-model="text" clearable readonly placeholder="请选择" @on-change="val=>clearId(val)"/>
        <Modal
            title="选择地区"
            v-model="operatorModal"
            :footer-hide="true"
            style="z-index:1001;"
            width=800
            >
            <AreaSelect @itemSelect="handleItemSelect" ref="selectRef"/>
        </Modal>
    </span>
</template>
<script>
export default {
  name: 'OperatorSelectInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      operatorModal: false,
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
      const { districtName, districtId } = row;
      this.text = districtName;
      this.operatorModal = false;
      this.$emit('itemSelect', row);
      this.$emit('input', districtId);

    //   this.$refs.selectRef.resetData();
    },
    inputClick (event) {
      if (event.target.className.indexOf('ivu-input-icon-clear') !== -1) {
        return false;
      }
      this.operatorModal = true;
    },
    resetText () {
      this.text = '';
    }
  }
//   watch: {
//     operatorModal (val) {
//       if (!val) {
//         this.$refs.selectRef.resetData();
//       }
//     }
//   }
};
</script>
