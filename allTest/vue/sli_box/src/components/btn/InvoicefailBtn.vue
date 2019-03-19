<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick"
      style="background-color:red;border-color:red;"
     >开票失败</Button>
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
