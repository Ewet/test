<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick">编辑</Button>
</template>

<script>
export default {
  name: 'EditBtn',
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
