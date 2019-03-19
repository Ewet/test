<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick">新增</Button>
</template>

<script>
export default {
  name: 'AddBtn',
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
