<template>
     <Button
     type="primary"
     :size="size"
     style="margin-left: 5px;"
     @click="handleClick">清空</Button>
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
