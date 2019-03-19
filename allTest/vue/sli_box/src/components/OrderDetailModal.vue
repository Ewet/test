<template>
    <Modal
        :value="value"
        title="订单详情"
        :footerHide= "true"
        @on-cancel="handleCancel"
        >
    <OrderDetail :orderSn="orderSn"/>
    </Modal>
</template>
<script>
import OrderDetail from './OrderDetail';

export default {
  name: 'OrderDetailModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    orderSn: {
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
    OrderDetail
  }
};
</script>
