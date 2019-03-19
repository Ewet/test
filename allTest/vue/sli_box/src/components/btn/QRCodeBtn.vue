<template>
     <Button
     type="primary"
     @click="handleClick"
     :size="size"
     >二维码</Button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  name: 'QRCodeBtn',
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
