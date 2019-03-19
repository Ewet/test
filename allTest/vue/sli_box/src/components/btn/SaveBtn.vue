<template>
     <Button
     type="primary"
     :size="size"
     @click="handleClick">保存</Button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'default'
    }
  },
  created () {
    this.handleClick = this.$debounce(this.handleClick);
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
