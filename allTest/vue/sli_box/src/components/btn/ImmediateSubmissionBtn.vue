<template>
     <Button
     type="primary"
     :size="size"
     :loading="loading"
     @click="handleClick">立即提交</Button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
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
