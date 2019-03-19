<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick">数据导出</Button>
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
