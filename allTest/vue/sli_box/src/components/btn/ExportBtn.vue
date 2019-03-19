<template>
     <Button type="primary" @click="handleClick">导出</Button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>
