<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick">置换</Button>
</template>

<script>
export default {
  name: 'AddBtn',
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
