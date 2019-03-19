<template>
     <Button type="primary" @click="handleClick">导出商品</Button>
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
