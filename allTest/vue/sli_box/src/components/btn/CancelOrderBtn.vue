<template>
     <Button
     :size="size"
     @click="handleClick"
     type="error"
     >取消订单</Button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
