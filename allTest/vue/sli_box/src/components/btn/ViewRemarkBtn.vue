<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick">查看备注</Button>
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
