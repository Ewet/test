<template>
     <Button type="primary" @click="handleClick">关闭</Button>
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
