<template>
  <Button type="primary" @click="handleClick">新建活动</Button>
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
