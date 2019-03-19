<template>
    <Modal
        :value="value"
        title="退货详情"
        :footerHide= "true"
        @on-cancel="handleCancel"
        >
    <ReturnDetail :returnId="returnId"/>
    </Modal>
</template>
<script>
import ReturnDetail from './ReturnDetail';

export default {
  name: 'ReturnDetailModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 退货id
    returnId: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCancel () {
      this.$emit('input', false);
      this.$emit('cancel');
    }
  },
  components: {
    ReturnDetail
  }
};
</script>
