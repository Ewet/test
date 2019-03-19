<template>
     <Button type="primary" @click="handleClick">导出明细</Button>
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
