<template>
     <Button
     type="error"
     :size="size"
     @click="handleClick"
     >取消计划</Button>
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
