<template>
     <Button
     type="error"
     :size="size"
     @click="handleClick">删除</Button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
